function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, a, b) {
    if (operator == "+") {
        return add(a, b);
    }
    if (operator == "-") {
        return subtract(a, b);
    }
    if (operator == "*") {
        return multiply(a, b);
    }
    if (operator == "/") {
        return divide(a, b);
    }
};

const display = document.querySelector(".calc-display");
const numButtons = document.querySelectorAll(".calc-num");
const operatorButtons = document.querySelectorAll(".calc-operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const backspace = document.querySelector(".backspace");
const neg = document.querySelector(".negative");

function result() {
    if (operator == "/" && operands[1] == 0) {
        clearAll();
        alert("Can't divide by zero. You don't wanna destroy the universe, do you?");
    }

    else if (operands.length == 2) {
        const [a, b] = operands;
        return operate(operator, a, b);
    }

    else {
        //do nothing
    }
}
function displayText(str) {
    if (str !== undefined) {
        display.innerText = str;
    }

    else display.innerText = "";
}

function clearAll() {
    currentOperandIndex = 0;
    operands.length = 0;
    backspaceCount = 0;
    operator = "";
    display.textContent = "";
}

function toNum(num) {
    if (num % 1 != 0) {
        return parseFloat(num);
    }
    else return parseInt(num);
}

function hasDecimal(num) {
    if (num) {
        const str = num.toString();
        return str.includes(".");
    }

    if (!num) {
        return false
    }
}

function inputNumber(num) {
    const currentOperand = operands[currentOperandIndex] || "";
    operands[currentOperandIndex] = toNum(currentOperand + num);

    displayText(operands[currentOperandIndex])
}

function inputOperator(opValue) {
    if (currentOperandIndex < 1 && operands.length != 0) {
        currentOperandIndex++
        operator = opValue;
    }

    else if (currentOperandIndex == 1 && operands.length == 1) {
        operator = opValue;
    }

    else {
        operands[0] = result();
        operands.splice(1, 1);
        operator = opValue;
        displayText(operands[0]);
        currentOperandIndex = 1;
    }
    
}

function addDecimal() {
    if (!operands[currentOperandIndex]) {
        operands[currentOperandIndex] = 0;
        operands[currentOperandIndex] += ".";
        displayText(operands[currentOperandIndex]);
    }
    
    if (!hasDecimal(operands[currentOperandIndex])) {
        operands[currentOperandIndex] += ".";
        displayText(operands[currentOperandIndex]);
    }
    }

function equalsBtn() {
    if (operands.length == 2) {
        displayText(result())
        currentOperandIndex = 0;
        operands[0] = result();
        operands.splice(1, 1);
    }
}

function removeCharacter() {
    if (operands.length != 0) {
        let currentOperandStr = operands[currentOperandIndex].toString() || "";
        const opLength = currentOperandStr.length;
        operands[currentOperandIndex] = currentOperandStr.slice(0, opLength - 1);;
        displayText(operands[currentOperandIndex])
    }
}

function changeSign() {
    if (operands[currentOperandIndex] > 0) {
        operands[currentOperandIndex] = toNum("-" + operands[currentOperandIndex].toString());
        displayText(operands[currentOperandIndex]);
    }

    else if (operands[currentOperandIndex] < 0) {
        operands[currentOperandIndex] = toNum(operands[currentOperandIndex].toString().replace("-", ""));
        displayText(operands[currentOperandIndex]);
    }
}


let currentOperandIndex = 0;
let operand = '';
let operands = [];
let operator = null;


// let count = 0;


for (i = 0; i < numButtons.length; i++) {
        let numButton = numButtons[i];
        numButton.addEventListener("click", function() {
            inputNumber(numButton.textContent);
        })  
}


    


for (i = 0; i < operatorButtons.length; i++) {
    let opButton = operatorButtons[i];    
    opButton.addEventListener("click", function() {
        inputOperator(opButton.textContent);
    })
}

document.addEventListener("keydown", function() {
    if (parseInt(event.key) || event.key == "0") {
        inputNumber(event.key);
    }

    if (event.key == "/" || event.key == "*" || event.key == "-" || event.key == "+") {
        inputOperator(event.key);
    }

    if (event.key == "=" || event.key == "Enter") {
        equalsBtn();
    }

    if (event.key == "Backspace") {
        removeCharacter();
    }

    if (event.key == ".") {
        addDecimal();
    }

    if (event.key == "Escape") {
        clearAll();
    }

})

decimal.addEventListener("click", addDecimal)

equals.addEventListener("click", equalsBtn);

clear.addEventListener("click", clearAll);

backspace.addEventListener("click", removeCharacter);

neg.addEventListener("click", changeSign)

//input first variable v2
//choose operator, v2 becomes v1, v2 becomes empty
//input v2
//IF '=' is pressed RETURN operate(operator, v1, v2)
//IF another operator is chosen v2 = operate(operator, v1, v2) and display v2 on screen
// v1 = v2, v2 = 0 input v2


//input field takes number
//stores in operands array at [0]
//receives an operator, currentOperandIndex = 1
//input field takes number
//stores it in operands array at [1]
//if 'equals' pressed returns result
//if another operator pressed, sets operands[0] = result