from ariadne import ObjectType

from api.models import UserProfile, User
from lib.typing import ResolveInfo

user = ObjectType('User')


@user.field('profile')
def resolve_boards(user: User, info: ResolveInfo):
    return user.get_profile()
