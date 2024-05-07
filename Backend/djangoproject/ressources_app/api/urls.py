from django.urls import path
from .views import (
    ResourceListCreateAPIView, 
    ResourceRetrieveUpdateDestroyAPIView,
    QuizQuestionListCreateAPIView,
    QuizQuestionRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('modules/<int:module_id>/resources/', ResourceListCreateAPIView.as_view(), name='module-resource-list-create'),
    path('modules/<int:module_id>/resources/<int:pk>/', ResourceRetrieveUpdateDestroyAPIView.as_view(), name='module-resource-detail'),
    path('modules/<int:module_id>/resources/<int:resource_id>/questions/', QuizQuestionListCreateAPIView.as_view(), name='module-resource-quiz-question-list'),
    path('modules/<int:module_id>/resources/<int:resource_id>/questions/<int:pk>/', QuizQuestionRetrieveUpdateDestroyAPIView.as_view(), name='module-resource-quiz-question-detail'),
]
