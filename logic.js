function add(a, b) {
    return a + b
};

function subtract(a, b) {
 return a - b;
};

function multiply(a, b) {
    return a * b
};

function divide(a, b) {
    return a / b
};

//calls one of the above functions on the numbers
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case '×':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
    }
}; 

document.body.addEventListener('click', event => {
    if (event.target.nodeName == 'BUTTON') {
        let keyPress = event.target.textContent;
        console.log(keyPress)
    }
});

