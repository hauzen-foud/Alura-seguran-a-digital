
```javascript
// Configurações iniciais
const quantidadeCaracteres = document.querySelector(".parametro-senha__texto");
const botoes = document.querySelectorAll(".parametro-senha__botao");
const campoSenha = document.querySelector("#campo-senha");
const opcoes = document.querySelectorAll(".checkbox");
const barraForca = document.querySelector(".forca");
const textoEntropia = document.querySelector(".entropia");

let tamanhoSenha = 12;

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*?";

quantidadeCaracteres.textContent = tamanhoSenha;

// Eventos
botoes[0].addEventListener("click", diminuirTamanho);
botoes[1].addEventListener("click", aumentarTamanho);

opcoes.forEach(opcao => {
    opcao.addEventListener("click", gerarSenha);
});

gerarSenha();

// Diminuir quantidade de caracteres
function diminuirTamanho() {

    if (tamanhoSenha > 4) {
        tamanhoSenha--;
    }

    quantidadeCaracteres.textContent = tamanhoSenha;
    gerarSenha();
}

// Aumentar quantidade de caracteres
function aumentarTamanho() {

    if (tamanhoSenha < 32) {
        tamanhoSenha++;
    }

    quantidadeCaracteres.textContent = tamanhoSenha;
    gerarSenha();
}

// Gera a senha
function gerarSenha() {

    let caracteres = "";

    if (opcoes[0].checked) caracteres += letrasMaiusculas;
    if (opcoes[1].checked) caracteres += letrasMinusculas;
    if (opcoes[2].checked) caracteres += numeros;
    if (opcoes[3].checked) caracteres += simbolos;

    // Evita senha vazia
    if (caracteres.length === 0) {
        campoSenha.value = "";
        textoEntropia.textContent = "Selecione pelo menos uma opção.";
        barraForca.className = "forca fraca";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {

        const indice = Math.floor(Math.random() * caracteres.length);

        senha += caracteres[indice];

    }

    campoSenha.value = senha;

    calcularForca(caracteres.length);

}

// Calcula a força da senha
function calcularForca(tamanhoAlfabeto) {

    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    barraForca.classList.remove("fraca", "media", "forte");

    if (entropia >= 60) {

        barraForca.classList.add("forte");

    } else if (entropia >= 40) {

        barraForca.classList.add("media");

    } else {

        barraForca.classList.add("fraca");

    }

    const dias = Math.floor((2 ** entropia) / (100e6 * 60 * 60 * 24));

   textoEntropia.textContent =
    `Um computador poderia levar aproximadamente ${dias} dias para descobrir essa senha.`;
}
document.getElementById("ano-atual").textContent =
    new Date().getFullYear();

const botaoCopiar = document.getElementById("copiar-senha");

botaoCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(campoSenha.value);

    botaoCopiar.textContent = "Senha copiada!";

    setTimeout(() => {
        botaoCopiar.textContent = "Copiar senha";
    }, 1500);
});
```
