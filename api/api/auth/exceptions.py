"""
Module that defines all authentication exceptions that can be raised in the
process of authenticating and authorising a user's request.
"""

from django.utils.translation import ugettext_lazy as _


class AuthenticationError(Exception):
    """
    Base authentication error class. Any authentication exception derives
    from this exception, i.e. excepting this exception should catch all
    exceptions raised programmatically by this app.
    """

    default_message = None

    def __init__(self, message=None):
        if message is None:
            message = self.default_message

        super().__init__(message)


class TokenError(AuthenticationError):
    """Base class for errors related to token-based authentication. """

    pass


class PermissionDenied(TokenError):
    """
    Exception raised when a user is not authorised to perform an action.
    This exception is not and should not be let raise for GraphQL requests.
    """

    default_message = _("You do not have permission to perform this action")


class LoginRequiredError(TokenError):
    """
    Exception raised when a request that requires login does not provide valid
    authentication credentials.
    """

    default_message = _("Login is required")


class ExpiredTokenError(TokenError):
    """
    Exception raised when a token is valid but has expired.
    """

    default_message = _("Signature has expired")


class ExpiredRefreshTokenError(TokenError):
    """
    Exception raised when a refresh token is valid but has expired.
    """

    default_message = _("Refresh token has expired")


class InvalidTokenError(TokenError):
    """
    Error for cases when the provided token cannot be decoded or is not valid.
    """

    default_message = _("Token is invalid")
