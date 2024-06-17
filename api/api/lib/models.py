"""
This module defines base models and objects to be used in other apps.
"""

import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class BaseManager(models.Manager):
    """
    The base manager replaces the default Django Manager so that objects can be marked
    as "deleted" at the API level, but actually be kept at the database level. This is
    done by filtering out of the query the entries that include a non-null `deleted_at`
    timestamp.
    """

    def get_queryset(self):
        """
        Replaces the default queryset selection to filter out deleted objects and sort
        them by creation date by default.
        """
        return (
            super()
            .get_queryset()
            .filter(deleted_at__isnull=True)
            .order_by("-created_at")
        )


class BaseModel(models.Model):
    """
    The base model is an abstract model blueprint that all custom models inherit from.
    This has built-in creation, update and deletion date, and replaces the default
    `.delete` method to mark objects as deleted at the API level but keep them on the
    database.
    """

    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    objects = BaseManager()
    objects_original = models.Manager()

    def delete(self, *args, **kwargs):
        self.deleted_at = timezone.now()
        self.save()
