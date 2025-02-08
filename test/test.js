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

  document.getElementById("result").innerText = resultText;
}

// Função para alternar entre português e inglês
function toggleLanguage() {
  currentLanguage = currentLanguage === "pt" ? "en" : "pt";

  const title = document.querySelector(".title");
  const label = document.querySelector("label[for='modeSelect']");
  const selectOptions = document.querySelectorAll("#modeSelect option");
  const buttonLang = document.querySelector(
    "button[onclick='toggleLanguage()']"
  );
  const buttonConvert = document.querySelector(
    "button[onclick='convertNumber()']"
  );

  if (title && label && buttonLang && buttonConvert) {
    const texts = {
      pt: {
        title: "Converter Número para Extenso",
        label: "Selecione o formato:",
        options: ["Somente Números", "Moeda Real", "Moeda Dólar"],
        button: "English",
        buttonConvert: "Converter",
      },
      en: {
        title: "Convert Number to Words",
        label: "Select the format:",
        options: ["Numbers Only", "Real Currency", "Dollar Currency"],
        button: "Português",
        buttonConvert: "Convert",
      },
    };

    title.textContent = texts[currentLanguage].title;
    label.textContent = texts[currentLanguage].label;
    selectOptions.forEach((option, index) => {
      option.textContent = texts[currentLanguage].options[index];
    });
    buttonLang.textContent = texts[currentLanguage].button;
    buttonConvert.textContent = texts[currentLanguage].buttonConvert;
  }
}

// Função para converter números por extenso
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

  const firstTens = {
    pt: [
      "onze",
      "doze",
      "treze",
      "quatorze",
      "quinze",
      "dezesseis",
      "dezessete",
      "dezoito",
      "dezenove",
    ],
    en: [
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
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

  const hundreds = {
    pt: [
      "",
      "cem",
      "duzentos",
      "trezentos",
      "quatrocentos",
      "quinhentos",
      "seiscentos",
      "setecentos",
      "oitocentos",
      "novecentos",
    ],
    en: [
      "",
      "one hundred",
      "two hundred",
      "three hundred",
      "four hundred",
      "five hundred",
      "six hundred",
      "seven hundred",
      "eight hundred",
      "nine hundred",
    ],
  };
  //  ✅ Tratando centavos corretamente
  if (number % 1 !== 0) {
    let inteiro = Math.floor(number);
    let centavos = Math.round((number - inteiro) * 100);

    let moedaSingular =
      currentMode === "real"
        ? currentLanguage === "pt"
          ? "real"
          : "dollar"
        : currentLanguage === "pt"
        ? "dólar"
        : "dollar";
    let moedaPlural =
      currentMode === "real"
        ? currentLanguage === "pt"
          ? "reais"
          : "dollars"
        : currentLanguage === "pt"
        ? "dólares"
        : "dollars";

    let centavoSingular = currentLanguage === "pt" ? "centavo" : "cent";
    let centavoPlural = currentLanguage === "pt" ? "centavos" : "cents";

    let valorInteiroTexto =
      inteiro > 0
        ? numberToWords(inteiro) +
          " " +
          (inteiro === 1 ? moedaSingular : moedaPlural)
        : "";
    let valorCentavosTexto =
      numberToWords(centavos) +
      " " +
      (centavos === 1 ? centavoSingular : centavoPlural);

    return valorInteiroTexto + (inteiro > 0 ? " e " : "") + valorCentavosTexto;
  }

  // ✅ Tratando corretamente números entre 10 e 19
  if (number < 10) {
    return ones[currentLanguage][number];
  } else if (number === 10) {
    return currentLanguage === "pt" ? "dez" : "ten";
  } else if (number >= 11 && number <= 19) {
    return firstTens[currentLanguage][number - 11];
  } else if (number < 100) {
    return (
      tens[currentLanguage][Math.floor(number / 10)] +
      (number % 10 !== 0
        ? (currentLanguage === "pt" ? " e " : "-") +
          ones[currentLanguage][number % 10]
        : "")
    );
  }

  return number.toLocaleString(currentLanguage === "pt" ? "pt-BR" : "en-US");
}
