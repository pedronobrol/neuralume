from typing import List
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from stripe.error import StripeError, InvalidRequestError

from api.models import MeasurementMagnitude, BoardMeasurement, Salesperson, Sale
from api.model_helper import CoronavirusTransmissionModel

# from store.manager import cache_measurement
from django.utils.timezone import now
from django.conf import settings
import stripe
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

stripe.api_key = settings.STRIPE_API_KEY


GREEN_THRESHOLD = 800
YELLOW_THRESHOLD = 1200


REQUIRED_MAGNITUDES = [
    MeasurementMagnitude.CO2,
    MeasurementMagnitude.RELATIVE_HUMIDITY,
    MeasurementMagnitude.TEMPERATURE,
]


class RegisterMeasurement(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        board = self.request.user
        measurements = []
        for magnitude in REQUIRED_MAGNITUDES:
            name = magnitude.value
            value = request.data.get(name)
            if value is None:
                return Response({'error': 'No data provided'},
                                status=status.HTTP_400_BAD_REQUEST)

            if type(value) not in (int, float):
                return Response({'error': f'{name} must be a number'},
                                status=status.HTTP_400_BAD_REQUEST)

            measurements.append(BoardMeasurement(
                magnitude=magnitude,
                data=value,
                board=board,
                measured_at=now(),
                ))

            if magnitude == MeasurementMagnitude.CO2:
                covid_model = CoronavirusTransmissionModel()
                transmission_rate = covid_model.predict(CO2=value)
                measurements.append(BoardMeasurement(
                    magnitude=MeasurementMagnitude.TRANSMISSION_RATE,
                    data=transmission_rate,
                    board=board,
                    measured_at=now(),
                ))

        BoardMeasurement.objects.bulk_create(measurements)
        return Response({
            'green_threshold': GREEN_THRESHOLD,
            'yellow_threshold': YELLOW_THRESHOLD,
            'sample_interval': board.sample_interval,
            'post_interval': board.post_interval,
            'enable_led': board.enable_led,
        }, status=status.HTTP_201_CREATED)


class CreatePaymentSession(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        user_name = request.data.get('name')
        company_name = request.data.get('companyName')
        email = request.data.get('email')
        offer_code = request.data.get('offerCode')
        phone = request.data.get('phone')
        amount = request.data.get('amount')
        if offer_code:
            if not Salesperson.objects.filter(email=offer_code).exists():
                return Response({'error': 'Invalid offer code'},
                                status=status.HTTP_400_BAD_REQUEST)

        if None in (user_name, company_name, amount, email, phone):
            return Response({'error': 'No data provided'}, status=status.HTTP_400_BAD_REQUEST)

        if type(amount) not in (int, float):
            return Response({'error': 'Amount must be a number'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            customer_list = stripe.Customer.list(email=email).data
            if len(customer_list) > 0:
                customer = customer_list[0]
            else:
                customer = stripe.Customer.create(
                    metadata={'user_name': user_name},
                    name=company_name,
                    phone=phone,
                    email=email,
                )
        except StripeError as exc:
            return Response({'error': 'Cannot create customer'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            price_id = self.get_stripe_price_id(amount, offer_code)
            session = stripe.checkout.Session.create(
                success_url=settings.PREORDER_SUCCESS_URL,
                cancel_url=settings.PREORDER_CANCEL_URL,
                payment_method_types=["card"],
                line_items=[
                    {
                        "price": price_id,
                        "quantity": amount,
                        "tax_rates": [settings.STRIPE_TAX_RATE_ID]
                    },
                ],
                mode="payment",
                customer=customer.id,
                billing_address_collection='required',
                shipping_address_collection={'allowed_countries': ['ES']},
                metadata={
                    'salesperson': offer_code,
                    'amount': amount,
                    'price_id': price_id
                }
            )
            return Response(session)
        except StripeError as exc:
            print(exc.error)
            raise exc
        except ValueError:
            return Response({'error': 'Invalid amount'},
                            status=status.HTTP_400_BAD_REQUEST)

    def get_stripe_price_id(self, amount, offer_code):
        amount_range = self.get_amount_range(amount, offer_code)
        return settings.STRIPE_NEBULA_PRICE[amount_range]

    def get_amount_range(self, amount, offer_code):
        if not offer_code:
            return 'default'
        if amount < 1:
            raise ValueError
        if amount == 1:
            return '1'
        if 1 < amount < 5:
            return '2-4'
        elif 5 <= amount < 10:
            return '5-9'
        elif 10 <= amount < 20:
            return '10-19'
        elif 20 <= amount < 50:
            return '20-49'
        elif 50 <= amount < 100:
            return '50-99'
        elif 100 <= amount < 500:
            return '100-499'
        else:
            return '>=500'


class SuccessfulPayment(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        session_id = request.data.get('sessionId')
        try:
            session = stripe.checkout.Session.retrieve(session_id)
        except InvalidRequestError as exc:
            print(exc)
            return Response({'error': 'Invalid session ID'},
                            status=status.HTTP_400_BAD_REQUEST)

        if session.get('payment_status') != 'paid':
            return Response({'error': 'Order has not been paid'},
                            status=status.HTTP_400_BAD_REQUEST)

        if Sale.objects.filter(stripe_id=session_id).exists():
            return Response({'error': 'Order has already been processed'},
                            status=status.HTTP_400_BAD_REQUEST)

        salesperson = session.get('metadata').get('salesperson')
        amount = session.get('metadata').get('amount')
        price_id = session.get('metadata').get('price_id')
        price_obj = stripe.Price.retrieve(price_id)
        unit_amount = '%s' % (int(price_obj.get('unit_amount')) / 100)

        if salesperson:
            salesperson = Salesperson.objects.get(email=salesperson)

        sale = Sale.objects.create(salesperson=salesperson, stripe_id=session_id)
        invoice_number = f'{(sale.id + 100):05}'

        current_time = now()
        order_date = current_time.strftime('%d/%m/%Y')
        order_time = current_time.strftime('%H:%M')

        email = session.get('customer_details').get('email')
        subtotal = '{:.2f}'.format(int(session.get('amount_subtotal')) / 100)
        total = '{:.2f}'.format(int(session.get('amount_total')) / 100)
        order_name = session.get('shipping').get('name')
        order_address = session.get('shipping').get('address')
        order_address = f"{order_address.get('line1')} {order_address.get('line2')} " \
                        f"{order_address.get('postal_code')} {order_address.get('city')}"
        tax = '{:.2f}'.format(int(session.get('total_details').get('amount_tax')) / 100)
        message = Mail(
            from_email='contact@neuralume.com',
            to_emails=email)
        message.template_id = settings.SENDGRID_TEMPLATE_ID
        message.dynamic_template_data = {
            "Sender_Name": "Neuralume Labs Ltd",
            "Sender_Address": "54B Tottenham Court Road, W1T 2EL London, United Kingdom",
            "Stripe_Transaction_Code": invoice_number,
            "Order_Date": order_date,
            "Order_Time": order_time,
            "Order_Name": order_name,
            "Order_Address": order_address,
            "Unit_Number": amount,
            "Unit_Price": unit_amount,
            "Subtotal": subtotal,
            "Tax": tax,
            "Delivery": "0.00",
            "Total": total
        }

        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e)

        return Response(session)

