import csv

import pandas as pd
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.http import HttpResponse

from api.models import (
    Board,
    BoardMeasurement,
    User,
    UserProfile,
    Salesperson
)


def export_as_csv(self, request, queryset):
    meta = self.model._meta

    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = "attachment; filename={}.csv".format(meta)

    df = pd.DataFrame(list(queryset.values()))
    df.to_csv(path_or_buf=response)
    csv.writer(response)
    return response


export_as_csv.short_description = "Export Selected as CSV"


class BoardAdmin(admin.ModelAdmin):
    pass


class BoardMeasurementAdmin(admin.ModelAdmin):
    actions = [export_as_csv]


class UserProfileAdmin(admin.ModelAdmin):
    pass


admin.site.register(BoardMeasurement, BoardMeasurementAdmin)
admin.site.register(Board, BoardAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Salesperson)
