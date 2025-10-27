from django.shortcuts import render
from models import Codigo

# Create your views here.
import json
from django.http import JsonResponse
from django_mqtt.mqtt import client as mqtt_client

def base(request):
    return render(request, 'mqtt_app/pages/base.html')

def home(request):
    return render(request, 'mqtt_app/pages/home.html')

def gerenciar(request):
    return render(request, 'mqtt_app/pages/gerenciar.html')

def temporizador(request):
    return render(request, 'mqtt_app/pages/temporizador.html')

def historico(request):
    return render(request, 'mqtt_app/pages/historico.html')


def publish_message(request):
    if request.method == 'POST':
        text = request.POST.get('user_input')

        msg = json.dumps({"topic": "tomada/mqtt", "mensagem": f"{text}"}, ensure_ascii=False)
        request_data = json.loads(msg)
        rc, mid = mqtt_client.publish(request_data['topic'], request_data['mensagem'])
        return render(request, 'mqtt_app/pages/home.html')

def codigo(request):
    if request.method == 'GET': 
        codigo = Codigo.objects.get(id=1)
        if codigo == 123:
            return render(request, 'mqtt_app/pages/home.html')
        else:
            return render(request, )
        
  