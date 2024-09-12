from django.db import models

# Create your models here.

class Account(models.Model):
    accountID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    accountType = models.CharField(max_length=255)
    department = models.CharField(null=True, blank=True, max_length=255)
    position = models.CharField(null=True, max_length=255)
    activationDate = models.DateField()
    deactivationDate = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.accountID} - {self.accountType}"

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