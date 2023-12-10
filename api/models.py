from django.db import models
import uuid
# Create your models here.


class Years(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    year = models.IntegerField(primary_key=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.year}"


class Uvt(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    year = models.OneToOneField(
        Years,
        to_field="year",
        on_delete=models.CASCADE,
        primary_key=True,
    )
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    value = models.IntegerField()

    def __str__(self):
        return f"{self.year} {self.value}"


class Salary(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    year = models.OneToOneField(
        Years,
        to_field="year",
        on_delete=models.CASCADE,
        primary_key=True,
    )
    value = models.IntegerField()


class TransportAssistance(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    year = models.OneToOneField(
        Years,
        to_field="year",
        on_delete=models.CASCADE,
        primary_key=True,
    )
    value = models.IntegerField()
