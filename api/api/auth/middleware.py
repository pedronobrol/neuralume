from ariadne import format_error
from django.contrib.auth import authenticate
from django.contrib.auth.models import AnonymousUser
from graphql import GraphQLError

from auth.exceptions import AuthenticationError
from .utils import get_token_from_http_header

from pprint import pprint
import json
# __all__ = ["TokenMiddleware"]


class TokenMiddleware:
    """
    GraphQL middleware that automatically authenticates a user if a Token is
    provided in the request header, and attaches the user object to the context.

    This is *not* a custom Django middleware, but an Ariadne middleware,
    which runs only on GraphQL requests.
    """

    def resolve(self, next, root, info, **kwargs):
        """
        Resolves the request and performs the authentication.
        """
        request = info.context["request"]
        token = get_token_from_http_header(request)
        if token is not None:
            user = getattr(request, "user", None)

            if user is None or isinstance(user, AnonymousUser):
                user = authenticate(request=request, token=token)
            if user is not None:
                setattr(request, "user", user)

        return next(root, info, **kwargs)


def error_formatter(error: GraphQLError, debug: bool = False) -> dict:
    """
    Custom error formatter for the GraphQL view.

    It adds a ``'code'`` key with value ``'AUTHENTICATION_ERROR'`` when the
    oirignal error raised is an instance of
    `auth.exceptions.AuthenticationError`.

    :param error: GraphQL error that wraps the exception captured in a
    resolver.
    :param debug: whether the GraphQL server is running in debug mode
    :return: a dictionary with the errors object that will be attached to the
    GraphQL response.
    """

    # The following line is implemented according to Ariadne's recommendation.
    formatted = error.formatted if not debug else format_error(error, debug)

    if (original_error := error.original_error) is not None:

        # weirdly enough, it seems like Ariadne sometimes returns a GraphQLError
        # in the initial `error.original_error` method.
        if isinstance(original_error, AuthenticationError) or (
            isinstance(original_error, GraphQLError)
            and isinstance(original_error.original_error, AuthenticationError)
        ):
            formatted["extensions"]["code"] = "AUTHENTICATION_ERROR"
    return formatted


class DebuggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        # print('--------------------------------------------')
        # print()
        # print()
        # print('--------------------------------------------')
        # pprint(json.loads(request.body.decode()))
        response = self.get_response(request)
        # print(response.content)

        # Code to be executed for each request/response after
        # the view is called.

        return response
