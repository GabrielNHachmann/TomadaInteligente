#sites que utilizei para realizar o codigo
#https://www.emqx.com/en/blog/how-to-use-mqtt-in-python

import random
from paho.mqtt import client as mqtt_client #import the paho mqtt

#Create an MQTT Connection
#TCP Connection
#To set up an MQTT connection, define the broker address, port, and topic. 
# You can also create a random client ID using Python’s random.randint

broker = 'broker.emqx.io'
port = 1883
topic = "python/mqtt"
client_id = f'python-mqtt-{random.randint(0, 1000)}'
# username = 'emqx'
# password = 'public'

#connecting the broker
def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
    # For paho-mqtt 2.0.0, you need to add the properties parameter.
    # def on_connect(client, userdata, flags, rc, properties):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
    # Set Connecting Client ID
    client = mqtt_client.Client(client_id)

    # For paho-mqtt 2.0.0, you need to set callback_api_version.
    # client = mqtt_client.Client(client_id=client_id, callback_api_version=mqtt_client.CallbackAPIVersion.VERSION2)

    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

"""
#The auto reconnect code for the Paho MQTT client is as follows:
FIRST_RECONNECT_DELAY = 1
RECONNECT_RATE = 2
MAX_RECONNECT_COUNT = 12
MAX_RECONNECT_DELAY = 60

def on_disconnect(client, userdata, rc):
    logging.info("Disconnected with result code: %s", rc)
    reconnect_count, reconnect_delay = 0, FIRST_RECONNECT_DELAY
    while reconnect_count < MAX_RECONNECT_COUNT:
        logging.info("Reconnecting in %d seconds...", reconnect_delay)
        time.sleep(reconnect_delay)

        try:
            client.reconnect()
            logging.info("Reconnected successfully!")
            return
        except Exception as err:
            logging.error("%s. Reconnect failed. Retrying...", err)

        reconnect_delay *= RECONNECT_RATE
        reconnect_delay = min(reconnect_delay, MAX_RECONNECT_DELAY)
        reconnect_count += 1
    logging.info("Reconnect failed after %s attempts. Exiting...", reconnect_count)
"""
#funcao para desconectar client.on_disconnect = on_disconnect


#Teste de um fator e dois fatores se utilizar o de dois nao precisa usar o de um
#The one-way authentication code for the Paho MQTT client is as follows:
#def connect_mqtt():
 #   client = mqtt_client.Client(CLIENT_ID)
   # client.tls_set(ca_certs='./broker.emqx.io-ca.crt')

#The two-way authentication code for the Paho MQTT client is as follows:
"""
def connect_mqtt():
    client = mqtt_client.Client(CLIENT_ID)
    client.tls_set(
        ca_certs='./server-ca.crt',
        certfile='./client.crt',
        keyfile='./client.key'
    )
"""

#Publish Messages
def publish(client):
    pub = 12345
    msg = f"messages: {pub}"
    result = client.publish(topic, msg)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")


#Create the message callback function on_message, triggered once the client receives messages 
# from the MQTT Broker. 
# We will print the subscribed topic's name and the received messages within this function.

def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(topic)
    client.on_message = on_message

#correr o codigo
def run():
    client = connect_mqtt()
    publish(client)
    subscribe(client)


#MAIN
run()