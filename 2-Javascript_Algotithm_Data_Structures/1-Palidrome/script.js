const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

let inputText;
let lowInputText;
let palindrome;

button.addEventListener("click", start);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    
    start();             
  }
});

function inputValue() {
  inputText = input.value;
  console.log("text je " + inputText);
}

function alertMessage() {
  console.log("Volána alertMessage");
  alert("Please input a value");
}

function lowCase(inputText) {
  const regex = /[^a-z0-9]/g;
  console.log(inputText);
  lowInputText = inputText.toLowerCase().replace(regex, "");
  return inputText.toLowerCase().replace(regex, "");
}

function isPalindrome() {
  const uprava = lowCase(inputText);
  palindrome = uprava.split("").reverse().join("");
  console.log("uprava je " + palindrome);
}

function start() {
  inputValue();

  if (inputText === "") {
    alertMessage();
  } else {
    isPalindrome();
    if (lowInputText === palindrome) {
      same();
    } else {
      notSame();
    }
  }
}

function same() {
  result.textContent = `${inputText} is a palindrome`;
  console.log("Je");
}

function notSame() {
  result.textContent = `${inputText} is not a palindrome`;
  console.log("Není");
}
