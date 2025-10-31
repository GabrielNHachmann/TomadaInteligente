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

        // Simulação da função de Alternar Ativação/Desativação
        function handleToggle(deviceId, isActive) {
            const command = isActive ? 'desativado' : 'ativado';
            showMessage(`SIMULAÇÃO: Agendamento da tomada ${deviceId} foi ${command}.`, 'info');
            // Re-renderização simulada da lista de agendamentos
            setTimeout(renderMockScheduleList, 100);
        }