from django.shortcuts import render
from .models import Historico

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


def publish_message_ligar(request):
    if request.method == 'POST':
        text = '1'

        msg = json.dumps({"topic": "tomada/mqtt", "mensagem": f"{text}"}, ensure_ascii=False)
        request_data = json.loads(msg)
        rc, mid = mqtt_client.publish(request_data['topic'], request_data['mensagem'])

        ligou = 1
        desligou = None
        temporizador = None

        historico = Historico(
            ligou=ligou,
            desligou=desligou,
            temporizador=temporizador
        )  

        historico.save() 

        return render(request, 'mqtt_app/pages/gerenciar.html')


def publish_message_desligar(request):
    if request.method == 'POST':
        text = '2'

        msg = json.dumps({"topic": "tomada/mqtt", "mensagem": f"{text}"}, ensure_ascii=False)
        request_data = json.loads(msg)
        rc, mid = mqtt_client.publish(request_data['topic'], request_data['mensagem'])
        return render(request, 'mqtt_app/pages/gerenciar.html')


def publish_message_10s(request):
    if request.method == 'POST':
        text = '3'

        msg = json.dumps({"topic": "tomada/mqtt", "mensagem": f"{text}"}, ensure_ascii=False)
        request_data = json.loads(msg)
        rc, mid = mqtt_client.publish(request_data['topic'], request_data['mensagem'])
        return render(request, 'mqtt_app/pages/temporizador.html')
    
def publish_message_30s(request):
    if request.method == 'POST':
        text = '4'

        msg = json.dumps({"topic": "tomada/mqtt", "mensagem": f"{text}"}, ensure_ascii=False)
        request_data = json.loads(msg)
        rc, mid = mqtt_client.publish(request_data['topic'], request_data['mensagem'])
        return render(request, 'mqtt_app/pages/temporizador.html')
    
def publish_message_1m(request):
    if request.method == 'POST':
        text = '5'

        msg = json.dumps({"topic": "tomada/mqtt", "mensagem": f"{text}"}, ensure_ascii=False)
        request_data = json.loads(msg)
        rc, mid = mqtt_client.publish(request_data['topic'], request_data['mensagem'])
        return render(request, 'mqtt_app/pages/temporizador.html')


def codigo(request):
    if request.method == 'GET': 
        text = request.GET.get('user_input')
        if text == '1234':
            return render(request, 'mqtt_app/pages/home.html')
        else:
            return render(request, 'mqtt_app/pages/base.html')
        
  