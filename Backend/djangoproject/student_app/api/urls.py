from django.urls import path
from .views import StudentListYear, StudentList, UploadStudentView

urlpatterns = [
    # path('resources/', ResourceListView.as_view(), name='resource-list'),
    # path('resources/<int:pk>/', ResourceDetailView.as_view(), name='resource-detail'),
    # path('quiz/<int:pk>/', QuizQuestionView.as_view(), name='quiz-detail'),
    # path('homework/', HomeworkCreateView.as_view(), name='homework-create'),
    path('', StudentList.as_view(), name='student-list'),
    #path('<year>/', StudentListYear.as_view(), name='student-list-year'),
    path('upload/', UploadStudentView.as_view(), name='student-upload-file'),
]
