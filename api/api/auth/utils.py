from typing import Optional
from api.models import User
import datetime

import jwt
from django.conf import settings
from django.utils import timezone
from jwt.exceptions import DecodeError, ExpiredSignatureError

from auth.models import RefreshToken
from .exceptions import (
    LoginRequiredError,
    ExpiredTokenError,
    ExpiredRefreshTokenError,
    InvalidTokenError,
)

ORIGINAL_IAT_CLAIM = "orig_iat"
HTTP_AUTHORIZATION_HEADER = "HTTP_AUTHORIZATION"
AUTHORIZATION_HEADER_PREFIX = "Bearer"


def can_user_authenticate(user) -> bool:
    is_active = getattr(user, "is_active", False)
    return is_active


def get_token_from_http_header(request):
    """Retrieves the http authorization header from the request"""
    try:
        header = request.META.get(HTTP_AUTHORIZATION_HEADER, "")
        prefix, payload = header.split()
        if prefix.lower() == AUTHORIZATION_HEADER_PREFIX.lower():
            return payload
    except (AttributeError, ValueError):
        return None


def create_token(user: User, extra_payload=None):
    """Creates a JWT for an authenticated user"""
    extra_payload = extra_payload or {}
    if not user.is_authenticated:
        raise LoginRequiredError("JWT generation requires an authenticated user")

    expiration_delta = getattr(
        settings, "AUTH_JWT_EXPIRATION_DELTA", datetime.timedelta(minutes=5)
    )

    now = timezone.localtime()

    payload = {
        **extra_payload,
        "user": user.email,
        "iat": int(now.timestamp()),
        "exp": int((now + expiration_delta).timestamp()),
    }

    return jwt.encode(payload, settings.SECRET_KEY).decode("utf-8")


def revoke_token(refresh_token):
    token_obj = RefreshToken.fetch_or_revoke(refresh_token)
    if token_obj:
        token_obj.revoke()


def validate_refresh_token(refresh_token: str) -> Optional[RefreshToken]:
    try:
       return RefreshToken.fetch_or_revoke(refresh_token)
    except RefreshToken.DoesNotExist:
        pass

def create_refresh_token(refresh_token):
    """Refreshes a JWT if possible"""
    if (refresh_token_obj := validate_refresh_token(refresh_token)) is not None:
        user = refresh_token_obj.user
        if can_user_authenticate(user):
            return {
                "token": create_token(user),
                "refresh_token": RefreshToken.create_and_revoke(refresh_token_obj),
            }
        # we do not want to conceal that a user might be deactivated or not verified.
        # the user should never manipulate the refresh token directly, so for the automated frontend a deactivated user
        # is equivalent to an expired refresh token (session must be terminated).
        # for an intruder, we do not want to give extra information.

    raise ExpiredRefreshTokenError


def decode_jwt(token):
    """Decodes a JWT"""
    try:
        decoded = jwt.decode(token, settings.SECRET_KEY)

    except ExpiredSignatureError:
        raise ExpiredTokenError()

    except DecodeError:
        raise InvalidTokenError()

    return decoded
