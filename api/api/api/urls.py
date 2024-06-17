from ariadne.contrib.django.views import GraphQLView
from ariadne.extensions import MiddlewareManager
from django.contrib import admin
from django.urls import re_path, path

from auth.middleware import TokenMiddleware, error_formatter
from .schema import schema
from .views import RegisterMeasurement, CreatePaymentSession, SuccessfulPayment

middleware = MiddlewareManager(TokenMiddleware())

urlpatterns = [
    path("admin/", admin.site.urls),
    path("measurements", RegisterMeasurement.as_view()),
    path("create-payment-session", CreatePaymentSession.as_view()),
    path("successful-payment", SuccessfulPayment.as_view()),
    re_path(
        r"gql/?",
        GraphQLView.as_view(
            schema=schema, middleware=middleware
        ),
        name="graphql",
    ),
]
