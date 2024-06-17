"""ariadne_django_jwt resolvers module"""
import secrets

from ariadne import convert_kwargs_to_snake_case
from django.contrib.auth import authenticate
from graphql import GraphQLResolveInfo

from api.models import User
from api.schema.typedefs import AuthToken, RequestTokenResponse, VerifyTokenResponse
from .backends import Backend
from .exceptions import ExpiredTokenError, InvalidTokenError, ExpiredRefreshTokenError
from .models import RefreshToken
from .utils import (
    create_token,
    decode_jwt,
    create_refresh_token,
    revoke_token,
)


def resolve_request_token(
    _parent, info: GraphQLResolveInfo, email: str, password: str
) -> RequestTokenResponse:

    user = authenticate(
        request=info.context["request"], username=email, password=password
    )
    if user is None:
        return RequestTokenResponse(success=False, error_message="Invalid credentials")

    auth_token = AuthToken(
        **{
            "token": create_token(user),
            "refresh_token": RefreshToken.objects.create(user=user),
        }
    )
    return RequestTokenResponse(success=True, auth_token=auth_token)


@convert_kwargs_to_snake_case
def resolve_refresh_token(parent, info, refresh_token) -> RequestTokenResponse:
    """Resolves the refresh token mutation"""
    try:
        new_auth_token = create_refresh_token(refresh_token)
        return RequestTokenResponse(success=True, auth_token=new_auth_token)
    except ExpiredRefreshTokenError as exc:
        return RequestTokenResponse(success=False, error_message=exc.__str__())


def resolve_verify_token(parent, info, token: str):
    """Resolves the verify token mutation"""
    token_verification = {}

    try:
        decoded = decode_jwt(token)
        token_verification["is_valid"] = True
        token_verification["user"] = decoded.get("user")

    except (InvalidTokenError, ExpiredTokenError):
        token_verification["is_valid"] = False

    return token_verification


@convert_kwargs_to_snake_case
def resolve_revoke_token(parent, info, refresh_token: str):
    try:
        revoke_token(refresh_token)
    except RefreshToken.DoesNotExist:
        pass
    return {"success": True, "error_message": None}
