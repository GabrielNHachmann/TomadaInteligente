from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django_mqtt.mqtt import client as mqtt_client

def base(request):
    return render(request, 'mqtt_app/pages/base.html')


def publish_message(request):
    if request.method == 'POST':
        text = request.POST.get('user_input')
        msg = json.dumps({"mensagem": text}, ensure_ascii=False)
        request_data = json.loads(request.body)
        rc, mid = mqtt_client.publish(request_data['topic'], [msg])
        return JsonResponse({'code': rc})
        
  