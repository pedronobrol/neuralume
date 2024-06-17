from auth.exceptions import AuthenticationError
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.http import HttpRequest
from rest_framework.authentication import BaseAuthentication

from api.models import User, Board
from auth.utils import decode_jwt, get_token_from_http_header, validate_refresh_token, \
    can_user_authenticate


class Backend(BaseBackend):
    """
    Base authentication backend for the API that extends Django's default
    `BaseBackend`.
    """

    def get_user(self, user_id):
        """Gets a user from its id"""
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        return user if self.user_can_authenticate(user) else None

    def user_can_authenticate(self, user):
        """
        Reject users with ``is_active=False`` and ``is_verified=False``.
        """
        return can_user_authenticate(user)


class DjangoJWTBackend(Backend):
    """
    Authentication backend that allows users to authenticate using a JSON Web
    Token.

    JWT are signed strings that already contain enough information to
    identify the user by the issuer. Thus, they do not need to be persisted in
    storage.

    This backend is included in `api.settings.AUTHENTICATION_BACKENDS`, so that
    when the `django.contrib.auth.authenticate()` method is called anywhere
    within the project, authentication using this method will be first
    attempted.
    """

    def authenticate(self, request: HttpRequest, token=None, **kwargs):
        """
        Extracts the token from the request, verifies its validity and
        determines whether the user can authenticate.

        Since regular tokens are not persisted (as opposed to refresh tokens),
        these cannot be revoked by the issuer directly, and so we have to check
        every time whether the user can still log in.

        :raises: auth.exceptions.InvalidTokenError,
        auth.exceptions.ExpiredTokenError
        """
        if token is not None:
            token_data = decode_jwt(token)
            User = get_user_model()
            credentials = {User.USERNAME_FIELD: token_data["user"]}
            try:
                user = User.objects.get(**credentials)
                if self.user_can_authenticate(user):
                    return user
            except User.DoesNotExist:
                return None


class DRFBoardTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):

        private_key = get_token_from_http_header(request)
        if private_key is not None:
            try:
                board = Board.objects.get(private_key=private_key)
            except Board.DoesNotExist:
                return None
            else:
                return board, private_key
