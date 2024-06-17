from django.db.models import signals
from django.dispatch import receiver
from api.models import Board


@receiver(signals.pre_save, sender=Board)
def pre_create_board(sender, instance: Board, **_kwargs):
    """
    Registers user name as serial number and sets unusable password to board (only
    token authentication is allowed).
    """