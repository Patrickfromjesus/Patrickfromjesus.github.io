const changeDificulty = 6;
var count = Number.parseInt(localStorage.count);
if(localStorage.count !== undefined) {
    document.querySelector('#score').innerHTML = 'Scores: ' + count;
}
else {
    document.querySelector('#score').innerHTML = 'Scores: ' + 0;
}

function generateRandomColors() {
    let getRandom = Math.floor(Math.random() * 255.3);
    if(getRandom > 255) {
        return 255;
    }
    return getRandom;
}
//Gera a cor que será a resposta.
function rigthRandomColor() {
    let textRgb = document.querySelector('#rgb-color');
    const colorR = generateRandomColors();
    const colorG = generateRandomColors();
    const colorB = generateRandomColors();
    textRgb.innerHTML = `rgb(${colorR}, ${colorG}, ${colorB})`;

    //gera os círculos que serão as opções de resposta.
    function dificulty(qntCircles) {
        let getDivCircles = document.getElementById('circles-color');
        for(let i = 0; i < qntCircles; i++) {
            let createCircle = document.createElement('div');
            createCircle.className = 'ball';
            getDivCircles.appendChild(createCircle);
            var changeColorCircles = document.querySelectorAll('.ball');
            changeColorCircles[i].style.cssText = `background-color: rgb( ${generateRandomColors()}, ${generateRandomColors()}, ${generateRandomColors()} )`;
        }
        let randomIndex = Math.floor(Math.random() * 10);
        if(randomIndex >= changeDificulty) {
            randomIndex -= changeDificulty;
            changeColorCircles[randomIndex].style.cssText = `background-color: rgb(${colorR}, ${colorG}, ${colorB})`;
        }
        else {
            changeColorCircles[randomIndex].style.cssText = `background-color: rgb(${colorR}, ${colorG}, ${colorB})`;
        }
        }
    dificulty(changeDificulty);

    function clickRigth() {
        let getSelectedAnswer = document.querySelectorAll('.ball');
        let textAnswer = document.getElementById('answer');
        for(let i = 0; i < getSelectedAnswer.length; i++) {
            getSelectedAnswer[i].addEventListener('click', function(e) {
                let buttonText = document.querySelector('#reset-game');
                buttonText.innerHTML = 'Jogar Novamente';
                if(getSelectedAnswer[i].style.backgroundColor === textRgb.innerHTML) {
                    e.target.style.cssText += 'border: 2px solid lime';
                    textAnswer.innerHTML = 'Acertou!';
                    //atualizar os scores quando acertar a cor.
                    if(typeof(Storage) != "undefined") {
                        if(localStorage.count !== undefined) {
                        let add = Number.parseInt(localStorage.count);
                        add += 3;
                        localStorage.count = add;
                        document.querySelector('#score').innerHTML = 'Scores: ' + add;
                        }
                        else {
                            let add = 3;
                            localStorage.count = 3;
                            document.querySelector('#score').innerHTML = 'Scores: ' + add;
                        }
                    }
                    else {
                        window.alert('Sem suporte para Web Storage!');
                    }
                }
                else {
                    e.target.style.cssText += 'border: 2px solid red';
                    textAnswer.innerHTML = 'Errou! Tente novamente!';
                    //atualiza os scores quando erra a cor.
                    if(typeof(Storage) != "undefined") {
                        if(localStorage.count !== undefined) {
                        let add = Number.parseInt(localStorage.count);
                        if(add > 0) {
                            add--;
                        }
                        localStorage.count = add;
                        document.querySelector('#score').innerHTML = 'Scores: ' + add;
                        }
                        else {
                            localStorage.count = 0;
                        }
                    }
                    else {
                        window.alert('Sem suporte para Web Storage!');
                    }
                }
                getSelectedAnswer[i].style.backgroundColor;
            })
        }
    }
    clickRigth();
}
rigthRandomColor();

function playGame() {
    let buttonRefresh = document.querySelector('#reset-game');
    buttonRefresh.addEventListener('click', function() {
        location.reload();
    })
}
playGame();