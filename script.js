document.addEventListener('DOMContentLoaded', () => {
    console.log('Calculator ready!');

    // Calculator state
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetInput = false;

    // DOM elements
    const display = document.querySelector('.display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const decimalButton = document.querySelector('.decimal');
    const plusMinusButton = document.querySelector('.operator[data-operation="plusminus"]');

    // Basic math operations
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => {
        if (b === 0) {
            alert("Error: Division by zero");
            return 0;
        }
        return a / b;
    };

    // Perform calculation based on operator
    function operate(operator, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch(operator) {
            case '+': return add(a, b);
            case '-': return subtract(a, b);
            case 'x': return multiply(a, b);
            case '÷': return divide(a, b);
            default: return b;
        }
    }

    // Update calculator display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Handle number button clicks
    function handleNumber(number) {
        if(currentInput === '0' || resetInput) {
            currentInput = number;
            resetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    // Handle operator button clicks
    function handleOperator(op) {
        if(operation !== null && !resetInput) {
            calculate();
        }
        previousInput = currentInput;
        operation = op;
        resetInput = true;
    }

    // Perform calculation
    function calculate() {
        currentInput = operate(operation, previousInput, currentInput).toString();
        operation = null;
        updateDisplay();
    }

});