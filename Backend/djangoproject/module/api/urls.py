# module/urls.py
from django.urls import path
from .views import ModuleList, ModuleDetail
from django.urls import path, include

urlpatterns = [
    path('', ModuleList.as_view(), name='module-list'),
    path('<int:pk>/', ModuleDetail.as_view(), name='module-detail'),
    path('', include('resource.api.urls'))
   
]
