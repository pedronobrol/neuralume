from celery import shared_task
from store.manager import persist_measurements

@shared_task
def persist_cached_measurements():
    persist_measurements()