const display = document.querySelector("#display");
const buttonsContainer = document.querySelector(".buttons-container");


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    return "OOPS. You can't divide by 0";
  } else {
    return a / b;
  }
}

function operate(firstValue, operator, secondValue) {
  switch (operator) {
    case "+":
      return add(firstValue, secondValue);
      break;
    case "-":
      return subtract(firstValue, secondValue);
      break;
    case "*":
      return multiply(firstValue, secondValue);
      break;
    case "/":
      return divide(firstValue, secondValue);
      break;
    default:
      return 0;
  }
}

function appendToDisplay(value) {
  display.value += value;
}

function clear() {
  display.value = "0";
  firstValue = null;
  operator = null;
  secondValue = null;
  displayValue = "0";
  justEvaluated = false;
  waitingSecond = false;
}

function clearDisplay() {
  display.value = "0";
}

const isOperator = (v) => v === "+" || v === "-" || v === "*" || v === "/";


//variables
let firstValue = null;
let operator = null;
let secondValue = null;
let displayValue = "0";
let justEvaluated = false;
let waitingSecond = false;

buttonsContainer.addEventListener("click", (event) => {
  const target = event.target;

  // Ignore clicks that are not buttons
  if (target.tagName !== "BUTTON") return;

  const value = target.textContent;

  if (value === "Clear") {
        clear();
  } else if (value === "=") {
        if (firstValue !== null && isOperator(operator) && !waitingSecond) {
            secondValue = Number(display.value);

            const result = operate(firstValue, operator, secondValue);
            display.value = String(result);

            if (typeof result === "string") {
                firstValue = null;
                operator = null;
                waitingSecond = false;
                justEvaluated = true; // show message until next digit/clear
                return;
            }

            firstValue = result;
            operator = null;
            waitingSecond = false;
            justEvaluated = true;
        }
  } else if (!isNaN(value)) {
        if (justEvaluated) {
            clearDisplay();
            justEvaluated = false;
        }
        if (waitingSecond) {
            clearDisplay();
            waitingSecond = false;
        }

        if (display.value === "0") {
            display.value = value;
        } else {
            appendToDisplay(value);
        }
  } else if (isOperator(value)) {
        if (waitingSecond) {
            operator = value;
        } else if (firstValue !== null && isOperator(operator) && !waitingSecond) {
            secondValue = Number(display.value);
            display.value = operate(firstValue, operator, secondValue);
            firstValue = Number(display.value);
            operator = value;
            waitingSecond = true;
        } else {
            firstValue = Number(display.value);
            operator = value;
            waitingSecond = true;
        }
  } else if (value === ".") {
        if (justEvaluated) {
            display.value = "0";
            justEvaluated = false;
        }
        if (waitingSecond) {
            display.value = "0";
            waitingSecond = false;
        }
        if (!display.value.includes(".")) {
            display.value += ".";
        }
  }
});
