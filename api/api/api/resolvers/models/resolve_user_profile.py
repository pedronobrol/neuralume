from ariadne import ObjectType

from api.models import UserProfile
from lib.typing import ResolveInfo

user_profile = ObjectType('UserProfile')


@user_profile.field('boards')
def resolve_boards(profile: UserProfile, info: ResolveInfo):
    return profile.boards.all()


