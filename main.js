const display = document.querySelector("#display");
const  buttons = document.querySelectorAll("button");

buttons.forEach(button)

function add(a,b){
    return a+b;
}

function substract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(number1,operator,number2){
    switch(operator){
        case "+":
            return add(number1,number2);
            break;
        case "-":
            return substract(number1,number2);
            break;
        case "*":
            return multiply(number1,number2);
            break;
        case "/":
            return divide(number1,number2);
            break;
        default:
            return 0;
    }
}

function appendToDisplay(){
    
}