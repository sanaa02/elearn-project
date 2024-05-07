from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager
from django.dispatch import receiver
#from django.contrib.auth.models import AbstractUser

# Create your models here.

class File(models.Model):
    email = models.CharField(primary_key=True, max_length=6)
    role = models.CharField(max_length=100)
    
    def __str__(self):
        return self.staff_name


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        # email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        # if extra_fields.get('is_staff') is not True:
        #     raise ValueError('Superuser must have is_staff=True.')
        # if extra_fields.get('is_superuser') is not True:
        #     raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class MyUser(PermissionsMixin, AbstractBaseUser):
    # first_name = models.CharField(max_length=100)
    # last_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_professor = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()

        
    def __str__(self):
        return self.email
        

class Profile(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    
# # #     #image = models.ImageField(upload_to='user_images', default='default.jpg')


# @receiver(post_save, sender=MyUser, dispatch_uid='save_new_user_profile')
# def save_profile(sender, instance, created, **kwargs):
#     user = instance
#     if created:
#         profile = UserProfile(user=user)
#         profile.save()
    
# @receiver(post_save, sender=MyUser)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
        
     
# @receiver(post_save, sender=MyUser)   
# def save_user_profile(sender, instance, **kwargs):
#     print("Save user profile signal received")
#     instance.profile.save()
    
# post_save.connect(create_user_profile, sender=MyUser)
# post_save.connect(save_user_profile, sender=MyUser)


