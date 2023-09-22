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

startButton.addEventListener('click', ()=> {
    startButton.style.display = 'none'
    startedGame.style.display = 'flex'
    setInterval(atirarVilao, 2500)
})

const imagem1URL = "./assets/characters/free_plane_sprite/png/Plane/Fly (1).png";
const imagem2URL = "./assets/characters/free_plane_sprite/png/Plane/Fly (2).png";
const tiroImg = './assets/characters/free_plane_sprite/png/Bullet/Bullet (1).png'
const tiroVilao = './assets/characters/plane_pack/planes/torpedo/torpedo_black.png'

let imagemAtual = 1;

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

// Define o intervalo para trocar a imagem a cada 2 segundos (2000 milissegundos)
setInterval(trocarImagem, 500);

const step = 30;
const villainStep = 30;
let posicaoVertical = 0;

function updatePersonagemPosition() {
    const minY = 0;
    const maxY = game.clientHeight - personagem.clientHeight;
    const elementoRect = personagem.getBoundingClientRect();
    const janelaHeight = window.innerHeight;

    if (posicaoVertical > 400) {
      console.log(posicaoVertical)
        posicaoVertical = 390;
        // personagem.style.top = 390 + 'px';
    }

    if(posicaoVertical < -400) {
      posicaoVertical = -390
    }
    
  personagem.style.top = posicaoVertical + 'px';
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      posicaoVertical -= step;
      break;
    case 'ArrowDown':
      posicaoVertical += step;
      break;
  }
  // limitarColisao(personagem)
  updatePersonagemPosition();
});

//ATIRAR ====== INICIO
function atirar() {
    const tiro = document.createElement('img');
    tiro.src = tiroImg;
    tiro.alt = "tiro";
    tiro.classList.add('tiro');
    tiro.id = 'tiro'; 
    document.body.appendChild(tiro);
  
    const personagemRect = personagem.getBoundingClientRect();
    tiro.style.left = (personagemRect.left + personagemRect.width / 2) + 'px';
    tiro.style.top = (personagemRect.top + personagemRect.height / 2) + 'px';
  
    const tiroInterval = setInterval(() => {
      const tiroRect = tiro.getBoundingClientRect();
      if (tiroRect.right < window.innerWidth) {
        tiro.style.left = (parseInt(tiro.style.left) || 0) + 10 + 'px';
      } else {
        clearInterval(tiroInterval);
        document.body.removeChild(tiro);
      }
    }, 10);
  }

  function atirarVilao() {
    const tiro = document.createElement('img');
    tiro.src = tiroVilao;
    tiro.alt = "tiro";
    tiro.classList.add('tirovilao');
    tiro.id = 'tiro'; 
    document.body.appendChild(tiro);
  
    const personagemRect = villain.getBoundingClientRect();
    tiro.style.left = (personagemRect.left + personagemRect.width / 2) + 'px'; // Use 'left' em vez de 'right'
    tiro.style.top = (personagemRect.top + personagemRect.height / 2) + 'px';
  
    const tiroInterval = setInterval(() => {
      const tiroRect = tiro.getBoundingClientRect();
      if (tiroRect.left > 0) { // Alterado o limite para quando o tiro deve ser removido
        tiro.style.left = (parseInt(tiro.style.left) || 0) - 5 + 'px'; // Subtrai pixels para mover da direita para a esquerda
      } else {
        clearInterval(tiroInterval);
        document.body.removeChild(tiro);
      }
    }, 10);
  }
  
//ATIRAR ====== FIM

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        atirar();
    }
});


  
  
  
  
  