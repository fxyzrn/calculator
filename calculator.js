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
const clear = document.querySelector(".clear")

let aNum = 0;
let bNum = 0;
let operator = "";
let count = 0;

for (i = 0; i < numButtons.length; i++) {
    let numButton = numButtons[i];
    numButton.addEventListener("click", function() {
        display.innerText = numButton.textContent;
        bNum = parseInt(numButton.textContent);
    })
}

for (i = 0; i < operatorButtons.length; i++) {
    let opButton = operatorButtons[i];
    opButton.addEventListener("click", function() {
        count++;
        if (count == 1) {
            aNum = bNum;
            operator = opButton.textContent;
        }

        if (count > 1) {
            count = 0;
            aNum = operate(operator, aNum, bNum);
            operator = opButton.textContent;
            display.innerText = aNum;
            console.log(operator, aNum, bNum)
        }

    })
}

equals.addEventListener("click", function() {
    display.textContent = operate(operator, aNum, bNum);
});

clear.addEventListener("click", function() {
    count = 0;
    aNum = 0;
    bNum = 0;
    operator = "";
    display.textContent = "";
})


    

