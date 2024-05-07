from django.urls import path
# from .views import ProfessorList, ProfessorDetail
from . import views

urlpatterns = [
    path('upload/', views.UploadProfessorView.as_view(), name='upload-professor'),
    path('', views.ProfessorList.as_view(), name='professor-list'),
    path('<int:pk>/', views.ProfessorDetail.as_view(), name='professor-detail'),
]
