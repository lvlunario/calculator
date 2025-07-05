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

    // Update calculator display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    function computeResult() {
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        let result = 0;

        switch (operator) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '×': result = a * b; break;
            case '÷': result = b !== 0 ? a / b : 'Error'; break;
            default: return;
        }

        currentInput = result.toString();
        previousInput = '';
        operator = null;
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
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    });


    // Event listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentInput === '0' || shouldResetInput) {
                currentInput = button.textContent;
                shouldResetInput = false;
            } else {
                // append - default case
                currentInput += button.textContent;
            }
            updateDisplay();
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
        if (!operator || previousInput === '') return;

        computeResult();
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