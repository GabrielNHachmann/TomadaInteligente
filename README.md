🔌 Projeto de Tomada Inteligente com ESP32 e MQTT
✨ Visão Geral do Projeto
Este projeto é uma solução de Internet das Coisas (IoT) que transforma uma tomada comum em uma tomada inteligente controlada remotamente. A solução é composta por um dispositivo embarcado (ESP32) que se comunica via MQTT com um aplicativo web, permitindo que o usuário ligue e desligue eletrodomésticos de qualquer lugar. O objetivo é fornecer uma plataforma completa, desde o hardware até a interface do usuário, para automação residencial simples e eficiente.

🚀 Funcionalidades Principais
Controle Remoto: Ligue e desligue a tomada de forma remota através de um aplicativo web.

Monitoramento em Tempo Real: O aplicativo exibe o status atual da tomada (ligada ou desligada) em tempo real.

Comunicação Eficiente: Utiliza o protocolo MQTT, ideal para dispositivos com recursos limitados devido à sua natureza leve e de baixo consumo de banda.

Interface Amigável: A interface web, construída com HTML, CSS e JavaScript, é intuitiva e responsiva, funcionando em desktops e dispositivos móveis.

Código Modulável: Estrutura clara e organizada para facilitar a leitura e futuras melhorias.

📦 Componentes Necessários
Hardware
ESP32 (ou ESP8266, com pequenas adaptações no código)

Módulo de Relé de 5V

Fonte de alimentação para o ESP32

Fiação, invólucro para a tomada e componentes de segurança

Cabo USB para programação

Software e Serviços
Arduino IDE ou ESP-IDF para programar o ESP32

Um MQTT Broker (pode ser local, como o Mosquitto, ou um serviço em nuvem, como HiveMQ ou CloudMQTT)

Um navegador web para acessar o aplicativo

📁 Estrutura do Repositório
.
├── esp32-code/            # Firmware para o ESP32
│   └── main.cpp
├── web-app/              # Aplicação web para controle
│   ├── index.html
│   ├── style.css
│   └── script.js
├── README.md             # Este arquivo
└── .gitignore            # Arquivos ignorados pelo Git

🛠️ Configuração e Uso
1. Configuração do Hardware
Conecte o pino de controle do módulo de relé a um pino GPIO do ESP32. Garanta que o circuito esteja seguro, isolado e que as tensões sejam compatíveis.

2. Configuração do MQTT Broker
Se você não tem um MQTT broker, recomendo usar um serviço em nuvem gratuito. Se preferir um ambiente local, instale e configure o Mosquitto. Anote o endereço (URL ou IP) do broker, a porta e, se existirem, as credenciais de login.

3. Programação do ESP32
Abra o arquivo esp32-code/main.cpp na sua IDE (Arduino IDE é recomendado para iniciantes).

Atualize as seguintes variáveis com suas informações de rede e MQTT:

const char* WIFI_SSID = "SeuNomeDaRede";
const char* WIFI_PASSWORD = "SuaSenhaDaRede";
const char* MQTT_BROKER = "mqtt.broker.com"; // Endereço do seu broker
const int MQTT_PORT = 1883;

Faça o upload do código para o seu ESP32. O ESP32 irá se conectar ao Wi-Fi e ao broker MQTT.

4. Executando o Aplicativo Web
Abra o arquivo web-app/script.js.

Altere a URL do broker para o seu endereço:

const MQTT_BROKER_URL = "ws://mqtt.broker.com:1883"; // Use 'wss://' se o broker usar SSL

Abra o arquivo index.html em seu navegador web para testar. Para uso em produção, hospede os arquivos em um servidor web.

🤝 Contribuições
Contribuições são sempre bem-vindas! Se você tiver ideias para melhorias, novas funcionalidades ou correções de bugs, por favor, abra uma issue ou envie um pull request.

https://g.co/gemini/share/4a9722a69006
