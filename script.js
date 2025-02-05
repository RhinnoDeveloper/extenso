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
      currentLanguage === "pt"
        ? "O número informado não pode ser escrito por extenso."
        : "The number entered cannot be written in words.";
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

  // Seleciona os elementos que precisam ser alterados
  const title = document.querySelector(".title");
  const label = document.querySelector("label[for='modeSelect']");
  const selectOptions = document.querySelectorAll("#modeSelect option");
  const buttonLang = document.querySelector(
    "button[onclick='toggleLanguage()']"
  );

  // Define os textos para os dois idiomas
  const texts = {
    pt: {
      title: "Converter Número para Extenso",
      label: "Selecione o formato:",
      options: ["Somente Números", "Moeda Real", "Moeda Dólar"],
      button: "Inglês",
    },
    en: {
      title: "Convert Number to Words",
      label: "Select the format:",
      options: ["Numbers Only", "Real Currency", "Dollar Currency"],
      button: "Português",
    },
  };

  // Aplica os novos textos
  title.textContent = texts[currentLanguage].title;
  label.textContent = texts[currentLanguage].label;
  selectOptions.forEach((option, index) => {
    option.textContent = texts[currentLanguage].options[index];
  });
  buttonLang.textContent = texts[currentLanguage].button;
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
