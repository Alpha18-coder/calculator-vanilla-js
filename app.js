const screen = document.querySelector('.screen');

let total = 0; //first number
let buffer = "0";
let previousOperator;



//detect if button is a number or symbol
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    screen.innerText = buffer;
}


function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            break;
        case '=':
            if(previousOperator === null) {
                return;
            }
            
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = total;
            total = 0;
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            } else {
                console.log(buffer);
                buffer = buffer.substring(0, buffer.length-1);
            }

            break;
        case '+':
        case '×':
        case '÷':
        case '−':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if(buffer === '0') return;

    const intBuffer = parseInt(buffer);

    if(total === 0) {
        total = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
    console.log(buffer)
}


function flushOperation(intBuffer){
    if (previousOperator === '+'){
        total += intBuffer;
    } else if(previousOperator === '−'){
        total -= intBuffer;
    } else if(previousOperator === '×'){
        total *= intBuffer;
    } else if(previousOperator === '÷'){
        total /= intBuffer;
    } else return;
}


function handleNumber(strNum){
    if(buffer === '0') {
        buffer = strNum;
        console.log(buffer);
    } else {
        buffer += strNum;
    }
}



function init(){
    document.querySelector('.calc-buttons').addEventListener('click', (e) => {
        buttonClick(e.target.innerText);
    })
}

init();
