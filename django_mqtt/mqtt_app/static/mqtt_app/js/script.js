document.addEventListener('DOMContentLoaded', () => {
            const sidebar = document.getElementById('sidebar');
            const toggleButton = document.getElementById('menu-toggle');
            const overlay = document.getElementById('sidebar-overlay');

            const toggleSidebar = () => {
                const isOpen = sidebar.classList.contains('is-open');
                if (isOpen) {
                    sidebar.classList.remove('is-open');
                    overlay.classList.remove('is-open');
                } else {
                    sidebar.classList.add('is-open');
                    overlay.classList.add('is-open');
                }
            };

            // Abrir/Fechar ao clicar no botão
            if (toggleButton) {
                toggleButton.addEventListener('click', toggleSidebar);
            }

            // Fechar ao clicar no overlay (fundo escuro)
            if (overlay) {
                overlay.addEventListener('click', toggleSidebar);
            }

            // Fechar ao clicar em um link da sidebar (permitindo a navegação para a nova página)
            const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Aqui a navegação real para o href (e.g., 'cadastro.html') acontecerá
                    // A sidebar fecha antes de mudar de página
                    sidebar.classList.remove('is-open');
                    overlay.classList.remove('is-open');
                    // Não usamos e.preventDefault() para permitir que a navegação ocorra
                });
            });
        });

        // Lógica de SIMULAÇÃO de Controle (Atualizada para botão único)
        function toggleMainPower(deviceId, isCurrentlyOn) {
            // Reverte o estado (se estava LIGADO, agora é DESLIGADO)
            const newStatus = !isCurrentlyOn;
            
            const mainToggleArea = document.getElementById('main-toggle-area');
            const statusText = document.getElementById('main-status-text');
            const powerButton = document.getElementById('main-power-btn');
            
            if (newStatus) {
                // Mudar para LIGADO (Verde)
                mainToggleArea.classList.remove('status-off-bg');
                mainToggleArea.classList.add('status-on-bg');
                statusText.textContent = 'DISPOSITIVO LIGADO';
                powerButton.setAttribute('onclick', `toggleMainPower('${deviceId}', true)`);
                powerButton.title = 'Clique para Desligar';
                console.log(`Dispositivo ${deviceId} LIGADO.`);
            } else {
                // Mudar para DESLIGADO (Vermelho)
                mainToggleArea.classList.remove('status-on-bg');
                mainToggleArea.classList.add('status-off-bg');
                statusText.textContent = 'DISPOSITIVO DESLIGADO';
                powerButton.setAttribute('onclick', `toggleMainPower('${deviceId}', false)`);
                powerButton.title = 'Clique para Ligar';
                console.log(`Dispositivo ${deviceId} DESLIGADO.`);
            }
            
            // Note: No Django, você faria uma chamada para a sua view MQTT aqui.
        }

         // Mapeamento dos dias para exibição em português
        const dayMap = {
            'dom': 'Dom', 'seg': 'Seg', 'ter': 'Ter', 
            'qua': 'Qua', 'qui': 'Qui', 'sex': 'Sex', 'sab': 'Sáb'
        };

        const notificationArea = document.getElementById('custom-notification');

        // Função para mostrar mensagens de notificação customizadas
        function showMessage(message, type = 'success') {
            console.log("Notificação:", message);
            
            // Define classes de cor
            let bgColor = '';
            if (type === 'success') {
                bgColor = 'bg-success-green';
            } else if (type === 'error') {
                bgColor = 'bg-danger-red';
            } else {
                bgColor = 'bg-secondary-blue'; // 'info' ou padrão
            }
            
            // Remove classes antigas e aplica as novas
            notificationArea.className = 'fixed top-4 right-4 z-[1000] p-4 rounded-xl shadow-2xl text-white transition-opacity duration-300';
            notificationArea.classList.add(bgColor);
            
            notificationArea.textContent = message;
            
            // Animação de entrada
            notificationArea.style.opacity = '1';
            notificationArea.classList.remove('translate-x-full');
            
            // Auto-hide após 4 segundos
            setTimeout(() => {
                // Animação de saída
                notificationArea.style.opacity = '0';
                notificationArea.classList.add('translate-x-full');
            }, 4000);
        }

        // ----------------------------------------------------
        // MANIPULADOR DE FORMULÁRIO
        // ----------------------------------------------------
        document.getElementById('schedule-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = e.target;
            const deviceId = form.device_id.value.toUpperCase().trim();
            const scheduleTime = form.schedule_time.value;
            const action = form.schedule_action.value;
            
            // Obtém os dias selecionados
            const selectedDays = Array.from(form.querySelectorAll('.day-checkbox:checked'))
                                    .map(checkbox => checkbox.value);

            if (!deviceId) {
                showMessage("Erro: O ID da Tomada é obrigatório.", 'error');
                return;
            }

            if (selectedDays.length === 0) {
                showMessage("Aviso: Selecione pelo menos um dia para repetição.", 'error');
                return;
            }

            // Mapeia os dias para a exibição em português
            const daysDisplay = selectedDays.map(day => dayMap[day]).join(', ');

            // Simula o envio de dados/criação
            showMessage(`SUCESSO! Agendado: Tomada ${deviceId} | ${action} às ${scheduleTime}. Repete: ${daysDisplay}.`, 'success');
            
            // Limpa o formulário após a simulação
            form.reset(); 
            // Re-renderização simulada da lista de agendamentos (em um app real, isso seria feito via Firestore/API)
            setTimeout(renderMockScheduleList, 100);
        });

        // ----------------------------------------------------
        // MANIPULADORES DE AÇÕES (Simuladas)
        // ----------------------------------------------------

        // Simulação da função de Alternar Ativação/Desativação
        function handleToggle(deviceId, isActive) {
            const command = isActive ? 'desativado' : 'ativado';
            showMessage(`SIMULAÇÃO: Agendamento da tomada ${deviceId} foi ${command}.`, 'info');
            // Re-renderização simulada da lista de agendamentos
            setTimeout(renderMockScheduleList, 100);
        }

        // Simulação da função de Exclusão
        function handleDelete(deviceId) {
            // Em um app real, você faria uma confirmação via modal customizado aqui.
            showMessage(`SIMULAÇÃO: Agendamento da tomada ${deviceId} EXCLUÍDO.`, 'error');
            // Re-renderização simulada da lista de agendamentos
            setTimeout(renderMockScheduleList, 100);
        }

        // ----------------------------------------------------
        // FUNÇÃO PARA RENDERIZAR A LISTA (Mock/Simulação)
        // ----------------------------------------------------

        // Nota: Esta função apenas garante que o HTML estático de MOCKUP
        // seja recarregado para simular o efeito, mas em um app real
        // você rederizaria os dados dinamicamente de uma API ou Firestore.
        function renderMockScheduleList() {
            const listContainer = document.getElementById('schedule-list');
            
            // HTML dos mocks originais (Recriei para garantir que usem Tailwind)
            const mockHTML = `
                <!-- ITEM 1: Ativo (LIGAR) -->
                <div class="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-success-green transition-all hover:shadow-xl">
                    <div class="flex items-center mb-2 md:mb-0">
                        <i class="fas fa-power-off text-success-green text-3xl mr-4"></i>
                        <div>
                            <p class="font-bold text-lg">LIGAR Tomada SP-001 (Sala)</p>
                            <p class="text-sm text-gray-500">Horário: 07:00 | Repete: Seg, Ter, Qua, Qui, Sex</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 mt-2 md:mt-0">
                        <button class="text-success-green hover:text-green-700 transition-colors" title="Desativar Agendamento" onclick="handleToggle('SP-001', true)">
                            <i class="fas fa-toggle-on text-3xl"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700 transition-colors" title="Excluir Agendamento" onclick="handleDelete('SP-001')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                
                <!-- ITEM 2: Inativo (DESLIGAR) -->
                <div class="bg-gray-100 shadow-lg rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-danger-red opacity-80 transition-all hover:shadow-xl hover:opacity-100">
                    <div class="flex items-center mb-2 md:mb-0">
                        <i class="fas fa-power-off text-danger-red text-3xl mr-4"></i>
                        <div>
                            <p class="font-bold text-lg text-gray-700">DESLIGAR Tomada SP-003 (Cozinha)</p>
                            <p class="text-sm text-gray-500">Horário: 22:30 | Repete: Todos os dias</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 mt-2 md:mt-0">
                        <button class="text-gray-400 hover:text-gray-600 transition-colors" title="Ativar Agendamento" onclick="handleToggle('SP-003', false)">
                            <i class="fas fa-toggle-off text-3xl"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700 transition-colors" title="Excluir Agendamento" onclick="handleDelete('SP-003')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            //listContainer.innerHTML = mockHTML;
        }