from datetime import timedelta

from ariadne import ObjectType
from django.db.models import Avg
from django.utils.timezone import now
from ariadne import convert_kwargs_to_snake_case


from api.models import Board, BoardMeasurement, MeasurementMagnitude
from lib.typing import ResolveInfo

board = ObjectType('Board')


@board.field('currentAverage')
def resolve_current_average(board: Board, info: ResolveInfo, magnitude: str):
    try:
        measurement: BoardMeasurement = board.measurements.filter(
            magnitude=magnitude).order_by('-measured_at').first()
        return measurement.data
    except AttributeError:
        return None


@board.field('lastWeekAverage')
def resolve_last_week_average(board: Board, info: ResolveInfo, magnitude: str):
    return (board
            .measurements
            .filter(measured_at__gt=now() - timedelta(days=7),
                    magnitude=magnitude).aggregate(Avg('data'))['data__avg'])


@board.field('historicData')
@convert_kwargs_to_snake_case
def resolve_historic_data(board: Board, info: ResolveInfo, magnitude: str,
                          time_interval: int, num_points: int):
    time_interval = timedelta(minutes=time_interval)
    time_start = now() - time_interval

    queryset_all_points = (board
                           .measurements
                           .filter(magnitude=magnitude, measured_at__gte=time_start))
    total = queryset_all_points.count()
    step = total // num_points if total > num_points else 1
    
    # TODO WARNING: THIS IS EXTREMELY UNDERPERFORMING WHEN QUERYING LARGE TIME SCALES
    #  .. SQL AGGREGATION SHOULD BE USED INSTEAD    
    return (queryset_all_points
            .order_by('-measured_at').values('data', 'measured_at')[::step])
