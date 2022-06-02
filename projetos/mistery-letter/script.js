function takeText() {
    let getButtonLetter = document.querySelector('#criar-carta');
    let fatherP = document.querySelector('#carta-gerada');
    getButtonLetter.addEventListener('click', function() {
        let getDivAlreadyCreated = document.querySelectorAll('.span-letter');
        for(let p = 0; p < getDivAlreadyCreated.length; p++) {
            fatherP.removeChild(getDivAlreadyCreated[p]);
        }
        fatherP.innerHTML = '';
        let getTextString = document.querySelector('#carta-texto').value;
        let countStrings = 0;
        let indexStart = 0;
        for(let i = 0; i <= getTextString.length; i++) {
            if(getTextString[0] === undefined || getTextString[0] === ' ') {
                fatherP.innerHTML = 'Por favor, digite o conteúdo da carta.';
                return;
            }
            let indexEnd = 0;
            if(getTextString[i] === ' ' || getTextString[i] === undefined) {
                indexEnd = i;
                let subsString = getTextString.substring(indexStart, indexEnd);
                let childSpan = document.createElement('span');
                childSpan.innerHTML = subsString;
                let classStyle = ['newspaper', 'magazine1', 'magazine2'];
                let classSize = ['medium', 'big', 'reallybig'];
                let classRotation = ['rotateleft', 'rotateright'];
                let classInclination = ['skewleft', 'skewright'];
                function randomClasses() {
                    let simplify = `${classStyle[Math.floor(Math.random() * 2.3)]} ${classSize[Math.floor(Math.random() * 2.3)]} ${classRotation[Math.floor(Math.random() * 1.22223)]} ${classInclination[Math.floor(Math.random() * 1.22223)]}`;
                    return simplify;
                }
                for(let q = 0; q <= countStrings; q++) {
                    switch(countStrings) {
                        case q:
                            childSpan.className = randomClasses();
                    }
                }
                countStrings++;
                fatherP.appendChild(childSpan);
                indexStart = i + 1;
                
                function changeOnClick() {
                    let changeStyleLetter = document.getElementsByTagName('span');
                    for(let i = 0; i < changeStyleLetter.length; i++) {
                        changeStyleLetter[i].addEventListener('click', function(e) {
                            e.target.className = randomClasses();
                    })
                    }
                }
                changeOnClick();
            }
        }
        let getCountWords = document.querySelector('#carta-contador');
        getCountWords.innerHTML = countStrings;
    })
}
takeText();
