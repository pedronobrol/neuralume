from typing import TypedDict

from django.core.handlers.wsgi import WSGIRequest
from graphql.type.definition import GraphQLResolveInfo


class Context(TypedDict):
    request: WSGIRequest


class ResolveInfo(GraphQLResolveInfo):
    context: Context
