// ECRÃ INICIAL
function escolherSprite() {
  const sprite1 = document.getElementById('sprite-1')
  const sprite2 = document.getElementById('sprite-2')
  sprite1.classList.toggle('hidden')
  sprite2.classList.toggle('hidden')
}

function comecarJogo() {
  const ecraInicial = document.getElementById('ecra-inicial')
  const ecraJogo = document.getElementById('ecra-jogo')
  ecraInicial.classList.add('hidden')
  ecraJogo.classList.remove('hidden')
}

// ECRÃ DE JOGO
var tela
var contexto
var continua
var contador

var estadoJogo
var pontuacao

var fundo
var asteroides
var sprites
var powerup

var racioX
var racioY

var ratoX
var ratoY

var angulo
var amplitude

function inicia() {
  // TELA
  tela = new Tela(document.getElementById('tela'))
  contexto = tela.contexto
  continua = true
  contador = 0

  // PONTUAÇÃO
  pontuacao = document.getElementById('pontuacao')

  // ESTADO DE JOGO
  estadoJogo = {
    atual: 0,
    inicial: 0,
    jogo: 1,
    final: 2,
  }

  // FUNDO
  fundo = [
    new Imagem(0, 0, document.getElementById('fundo')),
    new Imagem(tela.largura, 0, document.getElementById('fundo')),
  ]

  // ASTEROIDES
  asteroides = [
    new Imagem(0, 0, document.getElementById('asteroide-1')),
    new Imagem(0, 0, document.getElementById('asteroide-2')),
    new Imagem(0, 0, document.getElementById('asteroide-3')),
    new Imagem(0, 0, document.getElementById('asteroide-4')),
    new Imagem(0, 0, document.getElementById('asteroide-5')),
    new Imagem(0, 0, document.getElementById('asteroide-6')),
    new Imagem(0, 0, document.getElementById('asteroide-7')),
    new Imagem(0, 0, document.getElementById('asteroide-8')),
  ]
  for (let i = 0; i < asteroides.length; i++) {
    asteroides[i].x = Math.random() * tela.largura + tela.largura
    asteroides[i].y = Math.random() * (tela.altura - asteroides[i].altura)
    asteroides[i].deltaX = -4
  }

  // SPRITES
  sprite = [
    new Imagem(
      tela.largura * 0.1,
      tela.altura * 0.5,
      document.getElementById('sprite-1')
    ),
    new Imagem(
      tela.largura * 0.1,
      tela.altura * 0.5,
      document.getElementById('sprite-2')
    ),
  ]

  // POWER-UP
  powerUp = new Imagem(0, 0, document.getElementById('power-up'))
  powerUp.x = Math.random() * tela.largura + tela.largura * 2
  powerUp.deltaX = -4

  ratoX = 0
  ratoY = 0

  racioX = tela.largura / tela.larguraFinal
  racioY = tela.altura / tela.alturaFinal

  tela.elemento.onmousedown = processaBotaoPremido
  tela.elemento.onmouseup = processaBotaoLibertado
  tela.elemento.onmousemove = processaMovimento
}

function desenha() {
  contexto.clearRect(0, 0, tela.largura, tela.altura)

  // FUNDO
  fundo[0].deltaX = -1
  fundo[0].desenha(tela)
  fundo[1].deltaX = -1
  fundo[1].desenha(tela)

  if (fundo[0].x + tela.largura == 0 && fundo[1].x == 0) {
    fundo[0].x = 0
    fundo[1].x = tela.largura
  }

  // ASTEROIDES
  for (let i = 0; i < asteroides.length; i++) {
    asteroides[i].desenha(tela)
    if (asteroides[i].x + asteroides[i].largura < 0) {
      asteroides[i].x = Math.random() * tela.largura + tela.largura
      asteroides[i].y = Math.random() * (tela.altura - asteroides[i].altura)
    }
    // COLISÃO COM SPRITE
    if (sprite[0].colide(asteroides[i])) {
      continua = false
    }
  }

  // SPRITES
  const sprite1 = document.getElementById('sprite-1')
  const sprite2 = document.getElementById('sprite-2')

  if (sprite1.classList == 'hidden') {
    sprite[1].desenha(tela)
  } else if (sprite2.classList == 'hidden') {
    sprite[0].desenha(tela)
  }

  // POWER-UP
  powerUp.desenha(tela)
  if (powerUp.x + powerUp.largura < 0) {
    powerUp.x = Math.random() * tela.largura + tela.largura
    powerUp.y = Math.random() * (tela.altura - powerUp.altura)
  }

  if (continua) {
    contador++
    pontuacao.innerHTML = contador
    requestAnimationFrame(desenha)
  }
}
function processaBotaoPremido(rato) {
  ratoX = Math.floor(rato.offsetX * racioX)
  ratoY = Math.floor(rato.offsetY * racioY)
  //...
}

function processaMovimento(rato) {
  ratoX = Math.floor(rato.offsetX * racioX)
  ratoY = Math.floor(rato.offsetY * racioY)
}

function processaBotaoLibertado(rato) {
  ratoX = Math.floor(rato.offsetX * racioX)
  ratoY = Math.floor(rato.offsetY * racioY)
  //...
}

function processaTeclaPremida(tecla) {
  if (tecla.code == 'Space') {
    // barra de espaços
  }
  if (tecla.code == 'ArrowLeft') {
    // esquerda
  }
  if (tecla.code == 'ArrowUp') {
    sprite[0].deltaY = -3
    sprite[1].deltaY = -3
  }
  if (tecla.code == 'ArrowRight') {
    // direita
  }
  if (tecla.code == 'ArrowDown') {
    sprite[0].deltaY = 3
    sprite[1].deltaY = 3
  }
}

function processaTeclaLibertada(tecla) {
  if (tecla.code == 'Space') {
    //...
  }
  if (tecla.code == 'ArrowLeft' || tecla.code == 'ArrowRight') {
    //...
  }
  if (tecla.code == 'ArrowUp' || tecla.code == 'ArrowDown') {
    sprite[0].deltaY = 0
  }
}

window.onload = function () {
  inicia()
  desenha()
}
window.onkeydown = processaTeclaPremida
window.onkeyup = processaTeclaLibertada