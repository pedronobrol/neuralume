from ariadne import ObjectType

from api.models import Room
from lib.typing import ResolveInfo

room = ObjectType('Room')


@room.field('boards')
def resolve_boards(room: Room, info: ResolveInfo):
    return room.boards
