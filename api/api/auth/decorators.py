from django.http import HttpRequest
from graphql import GraphQLResolveInfo

from .exceptions import LoginRequiredError


def login_required(resolver):
    """
    This decorator enforces login for any GraphQL resolver.
    :param resolver: any callable that acts as a GraphQL resolver
    :return: wrapped resolver with the enforced login.
    :raises: auth.exceptions.LoginRequiredError if the user is not
    authenticated.
    """

    def wrapper(parent, info: GraphQLResolveInfo, *args, **kwargs):
        user = getattr(info.context["request"], "user", None)
        if user is not None and user.is_authenticated:
            return resolver(parent, info, *args, **kwargs)
        else:
            raise LoginRequiredError()

    return wrapper


def board_agent_required(resolver):
    """
    This decorator enforces logging in as a board agent for any GraphQL resolver.
    :param resolver: any callable that acts as a GraphQL resolver
    :return: wrapped resolver with the enforced login.
    :raises: auth.exceptions.LoginRequiredError if the user is not
    authenticated.
    """

    def wrapper(parent, info: GraphQLResolveInfo, *args, **kwargs):
        user = getattr(info.context["request"], "user", None)
        if user is not None and user.is_authenticated and user.is_board_agent:
            return resolver(parent, info, *args, **kwargs)
        else:
            raise LoginRequiredError()

    return wrapper


def human_user_required(resolver):
    """
    This decorator enforces logging in as a human user for any GraphQL resolver.
    :param resolver: any callable that acts as a GraphQL resolver
    :return: wrapped resolver with the enforced login.
    :raises: auth.exceptions.LoginRequiredError if the user is not
    authenticated.
    """

    def wrapper(parent, info: GraphQLResolveInfo, *args, **kwargs):
        user = getattr(info.context["request"], "user", None)
        if user is not None and user.is_authenticated and user.is_human_user:
            return resolver(parent, info, *args, **kwargs)
        else:
            raise LoginRequiredError()

    return wrapper
