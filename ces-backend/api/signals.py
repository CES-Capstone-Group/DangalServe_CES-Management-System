from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Proposal, BarangayApproval

@receiver(post_save, sender=Proposal)
def create_barangay_approvals(sender, instance, created, **kwargs):
    if created:
        # Create a BarangayApproval for each barangay in partner_community
        for barangay in instance.partner_community_list():
            BarangayApproval.objects.create(proposal=instance, barangay_name=barangay)