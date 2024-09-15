from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views  # Import your views
from .views import LoginApiView, RefreshTokenView, ResearchAgendaViewSet

# Define URL patterns
urlpatterns = [
    # Login Path
    path('login/', LoginApiView.as_view(), name='login'),  # Use custom login view for JWT
    # path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('refresh-token/', RefreshTokenView.as_view(), name='refresh-token'),

    # Accounts Paths
    path('users/', views.get_all_user, name="get_user"),
    path('users/create_user/', views.create_user, name="create_user"),
    path('users/user_info_action/<int:user_id>/', views.user_info_action, name="user_info_action"),

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
]

