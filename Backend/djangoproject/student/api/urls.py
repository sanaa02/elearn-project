from django.urls import path
from .views import ResourceListView, ResourceDetailView, QuizQuestionView, HomeworkCreateView

urlpatterns = [
    path('resources/', ResourceListView.as_view(), name='resource-list'),
    path('resources/<int:pk>/', ResourceDetailView.as_view(), name='resource-detail'),
    path('quiz/<int:pk>/', QuizQuestionView.as_view(), name='quiz-detail'),
    path('homework/', HomeworkCreateView.as_view(), name='homework-create'),
]
