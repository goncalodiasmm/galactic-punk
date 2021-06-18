// ECRÃ INICIAL
function escolherSprite() {
  const sprite1 = document.getElementById('sprite-1')
  const sprite2 = document.getElementById('sprite-2')
  const uiSelecionar = document.getElementById('ui-selecionar')
  uiSelecionar.play()
  sprite1.classList.toggle('hidden')
  sprite2.classList.toggle('hidden')
}

function nivelDificuldade(dificuldade) {
  const dificuldadeFacil = document.getElementById('dificuldade-facil')
  const dificuldadeNormal = document.getElementById('dificuldade-normal')
  const dificuldadeDificil = document.getElementById('dificuldade-dificil')
  const nomeFacil = document.getElementById('nome-facil')
  const nomeNormal = document.getElementById('nome-normal')
  const nomeDificil = document.getElementById('nome-dificil')

  if (dificuldade === 1) {
    dificuldadeFacil.classList.add('text-4xl')
    dificuldadeNormal.classList.remove('text-4xl')
    dificuldadeDificil.classList.remove('text-4xl')
    nomeFacil.classList.remove('hidden')
    nomeNormal.classList.add('hidden')
    nomeDificil.classList.add('hidden')
    const uiSelecionar = document.getElementById('ui-selecionar')
    uiSelecionar.play()
  }

  if (dificuldade === 2) {
    dificuldadeFacil.classList.remove('text-4xl')
    dificuldadeNormal.classList.add('text-4xl')
    dificuldadeDificil.classList.remove('text-4xl')
    nomeNormal.classList.remove('hidden')
    nomeFacil.classList.add('hidden')
    nomeDificil.classList.add('hidden')
    const uiSelecionar = document.getElementById('ui-selecionar')
    uiSelecionar.play()
  }

  if (dificuldade === 3) {
    dificuldadeFacil.classList.remove('text-4xl')
    dificuldadeNormal.classList.remove('text-4xl')
    dificuldadeDificil.classList.add('text-4xl')
    nomeDificil.classList.remove('hidden')
    nomeFacil.classList.add('hidden')
    nomeNormal.classList.add('hidden')
    const uiSelecionar = document.getElementById('ui-selecionar')
    uiSelecionar.play()
  }
}

function iniciarJogo() {
  inicia()
  desenha()
  const ecraInicial = document.getElementById('ecra-inicial')
  const ecraJogo = document.getElementById('ecra-jogo')
  const uiIniciar = document.getElementById('ui-iniciar')
  uiIniciar.play()
  ecraInicial.classList.remove('flex')
  ecraInicial.classList.add('hidden')
  ecraJogo.classList.remove('hidden')
}

// ECRÃ DE PAUSA
function pausarJogo() {
  continua = false
  const ecraJogo = document.getElementById('ecra-jogo')
  const ecraPausa = document.getElementById('ecra-pausa')
  const uiSelecionar = document.getElementById('ui-selecionar')
  uiSelecionar.play()
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
  const ecraFinal = document.getElementById('ecra-final')
  const ecraPausa = document.getElementById('ecra-pausa')
  const bgMusica = document.getElementById('bg-musica')
  bgMusica.volume = 1
  ecraJogo.classList.remove('hidden')
  ecraFinal.classList.remove('flex')
  ecraFinal.classList.add('hidden')
  ecraPausa.classList.remove('flex')
  ecraPausa.classList.add('hidden')
  continua = true
  inicia()
  desenha()
}

function controlarVolume() {
  const volume = document.querySelectorAll('.volume')
  const bgMusica = document.getElementById('bg-musica')
  volume.forEach((btn) => {
    btn.classList.toggle('ri-volume-mute-fill')
    btn.classList.toggle('ri-volume-up-fill')
  })
  if (bgMusica.paused) {
    bgMusica.play()
  } else {
    bgMusica.pause()
  }
}

// ECRÃ FINAL
function finalizarJogo() {
  const ecraJogo = document.getElementById('ecra-jogo')
  const ecraFinal = document.getElementById('ecra-final')
  const pontuacaoAtualFinal = document.getElementById('pontuacao-atual-final')
  const pontuacaoMaximaFinal = document.getElementById('pontuacao-maxima-final')
  pontuacaoAtualFinal.innerHTML = contador
  if (contador > maxima) {
    maxima = contador
  }
  pontuacaoMaximaFinal.innerHTML = maxima
  ecraJogo.classList.add('hidden')
  ecraFinal.classList.remove('hidden')
  ecraFinal.classList.add('flex')
}

function abrirAjuda() {
  const modalAjuda = document.querySelectorAll('.modal-ajuda')
  modalAjuda.forEach((modal) => {
    modal.classList.add('flex')
    modal.classList.remove('hidden')
    const uiSelecionar = document.getElementById('ui-selecionar')
    uiSelecionar.play()
  })
}

function fecharAjuda() {
  const modalAjuda = document.querySelectorAll('.modal-ajuda')
  modalAjuda.forEach((modal) => {
    modal.classList.remove('flex')
    modal.classList.add('hidden')
    const uiSelecionar = document.getElementById('ui-selecionar')
    uiSelecionar.play()
  })
}

