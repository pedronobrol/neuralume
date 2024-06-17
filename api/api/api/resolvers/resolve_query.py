from typing import Optional

from ariadne import QueryType, convert_kwargs_to_snake_case
from lib.typing import ResolveInfo
from api.models import *

from api.schema.typedefs import *
from auth.decorators import login_required

query = QueryType()


@query.field("myUser")
@login_required
def resolve_my_user(_parent, info: ResolveInfo) -> Optional[User]:
    return info.context["request"].user



@query.field("board")
@login_required
def resolve_board(_parent, info: ResolveInfo, /, *, id: str) -> Optional[Board]:
    user: User = info.context["request"].user

    try:
        board = Board.objects.get(id=id)
    except Board.DoesNotExist:
        return None
    else:
        if user.is_staff or board.owner == user.get_profile():
            return board

    return None
