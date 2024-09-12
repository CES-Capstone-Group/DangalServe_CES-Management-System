from django.urls import path
from . import views  # Ensure you import your views

urlpatterns = [
    # ACHIEVEMENTS PATH
    path('achievements/', views.get_achievement, name='achievement-list'),
    path('achievements/create/', views.create_achievement, name='achievement-create'),
    path('achievements/<int:pk>', views.achievement_detail, name='achievement-detail'),

    #ANNOUNCEMENT PATH
    path('announcements/', views.get_announcement, name='announcement-list'),
    path('announcements/create/', views.create_announcement, name='announcement-create'),
    path('announcements/<int:pk>', views.announcement_detail, name='announcement-detail')
]
