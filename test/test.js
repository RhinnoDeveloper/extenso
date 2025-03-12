// Variáveis globais
let currentMode = "number"; // Modo padrão (somente números)
let currentLanguage = "pt"; // Idioma padrão (português)

// Atualiza o modo baseado na opção selecionada no select
function updateMode() {
  const select = document.getElementById("modeSelect");
  currentMode = select.value;
  formatCurrencyInput(); // Formata o input ao mudar o modo
}

// Converte o número para texto por extenso, levando em conta o modo e o idioma
function convertNumber() {
  const input = document.getElementById("numberInput").value;
  let value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Verifica se o valor é válido
  if (value === "" || isNaN(value) || value < 0 || value > 999999999999999) {
    document.getElementById("result").innerText =
      currentLanguage === "pt"
        ? "O número informado não pode ser escrito por extenso."
        : "The number entered cannot be written in words.";
    return;
  }

  // Converte o número para texto por extenso
  let resultText = numberToWords(parseFloat(value));
  document.getElementById("result").innerText = resultText;
}

// Função para formatar o valor no formato 00,00
function formatCurrencyValue(value) {
  // Garante que o valor tenha sempre 4 dígitos (00,00)
  value = value.padStart(4, "0");

  // Insere a vírgula no lugar correto
  const integerPart = value.slice(0, 2); // Parte inteira (reais/dólares)
  const decimalPart = value.slice(2, 4); // Parte decimal (centavos)

  return `${integerPart},${decimalPart}`;
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
  const input = document.getElementById("numberInput"); // Seleciona o input pelo ID

  // Define os textos para os dois idiomas
  const texts = {
    pt: {
      title: "Escrever por Extenso",
      label: "Selecione o formato:",
      options: ["Somente Números", "Moeda Real", "Moeda Dólar"],
      button: "English",
      buttonConvert: "Converter",
      placeholder: "Digite o número",
    },
    en: {
      title: "Spell Out",
      label: "Select the format:",
      options: ["Numbers Only", "Real Currency", "Dollar Currency"],
      button: "Português",
      buttonConvert: "Convert",
      placeholder: "Enter the number",
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
  input.placeholder = texts[currentLanguage].placeholder;
}

// Função para converter números em palavras
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

  // Define a moeda e os centavos com base no modo e idioma
  let moeda = "";
  let moedaCentavos = "";

  if (currentMode !== "number") {
    moeda =
      currentMode === "real"
        ? currentLanguage === "pt"
          ? number === 1
            ? "real"
            : "reais"
          : number === 1
          ? "real"
          : "reais"
        : currentLanguage === "pt"
        ? number === 1
          ? "dólar"
          : "dólares"
        : number === 1
        ? "dollar"
        : "dollars";

    moedaCentavos =
      currentMode === "real"
        ? currentLanguage === "pt"
          ? "centavos"
          : "cents"
        : currentLanguage === "pt"
        ? "centavos"
        : "cents";
  }

  // Função interna para converter números inteiros
  function convertInteger(number) {
    if (number < 10) {
      return ones[currentLanguage][number];
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
    } else if (number < 1000) {
      let centena = Math.floor(number / 100);
      let resto = number % 100;

      let centenaTexto = hundreds[currentLanguage][centena];
      if (currentLanguage === "pt" && centena === 1 && resto > 0) {
        centenaTexto = "cento";
      }

      let connector =
        resto !== 0 ? (currentLanguage === "pt" ? " e " : " and ") : "";

      return (
        centenaTexto + connector + (resto !== 0 ? convertInteger(resto) : "")
      );
    } else if (number < 1000000) {
      // Milhares (1.000 - 999.999)
      let milhar = Math.floor(number / 1000);
      let resto = number % 1000;

      if (milhar === 1) {
        return (
          (currentLanguage === "pt" ? "mil" : "one thousand") +
          (resto !== 0
            ? (currentLanguage === "pt" ? " e " : ", ") + convertInteger(resto)
            : "")
        );
      }

      return (
        convertInteger(milhar) +
        (currentLanguage === "pt" ? " mil" : " thousand") +
        (resto !== 0
          ? (currentLanguage === "pt" ? " e " : ", ") + convertInteger(resto)
          : "")
      );
    } else if (number < 1000000000) {
      // Milhões (1.000.000 - 999.999.999)
      let milhao = Math.floor(number / 1000000);
      let resto = number % 1000000;

      let milhaoTexto;
      if (currentLanguage === "pt") {
        milhaoTexto =
          milhao === 1 ? "um milhão" : convertInteger(milhao) + " milhões";
        if (resto === 0 && currentMode !== "number") {
          milhaoTexto += " de";
        }
      } else {
        milhaoTexto =
          milhao === 1 ? "one million" : convertInteger(milhao) + " million";
      }

      let connector =
        resto !== 0 ? (currentLanguage === "pt" ? " e " : ", ") : "";

      return (
        milhaoTexto + connector + (resto !== 0 ? convertInteger(resto) : "")
      );
    } else if (number < 1000000000000) {
      // Bilhões (1.000.000.000 - 999.999.999.999)
      let bilhao = Math.floor(number / 1000000000);
      let resto = number % 1000000000;

      let bilhaoTexto;
      if (currentLanguage === "pt") {
        bilhaoTexto =
          bilhao === 1 ? "um bilhão" : convertInteger(bilhao) + " bilhões";
        if (resto === 0 && currentMode !== "number") {
          bilhaoTexto += " de";
        }
      } else {
        bilhaoTexto =
          bilhao === 1 ? "one billion" : convertInteger(bilhao) + " billion";
      }

      let connector =
        resto !== 0 ? (currentLanguage === "pt" ? " e " : ", ") : "";

      return (
        bilhaoTexto + connector + (resto !== 0 ? convertInteger(resto) : "")
      );
    } else {
      return number.toLocaleString(
        currentLanguage === "pt" ? "pt-BR" : "en-US"
      );
    }
  }

  // Se o número tiver parte decimal (centavos)
  if (number % 1 !== 0) {
    let inteiro = Math.floor(number); // Parte inteira do número
    let centavos = Math.round((number - inteiro) * 100); // Parte decimal (centavos)

    if (inteiro === 0) {
      return convertInteger(centavos) + " " + moedaCentavos;
    } else {
      return (
        convertInteger(inteiro) +
        " " +
        moeda +
        " e " +
        convertInteger(centavos) +
        " " +
        moedaCentavos
      );
    }
  }

  // Se o número for inteiro, apenas adiciona a moeda
  let resultText = convertInteger(number);

  if (currentMode !== "number") {
    resultText += " " + moeda;
  }

  return resultText;
}

// Adiciona um listener para formatar o input ao perder o foco
document.getElementById("numberInput").addEventListener("blur", function () {
  formatCurrencyInput();
});

// Função para formatar o input com o símbolo da moeda
function formatCurrencyInput() {
  const input = document.getElementById("numberInput");
  let value = input.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Adiciona o símbolo da moeda com base no modo selecionado
  if (currentMode === "real") {
    input.value = "R$ " + formatCurrencyValue(value);
  } else if (currentMode === "dollar") {
    input.value = "$ " + formatCurrencyValue(value);
  } else {
    input.value = value; // Modo "Somente Números"
  }
}
