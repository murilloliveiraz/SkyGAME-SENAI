//seleciona o botao de start
const startButton = document.getElementById('start');
//seleciona a div que tem o jogo
const startedGame = document.querySelector('.startedGame')
//seleciona a div do personagem
const divPersonagem = document.getElementById('personagem')
//seleciona o personagem
const personagem = document.querySelector(".plane");
const villain = document.querySelector('.vilao');
const villainImg = document.querySelector('.vilaoimg');
const game = document.querySelector(".game")
let vidasDoPersonagem = 3; 
const vida1 = document.getElementById('vida1');
const vida2 = document.getElementById('vida2');
const vida3 = document.getElementById('vida3');

//monitora o click no botao start e inicia o jogo
startButton.addEventListener('click', ()=> {
    startButton.style.display = 'none'
    startedGame.style.display = 'flex'
  })
  //faz o vilao atirar a cada 2.5s
  setInterval(atirarVilao, 2500)

const imagem1URL = "./assets/characters/plane_pack/planes/plane_3/plane_3_green.png";
const imagem2URL = "./assets/characters/free_plane_sprite/png/Plane/Fly (2).png";
const tiroImg = './assets/characters/free_plane_sprite/png/Bullet/Bullet (1).png'
const tiroVilao = './assets/characters/plane_pack/planes/torpedo/torpedo_black.png'
const explosaoGif = './assets/characters/plane_pack/explosion_effect/explode3.gif'
let imagemAtual = 1;

//animacao do personagem
// function trocarImagem() {
//   if (imagemAtual === 1) {
//     personagem.src = imagem2URL;
//     personagem.alt = "Imagem 2";
//     imagemAtual = 2;
//   } else {
    personagem.src = imagem1URL;
//     personagem.alt = "Imagem 1";
//     imagemAtual = 1;
//   }
// }

// Define o intervalo para trocar a imagem do personagem a cada 2 segundos (2000 milissegundos)
// setInterval(trocarImagem, 500);

//posicao que é deslocada a cada movimento do personagem
const step = 50;
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
          tiro.style.left = (parseInt(tiro.style.left) || 0) + 12 + 'px';
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
    tiro.id = 'tirovilao'; 
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
          tiro.style.left = (parseInt(tiro.style.left) || 0) - 8 + 'px';
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


function checkTiroInimigo(){
  const tiro = document.getElementById('tirovilao'); // Mova esta linha para dentro da função
  if (!tiro){ return;} // Se o tiro não existir, retorne e não faça nada

  const tiroRect = tiro.getBoundingClientRect();
  const inimigoRect = personagem.getBoundingClientRect();

  if (
      tiroRect.left < inimigoRect.right &&
      tiroRect.right > inimigoRect.left &&
      tiroRect.top < inimigoRect.bottom &&
      tiroRect.bottom > inimigoRect.top
  ){
    document.body.removeChild(tiro);
    vidasDoPersonagem = vidasDoPersonagem - 1;
    diminuiVidas(vidasDoPersonagem);
    if(vidasDoPersonagem <= 0){
      personagem.src = explosaoGif;
      vida1.style.display = "none";
      setTimeout(function() {
        personagem.remove();
      }, 1000)
      setTimeout(function(){
        gameOver();
      }, 1200)
    }
    }
}

function diminuiVidas(vidas) {
  if(vidasDoPersonagem == 2){
    vida3.style.display = "none";
  }
  if(vidasDoPersonagem == 1){
    vida2.style.display = "none";
  }
}

function checkCollision(){
  const tiro = document.getElementById('tiro'); // Mova esta linha para dentro da função
  if (!tiro){ return;} // Se o tiro não existir, retorne e não faça nada
  
  const tiroRect = tiro.getBoundingClientRect();
  const inimigoRect = villain.getBoundingClientRect();
  
  if (
    tiroRect.left < inimigoRect.right &&
    tiroRect.right > inimigoRect.left &&
    tiroRect.top < inimigoRect.bottom &&
    tiroRect.bottom > inimigoRect.top
    ) {
      villainImg.src = explosaoGif;
      document.body.removeChild(tiro);
      setTimeout(function() {
        villain.remove();
      }, 1000)
  }
}

function checarColisoes(){
checkCollision();//Colisao entre inimigo e personagem
checkTiroInimigo();
}

setInterval(checarColisoes,50);

function gameOver(){
  startedGame.style.display = 'none';
  const h1 = document.createElement('h1');
  h1.innerText = "GAME OVER"
  const game = document.querySelector('.game');
  h1.style.position = 'absolute';
  h1.style.top = '50%';
  const p = document.createElement('p')
  p.innerText = "o jogo vai reiniciar em 5s"
  p.style.position = 'absolute';
  p.style.top = '54%';

  setTimeout(function(){
    window.location.reload();
  }, 4000)

  game.appendChild(h1);
  game.appendChild(p);
}