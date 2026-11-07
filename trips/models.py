import random
import string
from django.db import models

# Create your models here.
class Trip(models.Model):
    code=models.CharField(max_length=8, unique=True,blank=True)
    origin=models.CharField(max_length=100)
    destination=models.CharField(max_length=100)
    STATUS_CHOICES= [
        ('assigned','Assigned'),
        ('started', 'Started'),
        ('arrived', 'Arrived'),
        ('finished', 'Finished'),
    ]
    status=models.CharField(max_length=20, choices=STATUS_CHOICES, default="assigned")
    started_at=models.DateTimeField(null=True,blank=True)
    arrived_at=models.DateTimeField(null=True,blank=True)
    finished_at=models.DateTimeField(null=True,blank=True)
    def __str__(self):
        return f"{self.code}: {self.origin} ->{self.destination}"
    @property
    def duration(self):
        if self.started_at and self.finished_at:
            return self.finished_at-self.started_at
        return None 
    def save(self, *args, **kwargs):
        if not self.code:
            chars = string.ascii_uppercase + string.digits
            while True:
                new_code = ''.join(random.choices(chars, k=6))
                if not Trip.objects.filter(code=new_code).exists():
                    self.code = new_code
                    break
        super().save(*args, **kwargs)