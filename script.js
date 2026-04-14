// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== HEADER SCROLL SHADOW =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== FORMULÁRIO DE AGENDAMENTO =====
const form = document.getElementById('agendaForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome     = document.getElementById('nome').value.trim();
  const email    = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const servico  = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  // Monta mensagem para WhatsApp
  // IMPORTANTE: substitua o número abaixo pelo número real da Natalia (com código do país, ex: 5511999999999)
  const numero = '5500000000000';

  const texto = `Olá Natalia! Vim pelo site e gostaria de agendar uma consulta.

*Nome:* ${nome}
*E-mail:* ${email}
*Telefone:* ${telefone}
*Serviço:* ${servico || 'Não informado'}
${mensagem ? `*Mensagem:* ${mensagem}` : ''}`;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
});

// ===== ACTIVE NAV LINK AO ROLAR =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = '#3B6D11';
        }
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));
