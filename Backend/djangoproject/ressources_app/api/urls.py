from django.urls import path
from .views import (
    RessourceListCreateAPIView, 
    RessourceRetrieveUpdateDestroyAPIView,
    QuizQuestionListCreateAPIView,
    QuizQuestionRetrieveUpdateDestroyAPIView,
    QuizOptionListCreateAPIView,
    QuizOptionRetrieveUpdateDestroyAPIView, 
    RessourceListView, 
    RessourceDetailView, 
    QuizQuestionView,
    HomeworkCreateView,
<<<<<<< HEAD
)

urlpatterns = [
    # path('<int:module_id>/resources/', RessourceListCreateAPIView.as_view(), name='module-resource-list-create'),
    # path('<int:module_id>/resources/<int:pk>/', RessourceRetrieveUpdateDestroyAPIView.as_view(), name='module-resource-detail'),
=======
    ProfessorHomeworkConsultView,
)

urlpatterns = [
    path('<int:module_id>/resources/', RessourceListCreateAPIView.as_view(), name='module-resource-list-create'),
    path('<int:module_id>/resources/<int:pk>/', RessourceRetrieveUpdateDestroyAPIView.as_view(), name='module-resource-detail'),
>>>>>>> ferielmch
    path('<int:module_id>/resources/<int:resource_id>/questions/', QuizQuestionListCreateAPIView.as_view(), name='module-resource-quiz-question-list'),
    path('<int:module_id>/resources/<int:resource_id>/questions/<int:pk>/', QuizQuestionRetrieveUpdateDestroyAPIView.as_view(), name='module-resource-quiz-question-detail'),
    path('<int:module_id>/resources/<int:resource_id>/questions/<int:quiz_question_id>/options/', QuizOptionListCreateAPIView.as_view(), name='module-quiz-question-option-list'),
    path('<int:module_id>/resources/<int:resource_id>/questions/<int:quiz_question_id>/options/<int:pk>/', QuizOptionRetrieveUpdateDestroyAPIView.as_view(), name='module-quiz-question-option-detail'),
    path('', RessourceListView.as_view(), name='resource-list'),
    path('<int:pk>/', RessourceDetailView.as_view(), name='resource-detail'),
    path('quiz/<int:pk>/', QuizQuestionView.as_view(), name='quiz-detail'),
    path('homework/', HomeworkCreateView.as_view(), name='homework-create'),
<<<<<<< HEAD
=======
    path('homework/list/', ProfessorHomeworkConsultView.as_view(), name='homework-list'),
>>>>>>> ferielmch
]
