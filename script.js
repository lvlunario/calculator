document.addEventListener('DOMContentLoaded', () => {
    console.log('Calculator ready!');

    // DOM elements
    const display = document.querySelector('.display');
    const numberButtons = document.querySelectorAll('.btn.number');
    const operatorButtons = document.querySelectorAll('.btn.operator');
    const equalsButton = document.querySelector('.btn.equals');
    const clearButton = document.querySelector('.btn.clear');
    const decimalButton = document.querySelector('.btn.decimal');
    const plusMinusButton = document.querySelector('.btn.plusminus');
    const percentButton = document.querySelector('.btn.percent');

    // Calculator state
    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetInput = false;
    let lastOperator = null;
    let lastOperand = null;

    // Update calculator display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    function computeResult(useLast = false) {
        let a = parseFloat(previousInput);
        let b = parseFloat(currentInput);

        if (useLast && lastOperator && lastOperand !== null) {
            a = parseFloat(currentInput);
            b = lastOperand;
            operator = lastOperator;
        }

        let result = 0;

        switch (operator) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = b !== 0 ? a / b : 'Error'; break;
            default: return;
        }

        currentInput = result.toString();
        if (!useLast) {
            lastOperand = b;
            lastOperator = operator;
        }
        previousInput = '';
        operator = useLast ? lastOperator : null;
    }

    decimalButton.addEventListener('click', () => {
        handleDecimal();
    });

    function handleDecimal() {
        if (shouldResetInput) {
            currentInput = '0.';
            shouldResetInput = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    // PlusMinus
    plusMinusButton?.addEventListener('click', () => {
        if (currentInput !== '0') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
        }

    });

    // Percent
    percentButton?.addEventListener('click', () => {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    })

    // Backspace support
    function handleBackspace() {
        if (shouldResetInput || currentInput.length === 1) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            handleNumber(e.key);
        } else if (e.key === '.') {
            handleDecimal();
        } else if (e.key === '+' || e.key === '-') {
            handleOperator(e.key);
        } else if (e.key === '*' || e.key === 'X') {
            handleOperator('*');
        } else if (e.key === '/' || e.key === '÷') {
            handleOperator('/');
        } else if (e.key === 'Enter' || e.key === '=') {
            equalsButton.click();
        } else if (e.key === 'Backspace') {
            handleBackspace();
        } else if (e.key === 'Escape') {
            resetCalculator();
        } else if (e.key === 'n') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
        } else if (e.key === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }
    });

    // Handle keyboard presses
    function handleNumber(num) {
        if (currentInput === '0' || shouldResetInput) {
            currentInput = num;
            shouldResetInput = false;
        } else {
            currentInput += num;
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (operator && !shouldResetInput) {
            computeResult();
        }
        previousInput = currentInput;
        operator = op;
        shouldResetInput = true;
        updateDisplay();
    }

    // Event listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleNumber(button.textContent);
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const op = button.textContent;

            if (operator && !shouldResetInput) {
                computeResult();
            }

            previousInput = currentInput;
            operator = op;
            shouldResetInput = true;
            updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        if (operator && previousInput !== '') {
            computeResult(true);
        } else if (lastOperator && lastOperand != null) {
            computeResult();
        }

        shouldResetInput = true;
        updateDisplay();
    });

    clearButton.addEventListener('click', () => {
        currentInput = '0';
        previousInput = '';
        operator = null;
        shouldResetInput = false;
        updateDisplay();
    });

    updateDisplay();

});