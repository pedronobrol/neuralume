import binascii
import os
from datetime import datetime

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from auth import signals
from lib.models import BaseModel
from api.models import User


def refresh_token_has_expired(issue_dt: datetime, user: User) -> bool:
    """
    Helper function that determines whether the issue date of a refresh token
    implies that the token has expired, compliant to the settings.

    :param issue_dt: the date and time that the token was issued
    :param user: user that owns the refresh token
    :return: True if the token has expired, and false otherwise.
    """

    expiration_delta = settings.AUTH_JWT_REFRESH_EXPIRATION_DELTA
    now = timezone.localtime()
    end_of_life = issue_dt + expiration_delta
    return now > end_of_life


class AbstractRefreshToken(BaseModel):
    """
    Abstract base model that provides all the necessary functionality to
    persist and manage refresh tokens for token-based authentication.

    :var user: Foreign key to the user that owns the refresh token.
    :var token: The string that contains the refresh token.
    :var revoked_at: a nullable datetime field that contains the date the
    token was revoked at, if any.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="refresh_tokens",
    )

    token = models.CharField(max_length=255, editable=False)
    revoked_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
        verbose_name = _("refresh token")
        verbose_name_plural = _("refresh tokens")
        # TODO why is this unique_together
        unique_together = ("token", "revoked_at")

    def __str__(self):
        return self.token

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self._cached_token = self.generate_token()

        super().save(*args, **kwargs)

    @staticmethod
    def generate_token():
        return binascii.hexlify(
            os.urandom(settings.AUTH_JWT_REFRESH_TOKEN_N_BYTES),
        ).decode()

    def get_token(self):
        if hasattr(self, "_cached_token"):
            return self._cached_token
        return self.token

    def is_expired(self, request=None):
        return refresh_token_has_expired(self.created_at, self.user)

    def revoke(self, request=None):
        self.revoked_at = timezone.now()
        self.save(update_fields=["revoked_at"])

        signals.refresh_token_revoked.send(
            sender=AbstractRefreshToken,
            request=request,
            refresh_token=self,
        )

    @classmethod
    def fetch(cls, token=None) -> "RefreshToken":
        return cls.objects.get(token=token, revoked_at__isnull=True)

    @classmethod
    def fetch_or_revoke(cls, token=None):
        token = cls.fetch(token)
        if token.is_expired():
            token.revoke()
            return None
        return token

    @classmethod
    def create_and_revoke(cls, token: "AbstractRefreshToken") -> "RefreshToken":
        token.revoke()
        return cls.objects.create(user=token.user)


class RefreshToken(AbstractRefreshToken):
    """RefreshToken default model"""
