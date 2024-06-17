from ariadne import (
    load_schema_from_path,
    make_executable_schema,
    snake_case_fallback_resolvers,
)
from ariadne.contrib.django.scalars import date_scalar, datetime_scalar

from api.resolvers import resolvers
from api.schema.drivectives import (
    RequiresHumanUserDirective,
    RequiresBoardAgentDirective,
)

scalars = [date_scalar, datetime_scalar]

directives = {
    "requiresHumanUser": RequiresHumanUserDirective,
    "requiresBoardAgent": RequiresBoardAgentDirective,
}


schema = make_executable_schema(
    load_schema_from_path("api/schema/"),
    *resolvers,
    snake_case_fallback_resolvers,
    *scalars,
    directives=directives,
)
