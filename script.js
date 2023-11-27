let firstNumber = '';
let secondNumber = '';
let operator = '';
let nextOperator = '';
let displayedResult = '';
let concatNum = false;
let allowComma = false;

function appendNumber(num) {
    allowComma = false;
    if (concatNum) {
        document.getElementById('display').value += num;
    } else {
        document.getElementById('display').value = num;
        concatNum = true;
    }
    if (firstNumber === '' || operator === '') {
        firstNumber = document.getElementById('display').value;
        console.log(firstNumber);
        displayedResult = firstNumber;
    } else {
        secondNumber = document.getElementById('display').value;
    }
}

function appendOperator(op) {
    if (firstNumber !== '') {
        concatNum = false;
        if (operator === '') {
            operator = op;
        } else {
            operator = document.getElementById('num-op').value.slice(-1);
        }
        nextOperator = op;
        let currently = displayedResult.concat(" ", op);
        document.getElementById('num-op').value = currently;
        if (firstNumber !== '' && secondNumber !== '') {
            calculate();
        }
    }

}

function appendDecimal() {
    if (!document.getElementById('display').value.includes(".") && !allowComma) {
        document.getElementById('display').value += '.';
        concatNum = true;
    } else if (allowComma) {
        document.getElementById('display').value = '0.';
        allowComma = false;
        concatNum = true;
    }
}

function clearDisplay() {
    firstNumber = '';
    operator = '';
    nextOperator = '';
    secondNumber = '';
    concatNum = false;
    displayedResult = '';
    document.getElementById('num-op').value = '';
    document.getElementById('display').value = '0';
}

function backspace() {
    if (document.getElementById('display').value != 0) {
        let currentValue = document.getElementById('display').value;
        document.getElementById('display').value = currentValue.slice(0, -1);
    }
}

function calculate() {
    if (firstNumber !== '') {
        concatNum = false;
        allowComma = true;
        if (secondNumber === '0' && operator === '/') {
            alert('Cannot divide by zero!');
            clearDisplay();
            return;
        }
        firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        displayedResult = (Math.round(firstNumber * 1000) / 1000).toString();
        document.getElementById('display').value = displayedResult;
        document.getElementById('num-op').value = displayedResult.concat(" ", nextOperator);
        secondNumber = '';
    }
}

function operate(op, a, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return 'Error';
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    }
});
