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
  const buttonConvert = document.querySelector(
    "button[onclick='convertNumber()']"
  );

  // Define os textos para os dois idiomas
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

  // Aplica os novos textos
  title.textContent = texts[currentLanguage].title;
  label.textContent = texts[currentLanguage].label;
  selectOptions.forEach((option, index) => {
    option.textContent = texts[currentLanguage].options[index];
  });
  buttonLang.textContent = texts[currentLanguage].button;
  buttonConvert.textContent = texts[currentLanguage].buttonConvert;
}

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

  // ✅ 1. Separando centavos para moedas (Real e Dólar)
  if (number % 1 !== 0) {
    let inteiro = Math.floor(number); // Parte inteira do número
    let centavos = Math.round((number - inteiro) * 100); // Parte decimal (centavos)

    // Define a moeda e os centavos com base no modo e idioma
    let moeda =
      currentMode === "number"
        ? currentLanguage === "pt"
          ? ""
          : ""
        : currentMode === "real"
        ? currentLanguage === "pt"
          ? "reais"
          : "reais"
        : currentLanguage === "pt"
        ? "dólares"
        : "dollars";

    let moedaCentavos =
      currentMode === "real"
        ? currentLanguage === "pt"
          ? "centavos"
          : "cents"
        : currentLanguage === "pt"
        ? "centavos"
        : "cents";

    // Retorna o número por extenso, com a moeda e os centavos
    return (
      numberToWords(inteiro) + // Parte inteira
      " " +
      moeda + // Moeda (reais ou dólares)
      " e " +
      numberToWords(centavos) + // Centavos
      " " +
      moedaCentavos // Palavra "centavos" ou "cents"
    );
  }

  if (number < 10) {
    return ones[currentLanguage][number];
  } else if (number < 100) {
    return (
      tens[currentLanguage][Math.floor(number / 10)] +
      (number % 10 !== 0
        ? (currentLanguage === "pt" ? " e " : "-") +
          ones[currentLanguage][number % 10]
        : "")
    );
  } else if (number < 1000) {
    let centena = Math.floor(number / 100);
    let resto = number % 100;

    let centenaTexto = hundreds[currentLanguage][centena];
    if (currentLanguage === "pt" && centena === 1 && resto > 0) {
      centenaTexto = "cento";
    }

    let connector =
      resto !== 0 ? (currentLanguage === "pt" ? " e " : " and ") : "";

    return centenaTexto + connector + (resto !== 0 ? numberToWords(resto) : "");
  } else if (number < 1000000) {
    // Milhares (1.000 - 999.999)
    let milhar = Math.floor(number / 1000);
    let resto = number % 1000;

    if (milhar === 1) {
      return (
        (currentLanguage === "pt" ? "mil" : "one thousand") +
        (resto !== 0
          ? (currentLanguage === "pt" ? " e " : ", ") + numberToWords(resto)
          : "")
      );
    }

    return (
      numberToWords(milhar) +
      (currentLanguage === "pt" ? " mil" : " thousand") +
      (resto !== 0
        ? (currentLanguage === "pt" ? " e " : ", ") + numberToWords(resto)
        : "")
    );
  } else if (number < 1000000000) {
    // Milhões (1.000.000 - 999.999.999)
    let milhao = Math.floor(number / 1000000);
    let resto = number % 1000000;

    let milhaoTexto;
    if (currentLanguage === "pt") {
      milhaoTexto =
        milhao === 1 ? "um milhão" : numberToWords(milhao) + " milhões";
    } else {
      milhaoTexto =
        milhao === 1 ? "one million" : numberToWords(milhao) + " million";
    }

    let connector =
      resto !== 0 ? (currentLanguage === "pt" ? " e " : ", ") : "";

    return milhaoTexto + connector + (resto !== 0 ? numberToWords(resto) : "");
  } else if (number < 1000000000000) {
    // Bilhões (1.000.000.000 - 999.999.999.999)
    let bilhao = Math.floor(number / 1000000000);
    let resto = number % 1000000000;

    let bilhaoTexto;
    if (currentLanguage === "pt") {
      bilhaoTexto =
        bilhao === 1 ? "um bilhão" : numberToWords(bilhao) + " bilhões";
    } else {
      bilhaoTexto =
        bilhao === 1 ? "one billion" : numberToWords(bilhao) + " billion";
    }

    let connector =
      resto !== 0 ? (currentLanguage === "pt" ? " e " : ", ") : "";

    return bilhaoTexto + connector + (resto !== 0 ? numberToWords(resto) : "");
  } else {
    return number.toLocaleString(currentLanguage === "pt" ? "pt-BR" : "en-US");
  }
}
