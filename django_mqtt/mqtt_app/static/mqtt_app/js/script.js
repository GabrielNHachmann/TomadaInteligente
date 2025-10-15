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