from django.urls import path
from .views import (
    ResourceListCreateAPIView, 
    ResourceRetrieveUpdateDestroyAPIView,
    QuizQuestionListCreateAPIView,
    QuizQuestionRetrieveUpdateDestroyAPIView,
    QuizOptionListCreateAPIView,
    QuizOptionRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('<int:module_id>/resources/', ResourceListCreateAPIView.as_view(), name='module-resource-list-create'),
    path('<int:module_id>/resources/<int:pk>/', ResourceRetrieveUpdateDestroyAPIView.as_view(), name='module-resource-detail'),
    path('<int:module_id>/resources/<int:resource_id>/questions/', QuizQuestionListCreateAPIView.as_view(), name='module-resource-quiz-question-list'),
    path('<int:module_id>/resources/<int:resource_id>/questions/<int:pk>/', QuizQuestionRetrieveUpdateDestroyAPIView.as_view(), name='module-resource-quiz-question-detail'),
    path('<int:module_id>/resources/<int:resource_id>/questions/<int:quiz_question_id>/options/', QuizOptionListCreateAPIView.as_view(), name='module-quiz-question-option-list'),
    path('<int:module_id>/resources/<int:resource_id>/questions/<int:quiz_question_id>/options/<int:pk>/', QuizOptionRetrieveUpdateDestroyAPIView.as_view(), name='module-quiz-question-option-detail'),
]
