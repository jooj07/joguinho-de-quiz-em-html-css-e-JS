import perguntas from "./perguntas.js";

let botaoIniciar = document.getElementById("iniciar");
let botao1 = document.getElementById("botao-1");
let botao2 = document.getElementById("botao-2");
let botao3 = document.getElementById("botao-3");
let botao4 = document.getElementById("botao-4");
let container = document.getElementById("card-da-pergunta");
let textoPergunta = document.getElementById("texto-pergunta");
let contadorAcertos = document.getElementById("contador");
let cardInicio = document.getElementById("card-inicio");
let btnVoltar = document.getElementById("voltar");
let imagem = document.getElementById("foto");
let corpo = document.getElementById("corpo");
let pontuacaoFinal = document.getElementById("pontuacao-final");
let cardFinal = document.getElementById("card-final");
let aleta = document.getElementById("alerta");

let pontos = 0;
let perguntaAtual = 0;
let quantidadePerguntas = perguntas.length;

function inserirPerguntaNoCard() {
  corpo.removeAttribute("class");
  botao3.classList.remove("hide");
  botao4.classList.remove("hide");
  botao1.classList.remove("hide");
  botao2.classList.remove("hide");
  console.log(perguntaAtual);
  if (perguntaAtual < quantidadePerguntas) {
    // haverão perguntas com 4 ou 2 alternativas
    if (perguntas[perguntaAtual].botoes.length === 2) {
      botao3.classList.add("hide");
      botao4.classList.add("hide");
      botao1.innerText = perguntas[perguntaAtual].botoes[0];
      botao2.innerText = perguntas[perguntaAtual].botoes[1];
    } else {
      botao1.innerText = perguntas[perguntaAtual].botoes[0];
      botao2.innerText = perguntas[perguntaAtual].botoes[1];
      botao3.innerText = perguntas[perguntaAtual].botoes[2];
      botao4.innerText = perguntas[perguntaAtual].botoes[3];
    }
    textoPergunta.innerText = perguntas[perguntaAtual].pergunta;

    if (perguntas[perguntaAtual].image) {
      imagem.src = perguntas[perguntaAtual].image;
    } else {
      imagem.src = "./assets/img.jpg";
    }
  } else {
    console.log("acabou");
    container.classList.add("hide");
    cardFinal.classList.remove("hide");
    pontuacaoFinal.innerHTML = `Você fez ${pontos} pontos!`;
    btnVoltar.classList.add("hide");
  }
}

window.iniciarJogo = function iniciarJogo() {
  /*
  ^ Esse window se da pq o script é um modulo
  as variáveis não são diretamente colocadas no escopo global
  como em um script normal. Devemos colocar diretamente para usar no html
  */
  contadorAcertos.innerText = `${pontos} pontos`;
  corpo.removeAttribute("class");
  botaoIniciar.classList.add("hide");
  contadorAcertos.classList.remove("hide");
  container.classList.remove("hide");
  btnVoltar.classList.remove("hide");
  cardInicio.classList.add("hide");
  inserirPerguntaNoCard();
};
window.reset = function reset() {
  pontos = 0;
  perguntaAtual = 0;
  contadorAcertos.innerText = `${pontos} pontos`;
  cardFinal.classList.add("hide");
  botaoIniciar.classList.remove("hide");
  contadorAcertos.classList.add("hide");
  container.classList.add("hide");
  btnVoltar.classList.add("hide");
  cardInicio.classList.remove("hide");
  corpo.removeAttribute("class");
  botao3.classList.remove("hide");
  botao4.classList.remove("hide");
  botao1.classList.remove("hide");
  botao2.classList.remove("hide");
};
botao1.addEventListener(
  "click",
  function () {
    checarResposta(botao1.innerText);
  },
  false
);
botao2.addEventListener(
  "click",
  function () {
    checarResposta(botao2.innerText);
  },
  false
);
botao3.addEventListener(
  "click",
  function () {
    checarResposta(botao3.innerText);
  },
  false
);
botao4.addEventListener(
  "click",
  function () {
    checarResposta(botao4.innerText);
  },
  false
);

function checarResposta(item) {
  if (item === perguntas[perguntaAtual].resposta) {
    corpo.removeAttribute("class");
    corpo.classList.add("acertou");
    botao3.classList.add("hide");
    botao4.classList.add("hide");
    botao1.classList.add("hide");
    botao2.classList.add("hide");
    pontos += 1;
    perguntaAtual += 1;
    contadorAcertos.innerText = `${pontos} pontos`;
    setTimeout(() => {
      inserirPerguntaNoCard();
    }, 2000);
  } else {
    corpo.removeAttribute("class");
    corpo.classList.add("errou");
    alerta.innerText = `Resposta certa: ${perguntas[perguntaAtual].resposta}`;
    alerta.classList.remove("hide");
    botao3.classList.add("hide");
    botao4.classList.add("hide");
    botao1.classList.add("hide");
    botao2.classList.add("hide");
    perguntaAtual += 1;
    setTimeout(() => {
      alerta.classList.add("hide");
      inserirPerguntaNoCard();
    }, 1100);
  }
}