function voltarAoInicio() {
  location.reload()
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

var pontuacaoAtual
var pontuacaoMaxima

var dificuldade
var dificuldadeFacil = 1.08
var dificuldadeNormal = 1.16
var dificuldadeDificil = 1.24

function inicia() {
  // TELA
  tela = new Tela(document.getElementById('tela'))
  contexto = tela.contexto
  contador = 0

  // NÍVEIS DE DIFICULDADE
  const nomeFacil = document.getElementById('nome-facil')
  const nomeNormal = document.getElementById('nome-normal')
  const nomeDificil = document.getElementById('nome-dificil')
  if (!nomeFacil.classList.contains('hidden')) {
    dificuldade = dificuldadeFacil
  }
  if (!nomeNormal.classList.contains('hidden')) {
    dificuldade = dificuldadeNormal
  }
  if (!nomeDificil.classList.contains('hidden')) {
    dificuldade = dificuldadeDificil
  }

  // PONTUAÇÃO
  pontuacaoAtual = document.getElementById('pontuacao-atual')
  pontuacaoMaxima = document.getElementById('pontuacao-maxima')
  maxima = localStorage.getItem('pontuacaoMaxima')
  pontuacaoMaxima.innerHTML = maxima

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
    asteroides[i].deltaX += -4
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

  // SPRITES
  const sprite1 = document.getElementById('sprite-1')
  const sprite2 = document.getElementById('sprite-2')

  if (sprite1.classList == 'hidden') {
    sprites[1].desenha(tela)
    sprites[0].activo = false
  } else if (sprite2.classList == 'hidden') {
    sprites[0].desenha(tela)
    sprites[1].activo = false
  }

  // COLISÃO SPRITE - TELA
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].y + sprites[i].altura > tela.altura || sprites[i].y < 0) {
      let impacto = document.getElementById('impacto')
      impacto.play()
      let bgMusica = document.getElementById('bg-musica')
      bgMusica.volume = 0.2
      localStorage.setItem('pontuacaoFinal', contador)
      if (contador > maxima) {
        localStorage.setItem('pontuacaoMaxima', contador)
      }
      finalizarJogo()
      continua = false
    }
  }

  // ASTEROIDES
  for (let i = 0; i < asteroides.length; i++) {
    asteroides[i].desenha(tela)
    if (asteroides[i].x + asteroides[i].largura < 0) {
      asteroides[i].x = Math.random() * tela.largura + tela.largura
      asteroides[i].y = Math.random() * (tela.altura - asteroides[i].altura)
      asteroides[i].deltaX *= dificuldade
    }
    // COLISÃO ASTEROIDES - SPRITE
    for (let j = 0; j < sprites.length; j++) {
      if (sprites[j].colide(asteroides[i])) {
        let impacto = document.getElementById('impacto')
        impacto.play()
        let bgMusica = document.getElementById('bg-musica')
        bgMusica.volume = 0.2
        localStorage.setItem('pontuacaoFinal', contador)
        if (contador > maxima) {
          localStorage.setItem('pontuacaoMaxima', contador)
        }
        finalizarJogo()
        continua = false
      }
    }
  }

  // POWER-UP
  powerUp.desenha(tela)

  // COLISÃO POWER-UP - SPRITE
  for (let i = 0; i < sprites.length; i++) {
    if (powerUp.colide(sprites[i])) {
      const barraProgresso = document.getElementById('barra-progresso')
      barraProgresso.classList.remove('hidden')
      powerUp.visivel = false
      let powerUpSFX = document.getElementById('power-up-sfx')
      powerUpSFX.play()
      for (let j = 0; j < asteroides.length; j++) {
        asteroides[j].visivel = false
        asteroides[j].activo = false
        setTimeout(() => {
          asteroides[j].x = Math.random() * tela.largura + tela.largura
          asteroides[j].visivel = true
          asteroides[j].activo = true
          powerUp.x = Math.random() * tela.largura + tela.largura * 2
          powerUp.visivel = true
          barraProgresso.classList.add('hidden')
        }, 5000)
      }
    }
  }

  if (powerUp.x + powerUp.largura < 0) {
    powerUp.x = Math.random() * tela.largura + tela.largura
    powerUp.y = Math.random() * (tela.altura - powerUp.altura)
  }

  if (continua) {
    contador++
    if (dificuldade === dificuldadeFacil) {
      let contadorFacil = contador * dificuldadeFacil.toFixed(0)
      pontuacaoAtual.innerHTML = contadorFacil
    }
    if (dificuldade === dificuldadeNormal) {
      let contadorNormal = contador * dificuldadeNormal.toFixed(0)
      pontuacaoAtual.innerHTML = contadorNormal
    }
    if (dificuldade === dificuldadeDificil) {
      let contadorDificil = contador * dificuldadeDificil.toFixed(0)
      pontuacaoAtual.innerHTML = contadorDificil
    }
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
