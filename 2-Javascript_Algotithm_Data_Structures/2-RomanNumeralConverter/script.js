const input = document.getElementById("number");
const output = document.getElementById("output");
const button = document.getElementById("convert-btn");

let number;
let roman;

const pole = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

button.addEventListener("click", start);

function start() {
  if (input.value == "") {
    output.textContent = "Please enter a valid number";
  } else {
    number = parseInt(input.value);
    if (number >= 4000) {
      output.textContent = "Please enter a number less than or equal to 3999.";
    } else if (number < 1) {
      output.textContent = "Please enter a number greater than or equal to 1";
    } else {
      vypocet();
    }
  }
}

function vypocet() {
  roman = "";
  for (let i = 0; i < pole.length; i++) {
    while (number >= pole[i].value) {
      roman += pole[i].symbol;
      number -= pole[i].value;
    }
  }

  output.textContent = roman;
}
