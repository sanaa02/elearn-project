# module/views.py
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from module_app.models import Module
from professor_app.models import Professor
from .serializers import ModuleSerializer, ModuleUploadSerializer
from rest_framework import generics
import io, csv, pandas as pd



class YearChoicesView(APIView):
    authentication_classes = []  # Remove any authentication classes
    permission_classes = [] 
    def get(self, request, *args, **kwargs):
        year_choices = [
            {'1CPI'},
            {'2CPI'},
            {'1CS'},
            {'2CS'},
            {'3CS'},
        ]
        return Response(year_choices, status=status.HTTP_200_OK)
    
class UploadFileModules(generics.CreateAPIView):
    serializer_class = ModuleUploadSerializer
    queryset = Module.objects.all()
    
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        year = request.data.get('year')
        
        try:
            reader = pd.read_csv(file)
            response_data = []

            for index, row in reader.iterrows():
                nom = row['nom']
                description = row.get('description', '').lower()
                coef = row.get('coef', '')
                semester = row.get('semester', '')
                year = row.get('year', '')
                professor_email = row.get('professor', '')
                print(nom, year, professor_email, coef, semester, description)
                print(f"Processing row: {row}")
                
                professor = None
                if professor_email:
                    try:
                        professor = Professor.objects.get(user__email=professor_email)
                        print(f"Professor found: {professor}")
                    except Professor.DoesNotExist:
                        return Response({"error": f"Professor with email {professor_email} does not exist."}, status=status.HTTP_400_BAD_REQUEST)
                
                module_data = {
                    'nom': nom,
                    'description': description,
                    'coef': coef,
                    'semester': semester,
                    'year': year,
                    'professor': professor_email 
                }
                print(f"Module data: {module_data}")

                serializer = ModuleSerializer(data=module_data)
                if serializer.is_valid():
                    serializer.save()
                    print(f"Module saved: {serializer.data}")
                    response_data.append(serializer.data)
                else:
                    print(f"Serializer Errors: {serializer.errors}")
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Exception: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    

class ModuleList(APIView):
    authentication_classes = []  # Remove any authentication classes
    permission_classes = [] 
    def get(self, request):
        module = Module.objects.all()
        serializer = ModuleSerializer(module, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        print("Request Data:", request.data)
        
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     print(request.data)
        
    #     data = request.data.copy()  # Make a mutable copy of the request data

    #     # Convert professor email to primary key
    #     professor_email = data.get('professor')
    #     print("professors email", professor_email)
    #     if professor_email:
    #         try:
    #             professor = Professor.objects.get(user__email=professor_email)
    #             print(f"Professor found: {professor}")
    #             data['professor'] = professor.pk
    #             print(f"Professor primary key: {professor.pk}")
    #         except Professor.DoesNotExist:
    #             return Response({"professor": ["Professor with this email does not exist."]}, status=status.HTTP_400_BAD_REQUEST)


        
    #     serializer = ModuleSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         print("Serializer Errors:", serializer.errors)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
