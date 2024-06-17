from typing import Set, List, Dict
from django.core.cache import caches
from django.utils.timezone import now
from django_redis.client import DefaultClient as RedisClient
import pickle
from datetime import datetime
import pandas as pd
# from pandas.tseries.frequencies import to_offset

from api.models import BoardMeasurement, MeasurementMagnitude, Board

# Measurements cache
cache: RedisClient = caches["measurements"]


def cache_measurement(
    board_id: str, timestamp: datetime, magnitude: str, value: float
) -> None:
    cache.set(f"{board_id}:{magnitude}:{int(timestamp.timestamp())}", value)
    add_board(board_id)


def fetch_measurements() -> (List[Dict], List[str]):
    cached_boards = get_cached_boards()
    measurements = []
    reviewed_entries = []
    for board in cached_boards:
        room_id = Board.objects.get(id=board).room_id
        for magnitude in MeasurementMagnitude.values:
            entries = cache.keys(f"{board}:{magnitude}:*")
            reviewed_entries.extend(entries)
            for key, value in cache.get_many(entries).items():
                timestamp = int(key.split(":")[2])
                measured_at = datetime.utcfromtimestamp(timestamp)
                measurements.append({
                    "board_id": board,
                    "measured_at": measured_at,
                    "data": value,
                    "magnitude": magnitude,
                    "room_id": room_id
                })
    return measurements, reviewed_entries


def average_measurements(measurements: List[Dict]):
    df = pd.DataFrame(measurements)
    # measured_at_group = pd.Grouper(key='measured_at', freq=to_offset(td))
    group_by = df.groupby(["board_id", "magnitude", "room_id"])
    averaged_df = group_by.mean()
    averaged_df['measured_at'] = now()

    return (averaged_df
            .reset_index(level=['board_id', 'magnitude', 'room_id'])
            .to_dict('records'))


def persist_measurements(perform_average: bool = True):
    measurements, reviewed_entries = fetch_measurements()
    if len(measurements) > 0:
        measurements = measurements if not perform_average else average_measurements(measurements)
        measurement_objects = [BoardMeasurement(**record) for record in measurements]
        BoardMeasurement.objects.bulk_create(measurement_objects)
        cache.delete_many(reviewed_entries)


def add_board(board_id: str) -> None:
    cached_boards = get_cached_boards()
    cached_boards.add(board_id)
    cache.set("cached_boards", pickle.dumps(cached_boards))


def remove_board(board_id: str) -> None:
    cached_boards = get_cached_boards()
    cached_boards.remove(board_id)
    cache.set("cached_boards", pickle.dumps(cached_boards))


def get_cached_boards() -> Set[str]:
    cached_boards_pickled = cache.get("cached_boards")
    return (
        pickle.loads(cached_boards_pickled)
        if cached_boards_pickled is not None
        else set()
    )
