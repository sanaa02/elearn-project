# module/views.py
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from module_app.models import Module
from .serializers import ModuleSerializer, ModuleUploadSerializer
from rest_framework import generics
import io, csv, pandas as pd

class UploadFileModules(generics.CreateAPIView):
    serializer_class = ModuleUploadSerializer
    queryset = Module.objects.all()
    
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        
        try:
            reader = pd.read_csv(file)
            module_list = []
            response_data = []

            for index, row in reader.iterrows():
                nom = row['nom']
         
                description = row.get('description', '').lower()

                module = Module(nom=nom, description=description)
                
                module.save()
                module_list.append(module)
                response_data.append(module.nom)
                
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
