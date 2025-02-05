// Variáveis globais
let currentMode = "number"; // Modo padrão (somente números)
let currentLanguage = "pt"; // Idioma padrão (português)

// Atualiza o modo baseado na opção selecionada no select
function updateMode() {
  const select = document.getElementById("modeSelect");
  currentMode = select.value;
}

// Converte o número para texto por extenso, levando em conta o modo e o idioma
function convertNumber() {
  const input = document.getElementById("numberInput").value;
  const number = parseFloat(input.replace(",", ".")); // Permitir uso de vírgula como decimal

  if (isNaN(number) || number < 0 || number > 999999999999999) {
    document.getElementById("result").innerText =
      "O número informado não pode ser escrito por extenso.";
    return;
  }

  let resultText = numberToWords(number);

  // Adiciona o formato de moeda se necessário
  if (currentMode === "real") {
    resultText += currentLanguage === "pt" ? " reais" : " reais";
  } else if (currentMode === "dollar") {
    resultText += currentLanguage === "pt" ? " dólares" : " dollars";
  }

  document.getElementById("result").innerText = resultText;
}

// Função para alternar entre português e inglês
function toggleLanguage() {
  currentLanguage = currentLanguage === "pt" ? "en" : "pt";
  document.querySelector("button[onclick='toggleLanguage()']").innerText =
    currentLanguage === "pt" ? "Mudar para Inglês" : "Switch to Portuguese";
}

// Função que converte número para extenso (simples, sem valores fracionários)
function numberToWords(number) {
  const ones = {
    pt: [
      "zero",
      "um",
      "dois",
      "três",
      "quatro",
      "cinco",
      "seis",
      "sete",
      "oito",
      "nove",
    ],
    en: [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ],
  };

  const tens = {
    pt: [
      "",
      "dez",
      "vinte",
      "trinta",
      "quarenta",
      "cinquenta",
      "sessenta",
      "setenta",
      "oitenta",
      "noventa",
    ],
    en: [
      "",
      "ten",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ],
  };

  if (number < 10) {
    return ones[currentLanguage][number];
  } else if (number < 100) {
    return (
      tens[currentLanguage][Math.floor(number / 10)] +
      (number % 10 !== 0 ? " e " + ones[currentLanguage][number % 10] : "")
    );
  } else {
    return number.toLocaleString(currentLanguage === "pt" ? "pt-BR" : "en-US"); // Exibição numérica para valores maiores
  }
}
