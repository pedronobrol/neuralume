from rest_framework.validators import ValidationError


def positive_number_validator(value):
    if value < 0:
        raise ValidationError("Value must be non-negative")
