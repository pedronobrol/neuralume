"""
This module defines all the API models.
"""
import binascii
import os
import string
import random
from typing import Optional

from django.contrib.auth.models import AbstractUser, UserManager as DjangoUserManager
from django.db import models

from api import settings
from lib.models import BaseManager, BaseModel
from django.utils.translation import gettext_lazy as _


class UserManager(DjangoUserManager, BaseManager):
    """
    The user manager replaces the default Django user manager to:
        1. include the custom base manager functionalities
        2. replace the admin user creation helpers that require an email field (we do
        not use emails for base user identification).
    """

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, email, and password.
        """
        if not email:
            raise ValueError("The given email must be set")
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser, BaseModel):
    """
    This is our base user model. It only has a username and a password field. For board
    agents, the username is always the serial number, and the password is unusable
    (they only communicate through tokens, basic authentication is disabled).

    Custom user types, such as the organisation user, or the board, extend from
    this model. Explicit one to one parent links are always required so to make the links
    readily available.
    """

    REQUIRED_FIELDS = []

    date_joined = None
    first_name = None
    last_name = None
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()
    objects_original = DjangoUserManager()

    def get_profile(self):
        try:
            return self.profile
        except UserProfile.DoesNotExist:
            return None


class UserProfile(BaseModel):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    organisation_name = models.CharField(max_length=255)
    legal_name = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        related_name="profile",
    )

    class Meta:
        verbose_name = "user profile"


class DeviceModel(models.TextChoices):
    NEBULA_100 = "N100", "Nebula 100"
    NEBULA_200 = "N200", "Nebula 200"


def generate_private_key():
    return binascii.hexlify(
        os.urandom(settings.AUTH_JWT_REFRESH_TOKEN_N_BYTES),
    ).decode()


def generate_serial_number():
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))


class Board(BaseModel):
    """
    This is the model for saving registered boards. All boards are users because they
    are connected to the server and write and read data from it. Therefore, they must
    have access to token-based authentication. Basic authentication, however,
    is disabled, as passwords are always set unusable pre-board creation.

    The board serial number is a unique number that identifies each unit sold. The
    username is set to be the same as the serial number.

    The name of the board is an owner-editable string to label each board in a
    distinctive way.

    Sample and post interval configure the frequency with which a board reads data from
    the sensors and sends it to the server, respectively.

    Each board belongs to a room. This is done this way to allow boards to be moved
    from room to room with ease, without having to reconfigure all room parameters. It
    also helps us label the data to a particular room, which enables us to do better
    data analysis and provide more accurate results.
    """

    device_model = models.CharField(choices=DeviceModel.choices, max_length=255)


    serial_number = models.CharField(max_length=255, unique=True, default=generate_serial_number)
    private_key = models.CharField(default=generate_private_key, unique=True,
                                   max_length=255)

    owner = models.ForeignKey(
        UserProfile, related_name="boards", on_delete=models.PROTECT, null=True
    )
    label = models.CharField(max_length=255, blank=True)
    height = models.FloatField()  # In metres
    width = models.FloatField()  # In metres
    length = models.FloatField()  # In metres
    occupation = models.IntegerField()
    post_interval = models.IntegerField(null=True)  # In milliseconds
    sample_interval = models.IntegerField(null=True)  # In milliseconds
    is_enabled = models.BooleanField(default=False)
    enable_led = models.BooleanField(default=True)

    @property
    def is_authenticated(self):
        return True


    class Meta:
        verbose_name = "board"

    def __str__(self) -> str:
        return "%s (%s) by (%s)" % (self.serial_number, self.label, self.owner.__str__())


class MeasurementMagnitude(models.TextChoices):
    TEMPERATURE = "T", "Temperature"
    CO2 = (
        "CO2",
        "CO2 concentration",
    )
    CO = (
        "CO",
        "CO concentration",
    )
    VOC = (
        "VOC",
        "VOC concentration",
    )
    PRESSURE = "P", "Pressure"
    RELATIVE_HUMIDITY = "RH", "Relative Humidity"
    TRANSMISSION_RATE = "R0", "Transmission Rate"


class BoardMeasurement(BaseModel):
    """
    Board measurements are each separate measurement made by the board, corresponding
    to a different magnitude. For now, we have a shortlist of available magnitudes that
    we currently support or plant to support in the future.
    """

    magnitude = models.CharField(max_length=255, choices=MeasurementMagnitude.choices)
    measured_at = models.DateTimeField()
    board = models.ForeignKey(
        Board, related_name="measurements", on_delete=models.PROTECT
    )
    data = models.FloatField()

    def __str__(self):
        return f"{self.magnitude} measurement of {self.data:+.2f}"


class Salesperson(BaseModel):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name


class Sale(BaseModel):
    id = models.AutoField(unique=True, primary_key=True)
    stripe_id = models.CharField(max_length=255, unique=True)
    salesperson = models.ForeignKey(Salesperson, on_delete=models.PROTECT, null=True)
