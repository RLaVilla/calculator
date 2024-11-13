function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';

function operate(first, second, sign) {
    if (sign === '+') {
       result = add(Number(first), Number(second));
    }

    if (sign === '-') {
        result = subtract(Number(first), Number(second));
    }

    if (sign === '*') {
        result = multiply(Number(first), Number(second));
    }

    if (sign === '/') {
        result = divide(Number(first), Number(second));
    }
    console.log("result:", result);

    if (result.toString().length > 13) {
        result = result.toPrecision(13);
    }

    if (!isFinite(result)) {
        result = "Really? 🤨";
    }

    removeHighlight();

    displayResult();
    firstNumber = '';
    secondNumber ='';
    operator = '';
    console.log("variables:", firstNumber, secondNumber, operator);
}


function removeHighlight() {
    document.querySelectorAll('.operator').forEach(button => {
        button.classList.remove('highlight');
    });
}

function highlightButton(operator) {

    const operatorButton = document.querySelector(`button[data-digit="${operator}"]`);
    if (operatorButton) {
        operatorButton.classList.add('highlight');
    }
}

const screen = document.getElementById('screen');

function displayResult() {
    currentDisplay = result;
    screen.textContent = currentDisplay;
}

let currentDisplay = '';

function enableDecimal() {
    document.querySelector('[data-digit="."]').disabled = false;
}

function handleButtonClick (button) {
    if (button === ".") {
        document.querySelector('[data-digit="."]').disabled = true;
    }

    if (button === "+" || button === "-" || button === "*" || button === "/" || button === "=") {
    } else if (currentDisplay.length < 13) {
        currentDisplay += button;
        updateDisplay();
    }
        

    if ((button === "+" || button === "-" || button === "*" || button === "/") && !firstNumber) {
        firstNumber = currentDisplay;
        operator = button; 

        highlightButton(button);
        enableDecimal();
        clearDisplay(); 
    }
    console.log("firstNumber:", firstNumber);
    console.log("operator:", operator);
    if ((button === "+" || button === "-" || button === "*" || button === "/") && operator) {
        return;
    }

    if (button === "=" && firstNumber) {
        secondNumber = currentDisplay;

        operate(firstNumber, secondNumber, operator);
        enableDecimal();
    }
    console.log("secondNumber:", secondNumber);
}

function updateDisplay() {
    if (currentDisplay === '') {
        screen.textContent = "0.00";
    } else {
    screen.textContent = currentDisplay;
}
}
document.querySelectorAll('[data-digit]').forEach(button => {
    button.addEventListener('click', () => {
        // Get the digit from the button's data attribute
        const digit = button.getAttribute('data-digit');
        handleButtonClick(digit);
    });
});

function clearDisplay () {
    currentDisplay = '';
}

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
        clearDisplay();
        updateDisplay();
        removeHighlight();
        enableDecimal();
});
