from rest_framework.test import APITestCase, force_authenticate
from django.urls import reverse
from rest_framework import status
from api import models

staff_user_data = {
    "username": "juan@neuralume.com",
    "password": "",
    "is_staff": True,
}

test_user_data = {
    "username": "jose@gmail.com",
    "email": "jose@gmail.com",
    "first_name": "Jose",
    "last_name": "Rodriguez",
    "password": "1234",
}

test_organisation_data = {"name": "Organisation", "legal_name": "Organisation Ltd"}

test_board_data = {
    "model": "N100",
    "name": "Board",
    "serial_number": "3cfb5d4c-ae21-440e-b734-4c1a832f1cb1",
    "post_interval": 1,
    "sample_interval": 2,
    "room_height": 2,
    "room_width": 4,
    "room_length": 3,
    "room_occupation": 4,
}

test_measurement_data = {"magnitude": "TEMPERATURE", "data": 20}


class WithStaff(APITestCase):
    def set_up_staff(self):
        self.test_user = models.User(**staff_user_data)
        self.test_user.save()
        self.client.force_login(user=self.test_user)


class CreateOrganisationTest(WithStaff, APITestCase):
    def setUp(self) -> None:
        self.set_up_staff()

    def test(self) -> None:
        """
        Ensure we can create a new organisation object.
        """
        url = reverse("organisation-list")

        response = self.client.post(url, test_organisation_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Organisation.objects.count(), 1)

        organisation = models.Organisation.objects.get()

        self.assertEqual(organisation.name, test_organisation_data["name"])
        self.assertEqual(organisation.legal_name, test_organisation_data["legal_name"])


class CreateOrganisationUserTest(WithStaff, APITestCase):
    def setUp(self) -> None:
        self.organisation = models.Organisation.objects.create(**test_organisation_data)
        self.set_up_staff()

    def test(self) -> None:
        """
        Ensure we can create a new organisation object.
        """
        url = reverse("organisationuser-list")

        data = {**test_user_data, "organisation": self.organisation.pk}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.OrganisationUser.objects.count(), 1)
        user = models.OrganisationUser.objects.get()

        self.assertEqual(user.organisation, self.organisation)
        self.assertEqual(user.first_name, data["first_name"])
        self.assertEqual(user.last_name, data["last_name"])
        self.assertEqual(user.email, data["email"])
        self.assertEqual(user.username, data["username"])


class CreateBoardTest(WithStaff, APITestCase):
    def setUp(self) -> None:
        self.organisation = models.Organisation.objects.create(**test_organisation_data)
        self.set_up_staff()

    def test(self) -> None:
        """
        Ensure we can create a new board object.
        """

        url = reverse("board-list")
        data = {**test_board_data, "organisation": self.organisation.pk}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Board.objects.count(), 1)
        board = models.Board.objects.get()
        # TODO add test for token login
        self.assertEqual(board.organisation, self.organisation)
        self.assertEqual(board.model, data["model"])
        self.assertEqual(board.name, data["name"])
        self.assertEqual(board.username, data["serial_number"])
        self.assertEqual(board.serial_number, data["serial_number"])
        self.assertEqual(board.post_interval, data["post_interval"])
        self.assertEqual(board.sample_interval, data["sample_interval"])
        self.assertEqual(board.room_height, data["room_height"])
        self.assertEqual(board.room_width, data["room_width"])
        self.assertEqual(board.room_length, data["room_length"])
        self.assertEqual(board.room_occupation, data["room_occupation"])


class CreateBoardMeasurementTest(APITestCase):
    def setUp(self) -> None:
        self.organisation = models.Organisation.objects.create(**test_organisation_data)
        self.board = models.Board.objects.create(
            **test_board_data, organisation=self.organisation
        )
        self.client.force_login(user=self.board)

    def test(self) -> None:
        """
        Ensure we can create a new organisation object.
        """
        url = reverse("boardmeasurement-list")

        data = test_measurement_data
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.BoardMeasurement.objects.count(), 1)
        measurement = models.BoardMeasurement.objects.get()
        self.assertEqual(measurement.magnitude, data["magnitude"])
        self.assertEqual(measurement.board, self.board)
        self.assertEqual(measurement.data, data["data"])
