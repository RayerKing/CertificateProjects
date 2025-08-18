const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");
const ol = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clearHistory");

// co píše uživatel
let inputText;
// převedeno do lowCase
let lowInputText;
// otočený lowecase
let palindrome;

// localStorage
let history = JSON.parse(localStorage.getItem("history")) || [];

button.addEventListener("click", start);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    start();
  }
});

loadHistory();

console.table(history);

// funkce pro vložení slova z inputu do proměnné
function inputValue() {
  inputText = input.value;
  console.log("text je " + inputText);
}

// funkce pro alertMessage, když není nic v inputu
function alertMessage() {
  console.log("Volána alertMessage");
  alert("Please input a value");
}

// funkce pro převod do lowCase + odstranění nevhodných znaků
function lowCase(inputText) {
  const regex = /[^a-z0-9]/g;
  console.log(inputText);
  lowInputText = inputText.toLowerCase().replace(regex, "");
  return inputText.toLowerCase().replace(regex, "");
}

// funkce pro otočení slova
function isPalindrome() {
  const uprava = lowCase(inputText);
  palindrome = uprava.split("").reverse().join("");
  console.log("uprava je " + palindrome);
}

// funkce, která vše dává dohromady
function start() {
  inputValue();

  // podmínka, pokud je vstup prázdný
  if (inputText === "") {
    alertMessage();
  } else {
    isPalindrome();
    const isNot = `${inputText} is not a palindrome.`;
    const is = `${inputText} is a palindrome.`;

    const exists = history.some((item) => item === isNot || item === is);

    // pokud lowCase a otočené slovo je stejné
    if (lowInputText === palindrome) {
      same();

      // podmínka, zda už dané slovo je uloženo, nebo ne, nikdy neuloží opakované slovo znovu
      if (exists) {
        return;
      } else {
        // vytvoří záznam do historie, vytvoří li
        history.unshift(`${inputText} is a palindrome.`);
        saveHistory();
        const li = document.createElement("li");
        li.textContent = `${inputText} is a palindrome.`;

        // atributy button pro smazání
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete";
        deleteButton.textContent = "×";
        deleteButton.dataset.id = `${inputText} is a palindrome.`;

        // funkce pro smazání li
        function smazatLi() {
          const id = deleteButton.dataset.id;

          // nechá jen to, co není konkrétním id, které bylo přiřazeno
          history = history.filter((item) => item !== id);
          deleteButton.closest("li")?.remove();
          console.table(history);
          saveHistory();
        }

        deleteButton.addEventListener("click", smazatLi);

        li.appendChild(deleteButton);
        ol.prepend(li);
      }
    } else {
      notSame();
      if (exists) {
        return;
      } else {
        history.unshift(`${inputText} is not a palindrome.`);
        saveHistory();
        const li = document.createElement("li");
        li.textContent = `${inputText} is not a palindrome.`;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete";
        deleteButton.textContent = "×";
        deleteButton.dataset.id = `${inputText} is not a palindrome.`;

        function smazatLi() {
          const id = deleteButton.dataset.id;
          history = history.filter((item) => item !== id);
          deleteButton.closest("li")?.remove();
          saveHistory();
          console.table(history);
        }

        deleteButton.addEventListener("click", smazatLi);

        li.appendChild(deleteButton);
        ol.prepend(li);
      }
    }
  }
  console.table(history);
}

// pokud je palindrome, tak vypíše tohle
function same() {
  result.textContent = `${inputText} is a palindrome`;

  console.log("Je");
}

// pokud není palindrome, tak vypíše tohle
function notSame() {
  result.textContent = `${inputText} is not a palindrome`;
  console.log("Není");
}

// funkce pro uložení do localStorage
function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}

// funkce pro načtení z localStorage
function loadHistory() {
  ol.innerHTML = "";
  // pro každý prvek v poli vytvoří li, button a přiřadí jim atributy
  history.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "×";
    deleteButton.dataset.id = element;

    function smazatLi() {
      const id = deleteButton.dataset.id;
      history = history.filter((item) => item !== id);
      saveHistory();
      deleteButton.closest("li").remove();
    }

    deleteButton.addEventListener("click", smazatLi);
    li.appendChild(deleteButton);
    ol.appendChild(li);
  });
}

// funkce pro smazání všech dat
function clearAll() {
  history = [];
  saveHistory();
  ol.innerHTML = "";
}

clearHistoryBtn.addEventListener("click", clearAll);
