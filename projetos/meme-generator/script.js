window.onload = function() {

function takeInput() {    
    let getInput = document.querySelector('#text-input');
    getInput.addEventListener('keyup', function() {
        let getInputFromUser = getInput.value;
        let changeInput = document.querySelector('#meme-text h2');
        changeInput.innerHTML = getInputFromUser;
    })
}
takeInput();

function putImage() {
    let getImage = document.querySelector('#meme-insert');
    getImage.addEventListener('change', function(e) {
        let getImageFromUser = URL.createObjectURL(e.target.files[0]);
        console.log(getImageFromUser);
        let putSrc = document.querySelector('#meme-image');
        putSrc.setAttribute('src', getImageFromUser);
        
    })
}
putImage();

function changeBorder() {
    let getButtonsBorders = document.querySelectorAll('.change-border');
    let divToChange = document.querySelector('#meme-image-container');
    for(let i = 0; i < getButtonsBorders.length; i++) {
        getButtonsBorders[i].addEventListener('click', function(e) {
            if(e.target.id == 'fire') {
                divToChange.style.cssText = 'border: 3px dashed #f00';
            }
            else if(e.target.id == 'water') {
                divToChange.style.cssText = 'border: 5px double #00f;';
            }
            else if(e.target.id == 'earth') {
                divToChange.style.cssText = 'border: 6px groove rgb(0, 128, 0);';
            }
        })
    }
}
changeBorder();

function alreadyMemes() {
    let memePhoto = document.querySelectorAll('.img-done');
    for(let i = 0; i < memePhoto.length; i++) {
        memePhoto[i].addEventListener('click', function(e) {
            let photoDiv = document.querySelector('#meme-image');
            photoDiv.setAttribute('src', e.target.src)
        })
    }
}
alreadyMemes();
}