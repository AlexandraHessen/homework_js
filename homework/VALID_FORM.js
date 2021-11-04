'use strict'
let formJs=document.forms.formHtml;
formJs.addEventListener('submit', (EO) => valid(dev, devError, EO));
formJs.addEventListener('submit', (EO) => valid(name, nameError, EO));
formJs.addEventListener('submit', (EO) => valid(url, urlError, EO));
formJs.addEventListener('submit', (EO) => valid(data, dataError, EO));
formJs.addEventListener('submit', (EO) => valid(visitor, visitorError, EO));
formJs.addEventListener('submit', validVisitor)
formJs.addEventListener('submit', (EO) => valid(email, emailError, EO));
formJs.addEventListener('submit', validEmail)
formJs.addEventListener('submit', validRubricSelectFirst);
formJs.addEventListener('submit', validCommentCheck);
formJs.addEventListener('submit', validAccomRadio);
formJs.addEventListener('submit', (EO) => valid(descr, descrError, EO));

let dev=formJs.elements.devHtml;
let devError=document.getElementById('devErrorHtml');
dev.addEventListener('blur', (EO) => valid(dev, devError, EO))
//еще можно через Function.prototype.bind()

let name=formJs.elements.nameHtml;
let nameError=document.getElementById('nameErrorHtml');
name.addEventListener('blur', (EO) => valid(name, nameError, EO))

let url=formJs.elements.urlHtml;
let urlError=document.getElementById('urlErrorHtml');
url.addEventListener('blur', (EO) => valid(url, urlError, EO))

let data=formJs.elements.dataHtml;
let dataError=document.getElementById('dataErrorHtml');
data.addEventListener('blur', (EO) => valid(data, dataError, EO))

let visitor=formJs.elements.visitorHtml;
let visitorError=document.getElementById('visitorErrorHtml');
visitor.addEventListener('blur', (EO) => valid(visitor, visitorError, EO))
visitor.addEventListener('blur', validVisitor)

function validVisitor(EO){
    EO=EO||window.event;
    try{
        if(isNaN(parseInt(visitor.value.trim()))){
            visitorError.innerHTML='Введите корректное число!';
            EO.preventDefault(); 
            return;   
        }else{
            visitorError.innerHTML='';
        }
    }
    catch(ex){
        alert('Извините, что-то пошло не так, неожиданный сбой!');
         EO.preventDefault();
    }
}

let email=formJs.elements.emailHtml;
let emailError=document.getElementById('emailErrorHtml');
email.addEventListener('blur', (EO) => valid(email, emailError, EO))
email.addEventListener('blur', validEmail)

function validEmail(EO){
    EO=EO||window.event;
    try{
        if(email.value.indexOf('@')==-1){
            emailError.innerHTML='Введите корректный email! Он должен содержать @';
            EO.preventDefault(); 
            return;   
        }else{
            emailError.innerHTML='';
        }
    }
    catch(ex){
        alert('Извините, что-то пошло не так, неожиданный сбой!');
         EO.preventDefault();
    }
}

let rubricSelect=formJs.elements.rubricHtmlSelect;
let rubricSelectError=document.getElementById('rubricSelectErrorHtml');
rubricSelect.addEventListener('click', validRubricSelectFirst)

function validRubricSelectFirst(EO){
    EO=EO||window.event;
    try{
        if(rubricSelect.value==1){
            rubricSelectError.innerHTML='На данный момент рубрика “Здоровье” не доступна. Выберите другую.';
            EO.preventDefault(); 
            return;   
        }else{
            rubricSelectError.innerHTML='';
        }
    }
    catch(ex){
        alert('Извините, что-то пошло не так, неожиданный сбой!');
         EO.preventDefault();
    }
}

let accomRadio1=document.getElementById('accomIdRadio1');
let accomRadio2=document.getElementById('accomIdRadio2');
let accomRadio3=document.getElementById('accomIdRadio3');
let accomRadioError=document.getElementById('accomHtmlRadioError');
accomRadio1.addEventListener('change', validAccomRadio)
accomRadio2.addEventListener('change', validAccomRadio)
accomRadio3.addEventListener('change', validAccomRadio)

function validAccomRadio(EO){
    EO=EO||window.event;
    try{
      if((accomRadio1.checked==''&&accomRadio2.checked==''&&accomRadio3.checked=='')){
            accomRadioError.innerHTML='Вы не выбрали размещение!';
            EO.preventDefault(); 
            return;                
        }else{
            accomRadioError.innerHTML='';
        }
     }
     catch (ex){
         alert('Извините, что-то пошло не так, неожиданный сбой!');
         EO.preventDefault();
     }
}

let commentCheck=formJs.elements.commentHtmlCheck;
let commentCheckError=document.getElementById('commentCheckErrorHtml');
commentCheck.addEventListener('change', validCommentCheck)
function validCommentCheck(EO){
    EO=EO||window.event;
    try{
        if(!commentCheck.checked){
            commentCheckError.innerHTML='Правилами нашего сайта обязательно разрешение отзывов.';
            EO.preventDefault(); 
            return;   
        }else{
            commentCheckError.innerHTML='';
        }
    }
    catch(ex){
        alert('Извините, что-то пошло не так, неожиданный сбой!');
        EO.preventDefault();
    }
}

let descr=formJs.elements.descrHtml;
let descrError=document.getElementById('descrErrorHtml');
descr.addEventListener('blur', (EO) => valid(descr, descrError, EO))


function valid(idInput, idError, EO){
    EO=EO||window.event;
    try{
        if(idInput.value==''){
            idError.innerHTML='Oбязательное поле для заполнения!';
            EO.preventDefault(); 
            return;                
        }else{
            idError.innerHTML='';
        }
     }
     catch (ex){
         alert('Извините, что-то пошло не так, неожиданный сбой!');
         EO.preventDefault();
     }
}
formJs.addEventListener('submit',validAll);
function validAll(EO){
    EO=EO||window.event;
    try{
        let spanAll=document.querySelectorAll('span');
    for (let i=0; i<spanAll.length; i++){
        if (spanAll[i].textContent!=''){
            if(spanAll[i]==accomHtmlRadioError&&accomHtmlRadioError!=''){
                accomRadio1.scrollIntoView();
                EO.preventDefault();
                return;
            }else{
            spanAll[i].previousSibling.focus();
            EO.preventDefault();
            return;
            }
        }
    }
     }
     catch (ex){
         alert('Извините, что-то пошло не так, неожиданный сбой!');
         EO.preventDefault();
     }
}

//         Проверка:
// 1.   Все поля должны быть заполнены
// 2.   В поле Посетителей в сутки – может быть только число
// 3.   В поле  E-mail для связи – должен содержать @
// 4.   В поле   Рубрика каталога: недоступна “Здоровье”
// Т.к. для радиокнопки недоступен фокус, установлен скролл к первой
