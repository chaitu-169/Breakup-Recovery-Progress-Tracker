from django.db import models
from django.contrib.auth.models import User

class Log(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    mood = models.IntegerField()
    sleep_hours = models.FloatField()
    music = models.CharField(max_length=200)
    social = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Log {self.id} - {self.mood}"
