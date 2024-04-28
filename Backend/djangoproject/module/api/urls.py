# module/urls.py
from django.urls import path
from .views import ModuleList, ModuleDetail

urlpatterns = [
    path('module/', ModuleList.as_view(), name='module-list'),
    path('module/<int:pk>/', ModuleDetail.as_view(), name='module-detail'),
]
