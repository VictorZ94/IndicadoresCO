from rest_framework.serializers import ModelSerializer
from api.models import Uvt, Salary, TransportAssistance, Years


class UVTSerializer(ModelSerializer):
    class Meta:
        model = Uvt
        exclude = ["updated_at"]
        read_only = ["created_at"]


class SalarySerializer(ModelSerializer):
    class Meta:
        model = Salary
        exclude = ["updated_at"]
        read_only = ["created_at"]


class TransportAssistanceSerializer(ModelSerializer):
    class Meta:
        model = TransportAssistance
        exclude = ["updated_at"]
        read_only = ["created_at"]


class YearSerializer(ModelSerializer):
    class Meta:
        model = Years
        exclude = ["created_at", "id"]
