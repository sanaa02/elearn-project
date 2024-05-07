# module/urls.py
from django.urls import path
from .views import ModuleList, ModuleDetail, UploadFileModules

urlpatterns = [
    path('upload/', UploadFileModules.as_view(), name='upload-modules'),
    path('', ModuleList.as_view(), name='module-list'),
    path('<int:pk>/', ModuleDetail.as_view(), name='module-detail'),
]
