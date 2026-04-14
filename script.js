// ===== CONFIGURAÇÕES INICIAIS =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const form = document.getElementById('agendaForm');

// ===== MENU MOBILE COM TRANSIÇÃO SUAVE =====
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        // Toggle da classe para abrir/fechar
        navLinks.classList.toggle('open');
        // Muda o ícone do botão (se você usar spans para o ícone hambúrguer)
        menuToggle.classList.toggle('active');
        
        // Impede o scroll do corpo quando o menu está aberto
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
}

// Fecha menu ao clicar em um link (melhorado com delegação de evento)
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== HEADER SCROLL (Efeito de Vidro e Sombra) =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ===== FORMULÁRIO DE AGENDAMENTO (WhatsApp Estilizado) =====
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Feedback visual de carregamento no botão
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Preparando...";
        btn.style.opacity = "0.7";

        const dados = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            servico: document.getElementById('servico').value,
            mensagem: document.getElementById('mensagem').value.trim()
        };

        // Substitua pelo número real da Natalia (DDI + DDD + Número)
        const numeroWhatsApp = '5500000000000';

        const mensagemFinal = `✨ *Nova Solicitação de Agendamento* ✨

*Nome:* ${dados.nome}
*E-mail:* ${dados.email}
*Telefone:* ${dados.telefone}
*Interesse:* ${dados.servico || 'Consulta Geral'}

${dados.mensagem ? `*Observações:* \n_${dados.mensagem}_` : ''}

---
_Enviado via Site Natalia Bomfim_`;

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemFinal)}`;

        // Simula um pequeno delay para elegância antes de abrir
        setTimeout(() => {
            window.open(url, '_blank');
            btn.innerText = originalText;
            btn.style.opacity = "1";
            form.reset();
        }, 800);
    });
}

// ===== INDICADOR DE SEÇÃO ATIVA (CORAÇÃO DA NAVEGAÇÃO) =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Ajustado para disparar quando a seção estiver no centro
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.remove('active');
                // Cor de destaque: Rosa Seco (#a67c7c)
                link.style.color = ''; 
                
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                    link.style.color = '#a67c7c'; // Identidade visual aplicada
                    link.style.fontWeight = '500';
                } else {
                    link.style.fontWeight = '400';
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Compensação do header fixo
                behavior: 'smooth'
            });
        }
    });
});
