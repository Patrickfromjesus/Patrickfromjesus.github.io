function addLi() {
    let addItem = document.querySelector('#criar-tarefa');
    let getOl = document.querySelector('#lista-tarefas');
    let getInput = document.querySelector('#texto-tarefa');
    addItem.addEventListener('click', function() {
        let createLi = document.createElement('li');
        createLi.innerHTML = getInput.value;
        createLi.className = 'list-item';
        getOl.appendChild(createLi);
        getInput.value = '';
        changeBackground();
        changeLineThrough();
    })
}
addLi();

function changeClassName(getClass, nameClass) {
   getClass.className += nameClass;
}

function changeBackground() {
    let getLi = document.querySelectorAll('.list-item');
    for(let i = 0; i < getLi.length; i++) {
        getLi[i].addEventListener('click', function(e) {
            for(let p = 0; p < getLi.length; p++) {
                if(getLi[p].className.includes('back-gray')) {
                    getLi[p].classList.remove('back-gray'); 
                }
            }
            changeClassName(e.target, ' back-gray');
        })
    }
}

function recursionAdd() {
    let getLi = document.querySelectorAll('.list-item');
    for(let i = 0; i < getLi.length; i++) {
        getLi[i].addEventListener('dblclick', function(e) {
            changeClassName(e.target, ' completed');
            recursionRemove();
            })
    }
}

function recursionRemove() {
    let getLi = document.querySelectorAll('.list-item');
    for(let i = 0; i < getLi.length; i++) {
        getLi[i].addEventListener('dblclick', function(o) {
            o.target.classList.remove('completed');
            recursionAdd();
        })
    }
}

function changeLineThrough() {
    let getLi = document.querySelectorAll('.list-item');
    for(let i = 0; i < getLi.length; i++) {
        recursionAdd();
    }
}

function clearLi(classeToRemove, idFather) {
    let father = document.querySelector(idFather);
    let target = document.querySelectorAll(classeToRemove);
    for(let i = 0; i < target.length; i++) {
        target[i].remove();
    }
}
document.querySelector('#apaga-tudo').addEventListener('click', function() {
    clearLi('.list-item', '#apagar-tudo');
});

document.querySelector('#remover-finalizados').addEventListener('click', function() {
    clearLi('.completed', '#remover-finalizados');
});

document.querySelector('#remover-selecionado').addEventListener('click', function() {
    clearLi('.back-gray', '#remover-selecionado');
});

function MoveLiUpDown(upDown, idLi) {
    let getButtonDownUp = document.querySelector(idLi);
    let getLiMove = document.querySelectorAll('.list-item');
    for(let q = 0; q < getLiMove.length; q++) {
        getButtonDownUp.addEventListener('click', function() {
            console.log(getLiMove[q]);
            if(getLiMove[q].className.includes('back-gray') && upDown === 'up') {
                getLiMove[q].parentElement.insertBefore(getLiMove[q], getLiMove[q].previousSibling);
            }
            else if(getLiMove[q].className.includes('back-gray') && upDown === 'down') {
                getLiMove[q].parentElement.insertBefore(getLiMove[q], getLiMove[q].nextSibling);
            }
        })
    }
}

function moveLiSelected(idButton, upDown) {
    let getButtonDownUp = document.querySelector(idButton);
    getButtonDownUp.addEventListener('click', function() {
        let liToMove = document.querySelectorAll('.list-item');
        for(let q = 0; q < liToMove.length; q++) {
            if(liToMove[q].className.includes('back-gray')) {
                if(upDown === 'down') {
                    if(liToMove[q].parentNode.lastChild !== liToMove[q]) {
                        liToMove[q].parentElement.insertBefore(liToMove[q], liToMove[q].nextSibling.nextSibling);
                    }
                }
                else if(upDown === 'up') {
                    if(liToMove[q].parentNode.firstChild !== liToMove[q]) {
                        liToMove[q].parentElement.insertBefore(liToMove[q], liToMove[q].previousSibling);
                    }
                }
            }
        }
    })
}
moveLiSelected('#mover-baixo', 'down');
moveLiSelected('#mover-cima', 'up');

//localStorage
function saveLocalStorage() {
    let listTasks = document.querySelectorAll('.list-item');
        let arrayTasks = [];
        let arrayClass = [];
        for(let i = 0; i < listTasks.length; i++) {
            arrayTasks.push(listTasks[i].innerHTML);
            arrayClass.push(listTasks[i].className);
        }
        localStorage.setItem('tasks', JSON.stringify(arrayTasks));
        localStorage.setItem('classes', JSON.stringify(arrayClass));
}

function fullStorage() {
    let getOlNew = document.querySelector('#lista-tarefas');
        for(let p = 0; p < JSON.parse(localStorage.tasks).length; p++) {
            let createLiNew = document.createElement('li');
            createLiNew.innerHTML = JSON.parse(localStorage.tasks)[p];
            createLiNew.className = JSON.parse(localStorage.classes)[p];
            getOlNew.appendChild(createLiNew);
        }
}

function loadLocalStorage() {
    if(typeof(Storage != 'undefined')) {
        if(localStorage.tasks !== undefined) {
            fullStorage();
        }
    let getButtonSave = document.querySelector('#salvar-tarefas');
        getButtonSave.addEventListener('click', saveLocalStorage);
    }
    else {
        window.write('Não existe suporte para Web Storage!');
    }
}
loadLocalStorage();
changeLineThrough();
changeBackground();