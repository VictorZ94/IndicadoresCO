from django.core.management.base import BaseCommand, CommandError
from api.models import Years
import json


class Command(BaseCommand):
    help = "Load data years"

    def add_arguments(self, parser):
        parser.add_argument("--path", type=str)

    def handle(self, *args, **kwargs):
        print("Clean old year data")
        Years.objects.all().delete()

        file = kwargs['path']
        with open(file) as f:
            years = json.load(f)
            for year in years:
                try:
                    create_year = Years(year=year)
                    create_year.save()
                except Years.DoesNotExist:
                    raise CommandError(f"Year {year} already exists")

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Successfully created year {year}")
                )

# python3 manage.py load_mydata --path moke/years.json
