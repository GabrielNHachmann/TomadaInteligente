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