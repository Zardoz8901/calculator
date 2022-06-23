// create calculator template
class Calculator {
    
    // assign operand text parameters and call function clear
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // assign currentOperand and previousOperand
    // set display text to empty strings and operation to undefined
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    
    // remove number at the end of string 
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    // call the number button inner text as function argument
    appendNumber(number) {
        // limit input length so number doesnt overflow
        const length = this.currentOperand.length
        if (length > 12) {
            return ''
        } else {
        // number converted to string
        this.currentOperand = this.currentOperand.toString()
        // limit input to a single decimal
        if (number === '.' && this.currentOperand.includes('.')) return
        // add the inputted number to current operand
        this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    // call the operation button inner text as function arguement
    chooseOperation(operation) {
        if (operation == '/') {
            operation = '÷'
        }
        // if current operand is empty, stop
        if (this.currentOperand === '') return
        // if previous operand is not empty call compute function
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        // set previous operand to current operand value
        this.previousOperand = this.currentOperand
        // clear current operand value
        this.currentOperand = ''
    }

    // pass operands and operations through compute
    compute() {
        // assign computation variable to scope
        let computation
        // convert operand strings to floating point numbers 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // if neither operand is a number, stop
        if (isNaN(prev) || isNaN(current)) return
        // compute prev and current operands add, subtract, divide, multiply
        switch (this.operation) {
            case '+':
                computation = prev + current
                break    
            case '-':
                computation = prev - current
                break    
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default: 
                return        
        }
        // set computed operands as current operand
        this.currentOperand = computation
        // clear the active operator
        this.operation = undefined
        // set previous operand to empty
        this.previousOperand = ''
    }

    // helper function to comb the kinks of decimals and display aesthetic
    // current operand is passed through as an argument
    // integer digits and decimal digits are seperated and processed individually
    // integer digits and decimal digits are then catenated into a grammaticly correct whole 
    getDisplayNumber(number) {
        // convert current operand to string
        const stringNumber = number.toString()
        const length = stringNumber.length
        // set character limit on display output
        if (length > 13) {
           return parseFloat(stringNumber).toPrecision(10)
        }
        // split off all numbers preceding the decimal
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        // split off all numbers following the decimal
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        // if integer digits are not a number return empty string
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            // if integer digits are a number format visual aesthetic to english grammar convention
            // set maximum fraction digits to 0 to remove decimal places from integer digits
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        // if decimal digit is a number add it to the integer display
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        // if not return integer display number
        } else {
            return integerDisplay
        }
    }

    // display the integers and operators
    updateDisplay() {
        // current operand inner text is set to the current operand variable
        // after variable is passed through the display number cleaner function
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        
            // if there is an operator called
        if (this.operation != null) {
            // set previous operand inner text is set to previous operand variabled
            // the variable is passed throught the display number cleaner function
            // the operation symbol is catenated at the end
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation }`
                // clear operating on an empty decimal
                if (this.previousOperandTextElement.innerText == `. ${this.operation}`) {
                    this.previousOperandTextElement.innerText = ''
                    this.clear()
                }
        // if operation is null the previous operand text is cleared
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// return data-tag elements and assign them to global scope
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-global-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// create caluclator object from calculator class
// feed operand text elements (top and bottom display) into the parameters 
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

// hook event listeners to global scoped elements
// on click initiate calculator object functions
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay() 
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay() 
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay() 
})

document.addEventListener('keydown', function(number) {
    if  (number.key >= 0 && number.key <= 9 || number.key == '.') {
        calculator.appendNumber(number.key)
        calculator.updateDisplay()
    }
});

document.addEventListener('keydown', function(operator) {
    if (operator.key == '+' || operator.key == '-' || operator.key == '/' || operator.key == '*') {
        calculator.chooseOperation(operator.key)
        calculator.updateDisplay()
    }
})

document.addEventListener('keydown', function(equals) {
    if (equals.key == 'Enter' || equals.key == '=') {
        calculator.compute(equals.key)
        calculator.updateDisplay()
    }
})

document.addEventListener('keydown', function(clear) {
    if (clear.key == 'Delete' || clear.key == 'Escape') {
        calculator.clear(clear.key)
        calculator.updateDisplay()
    }
})

document.addEventListener('keydown', function(backspace) {
    if (backspace.key == 'Backspace') {
        calculator.delete(backspace.key)
        calculator.updateDisplay()
    }
})