# module/views.py
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from module.models import Module
from .serializers import ModuleSerializer

class ModuleList(APIView):
    def get(self, request):
        module = Module.objects.all()
        serializer = ModuleSerializer(module, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ModuleDetail(APIView):
    def get_object(self, pk):
        try:
            return Module.objects.get(pk=pk)
        except Module.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        module = self.get_object(pk)
        serializer = ModuleSerializer(module)
        return Response(serializer.data)

    def put(self, request, pk):
        module = self.get_object(pk)
        serializer = ModuleSerializer(module, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        module = self.get_object(pk)
        module.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
