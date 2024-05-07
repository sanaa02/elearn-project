from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MyUser, Profile

@receiver(post_save, sender=MyUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        
     
@receiver(post_save, sender=MyUser)   
def save_user_profile(sender, instance, **kwargs):
    print("Save user profile signal received")
    instance.profile.save()
    
post_save.connect(create_user_profile, sender=MyUser)
post_save.connect(save_user_profile, sender=MyUser)