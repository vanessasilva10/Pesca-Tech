// Pesca Tech - script.js

// 1. MENU MOBILE
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = document.querySelector('header nav');

  // Cria o botão hambúrguer automaticamente
  const btnMenu = document.createElement('button');
  btnMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
  btnMenu.className = 'btn-menu';
  btnMenu.style.cssText = 'display:none; background:none; border:none; font-size:24px; color:var(--azul-escuro); cursor:pointer;';
  header.insertBefore(btnMenu, nav);

  // CSS do botão no JS pra não mexer no seu CSS
  const style = document.createElement('style');
  style.innerHTML = `
    @media(max-width:768px){
      .btn-menu{display:block !important;}
      header nav{display:none; flex-direction:column; width:100%; background:white; padding:15px; border-radius:10px;}
      header nav.ativo{display:flex;}
    }
    .card{ opacity:0; transform: translateY(20px); transition: 0.6s; }
    .card.visivel{ opacity:1; transform: translateY(0); }
    #btn-topo{ position:fixed; bottom:20px; right:20px; background:var(--laranja); color:white; border:none; width:45px; height:45px; border-radius:50%; display:none; cursor:pointer; z-index:1000; }
  `;
  document.head.appendChild(style);

  btnMenu.addEventListener('click', () => {
    nav.classList.toggle('ativo');
    btnMenu.innerHTML = nav.classList.contains('ativo') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // 2. MARCAR PÁGINA ATUAL NO MENU
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach(link => {
    if (link.getAttribute('href') === paginaAtual) {
      link.style.color = 'var(--laranja)';
      link.style.borderBottom = '2px solid var(--laranja)';
    }
  });

  // 3. SCROLL SUAVE para links com # (ex: #contato)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) destino.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 4. ANIMAÇÃO DOS CARDS quando aparecem na tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visivel');
    });
  });
  document.querySelectorAll('.card, .area-detalhe, .news-item').forEach(el => observer.observe(el));

  // 5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
  /*const form = document.querySelector('.form-contato');
  const formulario = document.getElementById("formulario");
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const msg = form.querySelector('textarea').value;

      if (!nome || !email || !msg) {
        alert('Por favor, preencha todos os campos!');
        return;
      }
      alert(`Obrigado, ${nome}! Sua mensagem foi enviada para o Pesca Tech. Em breve retornaremos em ${email}`);
      form.reset();
    });
  }*/

  // 6. BOTÃO VOLTAR AO TOPO
  const btnTopo = document.createElement('button');
  btnTopo.id = 'btn-topo';
  btnTopo.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(btnTopo);

  window.addEventListener('scroll', () => {
    btnTopo.style.display = window.scrollY > 400 ? 'block' : 'none';
  });
  btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  // CONEXÃO E ENVIO DE DADOS PARA O SUPABASE
  // 1. Inicializa o cliente do Supabase
  const SUPABASE_URL = "https://supabase.co";
  const SUPABASE_ANON_KEY = "https://taviponvwfixthhnfgvk.supabase.co/rest/v1/formulario";
  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 2. Captura o formulário do HTML
  // const formulario = document.querySelector('form'); // ou use document.getElementById('id-do-form')

  // 3. Escuta o evento de clique no botão de enviar (submit)
  formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que a página recarregue

    // Captura os valores digitados nos inputs (substitua pelos IDs/Classes do seu HTML)
    const nomeDigitado = document.getElementById('nome').value;
    const emailDigitado = document.getElementById('email').value;
    const mensagemDigitada = document.getElementById('mensagem').value;

    try {
      // 4. Envia os dados para a tabela do Supabase
      const { data, error } = await supabase
        .from('respostas_formulario') // Nome exato da tabela criada no Passo 1
        .insert([
          {
            nome: nomeDigitado,   // Coluna do banco : Variável do JS
            email: emailDigitado,
            mensagem: mensagemDigitada
          }
        ]);

      if (error) {
        throw error;
      }

      alert('Dados salvos com sucesso no Supabase! 🎉');
      formulario.reset(); // Limpa o formulário após enviar

    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Ops! Ocorreu um erro ao enviar os dados.');
    }
  });

});