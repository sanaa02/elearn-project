from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import list_users
urlpatterns = [
    path('list-users/', list_users, name='list_users'),
    path('upload/', views.UploadFileView.as_view(), name='upload_csv'),
    path('token/', views.UserTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegistrationView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),

]
