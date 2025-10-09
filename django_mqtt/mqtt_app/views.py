from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django_mqtt.mqtt import client as mqtt_client

def base(request):
    return render(request, 'mqtt_app/pages/base.html')


def publish_message(request):
    if request.method == 'POST':
        try:
            # Tenta decodificar o corpo da requisição como JSON
            request_data = json.loads(request.body)
            
            topic = request_data.get('topic')
            msg = request_data.get('msg')
            
            if not topic or not msg:
                return JsonResponse({'error': 'Missing "topic" or "msg" in request body'}, status=400)
            
            # Chama o método publish do seu cliente MQTT
            rc, mid = mqtt_client.publish(topic, msg) 
            
            # rc (return code) indica o sucesso ou falha na publicação
            return JsonResponse({'status': 'Message published successfully', 'result_code': rc})
            
        except json.JSONDecodeError:
            # Este é o erro que você estava vendo: o corpo não é um JSON válido
            return JsonResponse({'error': 'Invalid JSON format in request body'}, status=400)
        except Exception as e:
            # Outros erros (como falha na conexão MQTT)
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

    # Se a requisição não for POST
    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
