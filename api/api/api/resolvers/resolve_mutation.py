from ariadne import MutationType

import auth.resolvers as auth_resolvers

mutation = MutationType()


mutation.set_field("requestToken", auth_resolvers.resolve_request_token)
mutation.set_field("verifyToken", auth_resolvers.resolve_verify_token)
mutation.set_field("refreshToken", auth_resolvers.resolve_refresh_token)
mutation.set_field("revokeToken", auth_resolvers.resolve_revoke_token)
