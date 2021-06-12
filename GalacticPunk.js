// ECRÃ INICIAL
function escolherSprite() {
  const sprite1 = document.getElementById('sprite-1')
  const sprite2 = document.getElementById('sprite-2')
  sprite1.classList.toggle('hidden')
  sprite2.classList.toggle('hidden')
}

function iniciarJogo() {
  inicia()
  desenha()
  const ecraInicial = document.getElementById('ecra-inicial')
  const ecraJogo = document.getElementById('ecra-jogo')
  ecraInicial.classList.remove('flex')
  ecraInicial.classList.add('hidden')
  ecraJogo.classList.remove('hidden')
}

// ECRÃ DE PAUSA
function pausarJogo() {
  continua = false
  const ecraJogo = document.getElementById('ecra-jogo')
  const ecraPausa = document.getElementById('ecra-pausa')
  ecraJogo.classList.add('hidden')
  ecraPausa.classList.remove('hidden')
  ecraPausa.classList.add('flex')
}

function continuarJogo() {
  const ecraJogo = document.getElementById('ecra-jogo')
  const ecraPausa = document.getElementById('ecra-pausa')
  ecraJogo.classList.remove('hidden')
  ecraPausa.classList.remove('flex')
  ecraPausa.classList.add('hidden')
  continua = true
  desenha()
}

function recomecarJogo() {
  const ecraJogo = document.getElementById('ecra-jogo')
  const ecraPausa = document.getElementById('ecra-pausa')
  ecraJogo.classList.remove('hidden')
  ecraPausa.classList.remove('flex')
  ecraPausa.classList.add('hidden')
  continua = true
  inicia()
  desenha()
}

// MECÂNICA DE JOGO
var tela
var contexto
var continua = true
var contador

var fundo
var asteroides
var sprites
var powerUp

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
  contador = 0

  // PONTUAÇÃO
  pontuacaoAtual = document.getElementById('pontuacao-atual')
  pontuacaoMaxima = document.getElementById('pontuacao-maxima')
  melhor = localStorage.getItem('Pontuação Máxima')
  pontuacaoMaxima.innerHTML = melhor

  // FUNDO
  fundo = [
    new Imagem(0, 0, document.getElementById('fundo')),
    new Imagem(tela.largura, 0, document.getElementById('fundo')),
  ]
  for (let i = 0; i < fundo.length; i++) {
    fundo[i].deltaX = -1
  }

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

  // POWER-UP
  powerUp = new Imagem(0, 0, document.getElementById('power-up'))
  powerUp.x = Math.random() * tela.largura + tela.largura * 2
  powerUp.y = Math.random() * tela.altura
  powerUp.deltaX = -4

  // SPRITES
  sprites = [
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
  for (let i = 0; i < fundo.length; i++) {
    fundo[i].desenha(tela)
  }

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
    for (let j = 0; j < sprites.length; j++) {
      if (sprites[j].colide(asteroides[i])) {
        continua = false
        if (contador > melhor) {
          localStorage.setItem('Pontuação Máxima', contador)
        }
      }
    }
  }

  // POWER-UP
  powerUp.desenha(tela)

  for (let i = 0; i < sprites.length; i++) {
    if (powerUp.colide(sprites[i])) {
      const barraProgresso = document.getElementById('barra-progresso')
      barraProgresso.classList.remove('hidden')
      powerUp.visivel = false
      for (let j = 0; j < asteroides.length; j++) {
        asteroides[j].visivel = false
        asteroides[j].activo = false
        setTimeout(() => {
          asteroides[j].x = Math.random() * tela.largura + tela.largura
          asteroides[j].visivel = true
          asteroides[j].activo = true
        }, 5000)
      }
    }
  }

  if (powerUp.x + powerUp.largura < 0) {
    powerUp.x = Math.random() * tela.largura + tela.largura
    powerUp.y = Math.random() * (tela.altura - powerUp.altura)
  }

  // SPRITES
  const sprite1 = document.getElementById('sprite-1')
  const sprite2 = document.getElementById('sprite-2')

  if (sprite1.classList == 'hidden') {
    sprites[1].desenha(tela)
  } else if (sprite2.classList == 'hidden') {
    sprites[0].desenha(tela)
  }

  if (continua) {
    contador++
    pontuacaoAtual.innerHTML = contador
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
  }
  if (tecla.code == 'ArrowLeft') {
  }
  if (tecla.code == 'ArrowUp') {
    for (let i = 0; i < sprites.length; i++) {
      sprites[i].deltaY = -3
    }
  }
  if (tecla.code == 'ArrowRight') {
  }
  if (tecla.code == 'ArrowDown') {
    for (let i = 0; i < sprites.length; i++) {
      sprites[i].deltaY = 3
    }
  }
}

function processaTeclaLibertada(tecla) {
  if (tecla.code == 'Space') {
  }
  if (tecla.code == 'ArrowLeft' || tecla.code == 'ArrowRight') {
  }
  if (tecla.code == 'ArrowUp' || tecla.code == 'ArrowDown') {
    for (let i = 0; i < sprites.length; i++) {
      sprites[i].deltaY = 0
    }
  }
}

window.onkeydown = processaTeclaPremida
window.onkeyup = processaTeclaLibertada
