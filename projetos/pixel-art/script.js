window.onload = function() {
const qnt = 25;
const sqrt = 5;

function buildBoard(qntSquare, qntSqrt) {
    let board = document.querySelector('#pixel-board');
    for(let i = 0; i < qntSquare; i++) {
        let square = document.createElement('div');
        square.className = 'pixel';
        board.appendChild(square);
        square.style.cssText = 'height: 40px; width: 40px; border: 1px solid #000; float: left; margin: 0; padding: 0; background-color: #fff;';
        board.style.cssText = 'width: ' + qntSqrt*40 + 'px;' + ' height: ' + qntSqrt*40 + 'px';
    }
}
buildBoard(qnt, sqrt);

function blackFirst() {
    let blackPalette = document.querySelector('#black-palette');
    blackPalette.className += ' selected';
}
blackFirst();

function selectedPalette() {
    let elementSelected = document.getElementsByClassName('color');
    for(let p = 0; p < elementSelected.length; p++) {
        elementSelected[p].addEventListener('click', function(event) {
            let quitOld = document.querySelector('.selected');
            quitOld.className = 'color';
            event.target.className += ' selected';
        })
    }
}
selectedPalette();

function paintSquare() {
    let squareToPaint = document.querySelectorAll('.pixel');
    for(let q = 0; q < squareToPaint.length; q++) {
        squareToPaint[q].addEventListener('click', function(elem) {
            let colorElement = document.querySelector('.selected');
            color = window.getComputedStyle(colorElement, null);
            elem.target.style.cssText += 'background-color: ' + color.getPropertyValue('background-color'); 
        })
    }
}
paintSquare();

function resetColors() {
    let squareToReset = document.querySelectorAll('.pixel');
    let buttonReset = document.getElementById('clear-board');
    for(let r = 0; r < squareToReset.length; r++) {
        buttonReset.addEventListener('click', function() {
            squareToReset[r].style.cssText += 'background-color: #fff';
        })
    }
}
resetColors();

//Bônus
function resize() {
    let getButton = document.querySelector('#generate-board');
    getButton.addEventListener('click', function () {
        let getInput = document.querySelector('#board-size');
        if(getInput.value === getInput.defaultValue) {
            window.alert('Board inválido!');
        }
        else {
            let newValue = Number.parseInt(getInput.value);
            if(newValue < 5) {
                newValue = 5;
            }
            else if(newValue > 50) {
                newValue = 50;
            }
            let screenSquare = newValue*newValue;
            let newSizeTotal = document.querySelectorAll('.pixel'); 
            endBoard(newSizeTotal.length);
            buildBoard(screenSquare, newValue);
            paintSquare();
            resetColors();
            randomPalette();
        }
    })
}
resize();

function endBoard(qntSquare) {
    let board = document.querySelector('#pixel-board');
    for(let i = 0; i < qntSquare; i++) {
        let square = document.querySelector('.pixel');
        board.removeChild(square);
    }
}

function randomPalette() {
    let takeRandomColor = document.querySelectorAll('.random');
    for(let i = 0; i < takeRandomColor.length; i++) {
        let colorR = Math.floor(Math.random() * 255.3);
        let colorG = Math.floor(Math.random() * 255.3);
        let colorB = Math.floor(Math.random() * 255.3);
        takeRandomColor[i].style.cssText = `background-color: rgb(${colorR}, ${colorG}, ${colorB})`;
    }
}
randomPalette();
}

