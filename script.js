let firstNumber = '';
let secondNumber = '';
let operator = '';
let nextOperator = '';
let displayedResult = '';
let concatNum = false;
let allowComma = false;
let fromEqual = false;

function appendNumber(num) {
    allowComma = false;
    if (concatNum) {
        document.getElementById('display').value += num;
    } else if (document.getElementById('display').value == 0 || !concatNum) {
        document.getElementById('display').value = num;
        concatNum = true;
    }
    let givenNum = (Math.round(Number(document.getElementById('display').value) * 1000) / 1000).toString();
    if (firstNumber === '' || operator === '') {
        firstNumber = givenNum;
        displayedResult = firstNumber;
    } else {
        secondNumber = givenNum;
    }
}

function appendOperator(op) {
    if (firstNumber !== '') {
        concatNum = false;
        if (operator === '' || fromEqual) {
            fromEqual = false;
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
        concatNum = true;
        document.getElementById('display').value += '.';
    } else if (allowComma) {
        allowComma = false;
        concatNum = true;
        document.getElementById('display').value = '0.';
    }
}

function clearDisplay() {
    firstNumber = '';
    operator = '';
    nextOperator = '';
    secondNumber = '';
    displayedResult = '';
    document.getElementById('num-op').value = '';
    document.getElementById('display').value = '0';
}

function backspace() {
    if (document.getElementById('num-op').value.includes("=")) {
        document.getElementById('num-op').value = '';
    } else if (document.getElementById('display').value != 0) {
        let currentValue = document.getElementById('display').value;
        if (currentValue.length == 1) {
            document.getElementById('display').value = '0';
        } else {
            document.getElementById('display').value = currentValue.slice(0, -1);
        }
    }
}

function calculate(equal=false) {
    if (firstNumber !== '' && operator !== '') {
        concatNum = false;
        allowComma = true;
        if (secondNumber === '0' && operator === '/') {
            alert('Cannot divide by zero!');
            clearDisplay();
            return;
        }
        let result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        displayedResult = (Math.round(result * 1000) / 1000).toString();
        document.getElementById('display').value = displayedResult;
        if (equal) {
            fromEqual = true;
            let displayedEqualResult = firstNumber + " " + operator + " " + secondNumber + " =";
            document.getElementById('num-op').value = displayedEqualResult;
        } else {
            let displayedEqualResult = displayedResult.concat(" ", nextOperator);
            document.getElementById('num-op').value = displayedEqualResult;
        }
        firstNumber = result;
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
        case '÷':
            return a / b;
        default:
            return 'Error';
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate(true);
    } else if (key === 'Backspace') {
        backspace();
    }
});
