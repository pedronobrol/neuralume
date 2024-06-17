from .resolve_query import query
from .resolve_mutation import mutation
from .models.resolve_user_profile import user_profile
from .models.resolve_user import user
from .models.resolve_board import board

resolvers = [query, mutation, user, user_profile, board]
