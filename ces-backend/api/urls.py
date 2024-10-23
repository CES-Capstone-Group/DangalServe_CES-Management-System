from django.urls import path
from . import views  # Import your views
from .views import RefreshTokenView, ResearchAgendaViewSet, DownloadProposalDoc
from .views import (
    ProposalListCreateView,
    ProposalDetailView,
    ProposalResubmissionView,
    ProposalVersionListView,
    ProposalVersionDetailView,
    BarangayApprovalView,
    BarangayApprovedProposalsView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializer import CustomTokenObtainPairSerializer
# Define URL patterns
urlpatterns = [
    # Login Path
    # path('login/', LoginApiView.as_view(), name='login'),  # Use custom login view for JWT
    path('refresh-token/', RefreshTokenView.as_view(), name='refresh-token'),
    
    path('token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('proposals/', ProposalListCreateView.as_view(), name='proposal-list-create'),
    path('proposals/<int:pk>/', ProposalDetailView.as_view(), name='proposal-detail'),
    # Resubmit a rejected proposal (create a new version)
    path('proposals/<int:proposal_id>/resubmit/', ProposalResubmissionView.as_view(), name='proposal-resubmission'),
    
    # List all versions of a proposal
    path('proposals/<int:proposal_id>/versions/', ProposalVersionListView.as_view(), name='proposal-versions-list'),
    
    # Get details of a specific version
    path('proposals/<int:proposal_id>/versions/<int:version_number>/', ProposalVersionDetailView.as_view(), name='proposal-version-detail'),
    path('proposals/<int:proposal_id>/approve/', BarangayApprovalView.as_view(), name='barangay_approval'),
    path('proposals/<int:proposal_id>/download/', DownloadProposalDoc.as_view(), name='download_proposal_doc'),
    
    path('barangay-approved-proposals/', BarangayApprovedProposalsView.as_view(), name='barangay-approved-proposals'),
    # Accounts Paths
    path('users/', views.get_all_user, name="get_user"),
    path('users/create_user/', views.create_user, name="create_user"),
    path('users/user_info_action/<int:user_id>/', views.user_info_action, name="user_info_action"),
    path('users/<int:user_id>/update-profile/', views.update_user_profile, name='update_user_profile'),
    path('users/<int:user_id>/change-password/', views.change_user_password, name='change_user_password'),

    #Barangay Paths
    path('barangays/', views.get_all_barangays, name='barangay-list'),  # List all barangays
    path('barangays/create/', views.create_barangay, name='barangay-create'),  # Create a new barangay
    path('barangays/<int:pk>/', views.update_delete_barangay, name='update-delete-barangay'),

    #Department Paths
    path('departments/', views.get_departments, name='department-list'),  # List all departments
    path('departments/create/', views.create_department, name='department-create'),  # Create a new department
    path('departments/<int:dept_id>/', views.update_delete_department, name='update_delete_department'),  # Retrieve, update, or delete a single department
    path('departments/<int:dept_id>/courses/', views.get_courses_by_department, name='get_courses_by_department'),  # New URL to get courses by department
    
    #Course Paths
    path('courses/', views.get_courses, name='get-courses'),  # GET: List all courses
    path('courses/create/', views.create_course, name='create-course'),  # POST: Create a new course
    path('courses/<int:course_id>/', views.course_detail, name='course-detail'),  # GET, PUT, DELETE a specific course

    # Research Agenda Paths
    path('research-agendas/', views.get_research_agendas, name='research-agenda-list'),
    path('research-agendas/create/', views.create_research_agenda, name='research-agenda-create'),
    path('research-agendas/<int:pk>/', views.research_agenda_detail, name='research-agenda-detail'),

    # Achievements Paths
    path('achievements/', views.get_achievement, name='achievement-list'),
    path('achievements/create/', views.create_achievement, name='achievement-create'),
    path('achievements/<int:pk>/', views.achievement_detail, name='achievement-detail'),

    # Announcements Paths
    path('announcements/', views.get_announcement, name='announcement-list'),
    path('announcements/create/', views.create_announcement, name='announcement-create'),
    path('announcements/<int:pk>/', views.announcement_detail, name='announcement-detail'),

    # ActivitySchedule URLs
    path('activity-schedules/', views.get_all_activity_schedules, name='get-all-activity-schedules'),
    path('activity-schedules/<int:pk>/', views.get_activity_schedule_detail, name='get-activity-schedule-detail'),
    path('activity-schedules/create/', views.create_activity_schedule, name='create-activity-schedule'),

    #Documents URLs
    path('documents/', views.get_all_documents, name='get_all_documents'),
    path('documents/upload/', views.upload_document, name='upload_document'),
    path('documents/delete/<int:pk>/', views.delete_document, name='delete_document'),
]

