from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user_app.api.views import UploadFileView, UserTokenObtainPairView, RegistrationView, list_users, getRoutes, testEndPoint

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('user_app.api.urls')),
    path('forum/', include('forums_app.api.urls')),
    path('module/', include('module_app.api.urls')),
    path('ressources/', include('ressources_app.api.urls')),
    path('professor/', include('professor_app.api.urls')),
    path('student/', include('student_app.api.urls')),
    path('token/', UserTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegistrationView.as_view(), name='auth_register'),
    path('upload-file/', UploadFileView.as_view(), name='upload_file'),
    path('list-users/', list_users, name='list_users'),
    path('routes/', getRoutes, name='routes'),
    path('test/', testEndPoint, name='test'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
