//seleciona o botao de start
const startButton = document.getElementById('start');
//seleciona a div que tem o jogo
const startedGame = document.querySelector('.startedGame')
//seleciona a div do personagem
const divPersonagem = document.getElementById('personagem')
//seleciona o personagem
const personagem = document.querySelector(".plane");
const villain = document.querySelector('.vilao')
const game = document.querySelector(".game")

//monitora o click no botao start e inicia o jogo
startButton.addEventListener('click', ()=> {
    startButton.style.display = 'none'
    startedGame.style.display = 'flex'
    //faz o vilao atirar a cada 2.5s
    setInterval(atirarVilao, 2500)
})

const imagem1URL = "./assets/characters/free_plane_sprite/png/Plane/Fly (1).png";
const imagem2URL = "./assets/characters/free_plane_sprite/png/Plane/Fly (2).png";
const tiroImg = './assets/characters/free_plane_sprite/png/Bullet/Bullet (1).png'
const tiroVilao = './assets/characters/plane_pack/planes/torpedo/torpedo_black.png'
let imagemAtual = 1;

//animacao do personagem
function trocarImagem() {
  if (imagemAtual === 1) {
    personagem.src = imagem2URL;
    personagem.alt = "Imagem 2";
    imagemAtual = 2;
  } else {
    personagem.src = imagem1URL;
    personagem.alt = "Imagem 1";
    imagemAtual = 1;
  }
}

// Define o intervalo para trocar a imagem do personagem a cada 2 segundos (2000 milissegundos)
setInterval(trocarImagem, 500);

//posicao que é deslocada a cada movimento do personagem
const step = 30;
//posicao que é deslocada a cada movimento do vilao
const villainStep = 30;
//posicao inicial
let posicaoVertical = 0;

//muda a posicao do personagem
function updatePersonagemPosition() {
    const minY = 0;
    const maxY = game.clientHeight - personagem.clientHeight;

    //limita de passar da borda bottom
    if (posicaoVertical > 400) {
      posicaoVertical = 390;
    }
    
    //limita de passar da borda top
    if(posicaoVertical < -400) {
      posicaoVertical = -390
    }
    
  //atualiza a posicao do versonagem
  personagem.style.top = posicaoVertical + 'px';
}

//monitora o evento de pressionamento de teclas
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      posicaoVertical -= step;
      break;
    case 'ArrowDown':
      posicaoVertical += step;
      break;
  }
  // atualiza a posicao do elemento com base na tecla que foi apertada
  updatePersonagemPosition();
});

//Função para atirar
function atirar() {
    const tiro = document.createElement('img');
    tiro.src = tiroImg;
    tiro.alt = "tiro";
    tiro.classList.add('tiro');
    tiro.id = 'tiro'; 
    document.body.appendChild(tiro);
  
    //captura a posicao do personagem
    const personagemRect = personagem.getBoundingClientRect();

    //atira com base na posicao do personagem
    tiro.style.left = (personagemRect.left + personagemRect.width / 2) + 'px';
    tiro.style.top = (personagemRect.top + personagemRect.height / 2) + 'px';
  

    // Cria um intervalo que move o elemento 'tiro' para a direita a cada 10 ms
    const tiroInterval = setInterval(() => {
        // Obtém as coordenadas e dimensões do elemento 'tiro'
        const tiroRect = tiro.getBoundingClientRect();
        
        // Verifica se 'tiro' não alcançou a borda direita da tela
        if (tiroRect.right < window.innerWidth) {
          // Move 'tiro' 10 pixels para a direita
          tiro.style.left = (parseInt(tiro.style.left) || 0) + 10 + 'px';
        } else {
          // Remove 'tiro' e cancela o intervalo quando alcança a borda direita
          clearInterval(tiroInterval);
          document.body.removeChild(tiro);
        }
    }, 10);
  }

  //funcao que faz o vilao atirar
  function atirarVilao() {
    const tiro = document.createElement('img');
    tiro.src = tiroVilao;
    tiro.alt = "tiro";
    tiro.classList.add('tirovilao');
    tiro.id = 'tiro'; 
    document.body.appendChild(tiro);
  
    // Obtém as coordenadas e dimensões do elemento 'tiro'
    const personagemRect = villain.getBoundingClientRect();

    //atira com base na posicao do vilao
    tiro.style.left = (personagemRect.left + personagemRect.width / 2) + 'px'; // Use 'left' em vez de 'right'
    tiro.style.top = (personagemRect.top + personagemRect.height / 2) + 'px';
  
    // Cria um intervalo que move o elemento 'tiro' para a esquerda a cada 10 ms
    const tiroInterval = setInterval(() => {
        // Obtém as coordenadas e dimensões do elemento 'tiro'
        const tiroRect = tiro.getBoundingClientRect();
        
        // Verifica se 'tiro' não alcançou a borda esquerda da tela
        if (tiroRect.left > 0) {
          // Move 'tiro' 5 pixels para a esquerda
          tiro.style.left = (parseInt(tiro.style.left) || 0) - 5 + 'px';
        } else {
          // Remove 'tiro' e cancela o intervalo quando alcança a borda esquerda
          clearInterval(tiroInterval);
          document.body.removeChild(tiro);
        }
      }, 10);
  }

// Adiciona um ouvinte de eventos ao documento que detecta pressionamentos de tecla
document.addEventListener('keydown', (e) => {
  // Verifica se a tecla pressionada é a barra de espaço
  if (e.key === ' ') {
      // Chama a função 'atirar()' quando a barra de espaço é pressionada
      atirar();
  }
});



  
  
  
  
  