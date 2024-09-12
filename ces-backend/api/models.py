from django.db import models

# Create your models here.

class Achievement(models.Model):
    award_title = models.CharField(max_length=255)  # The title of the award
    awardee = models.CharField(max_length=255)  # The person receiving the award
    awarded_by = models.CharField(max_length=255)  # The person or organization giving the award
    date_awarded = models.DateField()  # The date the award was given
    image = models.ImageField(upload_to='awards/', max_length=255, null=True, blank=True)  # Image of the award

    def __str__(self):
        return self.award_title

class Announcement(models.Model):
    title = models.CharField(max_length=255)  # Field for the announcement title
    details = models.TextField()  # Field for the announcement details
    image = models.ImageField(upload_to='announcements/', blank=True, null=True)  # Field for uploading an image

    def __str__(self):
        return self.title