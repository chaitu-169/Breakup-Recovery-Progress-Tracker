from rest_framework import viewsets
from .models import Log
from .serializers import LogSerializer

class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all().order_by('-created_at')
    serializer_class = LogSerializer
