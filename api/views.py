# @Drf
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ViewSet

# @packages
import requests
from lxml import html

# @Model
from .models import Uvt, Salary, TransportAssistance, Years

# @Serializer
from .serializers import UVTSerializer, SalarySerializer, TransportAssistanceSerializer, YearSerializer


class UVTModelViewSet(ModelViewSet):
    serializer_class = UVTSerializer
    queryset = Uvt.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


# class UVTView(APIView):
#     def get(self, request):
#         uvt_data = Uvt.objects.all()
#         uvt_serialized = UVTSerializer(uvt_data, many=True)
#         return Response(data=uvt_serialized.data, status=status.HTTP_200_OK)

class SalaryModelViewSet(ModelViewSet):
    serializer_class = SalarySerializer
    queryset = Salary.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


class TransportAssistanceModelViewSet(ModelViewSet):
    serializer_class = TransportAssistanceSerializer
    queryset = TransportAssistance.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


class USDViewSet(ViewSet):
    URL = "https://www.larepublica.co/indicadores-economicos/mercado-cambiario/dolar"
    XPATH = "//div[@class='priceDetail']/span/text()"

    def list(self, request):
        usd_data = self.extraer_datos(url=self.URL, xpath=self.XPATH)
        trm_formatted = float(self.limpiar_formato(usd_data))
        return Response(data={"trm": trm_formatted}, status=status.HTTP_200_OK)

    def extraer_datos(self, url, xpath):
        respuesta = requests.get(url)
        arbol = html.fromstring(respuesta.content)
        datos = arbol.xpath(xpath)
        return " ".join(datos)

    def limpiar_formato(self, num):
        num = num.replace('$', '').strip()
        num = num.replace('.', '')
        num = num.replace(',', '.')
        return num


class YearModelViewSet(ModelViewSet):
    serializer_class = YearSerializer
    queryset = Years.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["post", "get"]
