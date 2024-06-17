"""
Temporary file to properly create model instances
"""

from api.models import Organisation, Owner, OwnerType, OrganisationUser


def create_organisation(name: str, legal_name: str) -> Organisation:
    owner = Owner(owner_type=OwnerType.ORGANISATION)
    owner.save()

    return Organisation.objects.create(
        name=name,
        legal_name=legal_name,
        owner_entity=owner
    )


def create_organisation_user(
        username: str,
        password: str,
        first_name: str,
        last_name: str,
        organisation: Organisation,
        email: str) -> OrganisationUser:

    return OrganisationUser.objects.create_user(
        username=username,
        password=password,
        first_name=first_name,
        last_name=last_name,
        email=email,
        organisation=organisation)
