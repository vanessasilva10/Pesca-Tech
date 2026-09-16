// js/componentes.js
const isSubpasta = window.location.pathname.includes('/paginas/') || window.location.pathname.includes('/formulario/');
const prefixoImg = isSubpasta ? '../imagens/' : 'imagens/';

// Adiciona o Font Awesome automaticamente em qualquer página que carregar componentes.js
if (!document.querySelector('link[href*="font-awesome"]')) {
  const fontAwesomeLink = document.createElement('link');
  fontAwesomeLink.rel = 'stylesheet';
  fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  document.head.appendChild(fontAwesomeLink);
}

class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <img src="${prefixoImg}img.logo.png" style="max-height: 80px !important; width: auto;" alt="Pesca Tech - Engenharia de Pesca">
        <h1>Pesca Tech</h1>

        <button class="menu-toggle" onclick="this.parentElement.querySelector('nav').classList.toggle('ativo')">
          <i class="fa-solid fa-bars"></i>
        </button>
        
        <nav>
          <a href="${isSubpasta ? '../' : ''}index.html">Home</a>
          <a href="${isSubpasta ? '' : 'paginas/'}sobre.html">Sobre o Curso</a>
          <a href="${isSubpasta ? '' : 'paginas/'}areas.html">Áreas de Atuação</a>
          <a href="${isSubpasta ? '' : 'paginas/'}noticias.html">Notícias</a>
          <a href="${isSubpasta ? '' : 'paginas/'}contato.html">Contatos</a>
        </nav>
      </header>
    `;
  }
}
customElements.define('meu-header', HeaderComponent);

class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer style="padding: 15px 5%; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;">
        <div style="justify-self: start;">
          <img src="${prefixoImg}rodape.png" alt="rodapé" style="max-height: 80px; width: auto; display: block;">
        </div>
        <p style="margin: 0; font-size: 14px; color: #cbd5e0; text-align: center; white-space: nowrap;">
          DESENVOLVIDO POR: <strong>VANESSA KELLY</strong>
        </p>
        <div></div>
      </footer>
    `;
  }
}
customElements.define('meu-footer', FooterComponent);