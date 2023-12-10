from rest_framework.routers import DefaultRouter
from .views import (
    UVTModelViewSet,
    SalaryModelViewSet,
    TransportAssistanceModelViewSet,
    USDViewSet
)

router = DefaultRouter()
router.register(prefix='uvt', viewset=UVTModelViewSet, basename='uvt')
router.register(prefix='salary', viewset=SalaryModelViewSet, basename='salary')
router.register(
    prefix='transport-assistance',
    viewset=TransportAssistanceModelViewSet,
    basename='transport-assistance'
)
router.register(prefix='usd', viewset=USDViewSet, basename='usd')
