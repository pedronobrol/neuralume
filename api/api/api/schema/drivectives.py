from ariadne import SchemaDirectiveVisitor
from graphql import default_field_resolver

from auth.decorators import board_agent_required, human_user_required


class RequiresBoardAgentDirective(SchemaDirectiveVisitor):
    def visit_field_definition(self, field, object_type):
        field.resolve = board_agent_required(field.resolve or default_field_resolver)
        return field


class RequiresHumanUserDirective(SchemaDirectiveVisitor):
    def visit_field_definition(self, field, object_type):
        field.resolve = human_user_required(field.resolve or default_field_resolver)
        return field
