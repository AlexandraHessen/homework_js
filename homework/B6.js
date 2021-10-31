'use strict'
function formatNumber (numb, form){
    let afterDot;
    let between;
    if (form.indexOf('.')!=-1){ //находим количество знаков после точки в форме
        afterDot=form.slice(form.indexOf('.')+1).length; 
    } 
    for (let i=0; i<form.length; i++){ //находим разделить в форме
        if (!(form[i]=='.'||form[i]=='#')){
            between=form[i];
        } 
    }

    numb=numb.toFixed(afterDot); // устанавливаем количество знаков после точки как в форме; все это время переменная type number 
    numb = numb.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, between); //выделяем разряды в целой части, разделитель по форме
    return numb;
}

console.log( formatNumber(2.3,"# ### ###.##") );
// выдаёт "2.30"
console.log( formatNumber(12345.368,"# ### ###.##") );
// выдаёт "12 345.37"
console.log('956352645.368,"#_###_###.##" '+ formatNumber(956352645.368,"#_###_###.##") );
console.log( '5418566345.333,"#,###,###.##" '+formatNumber(5418566345.333,"#,###,###.##") );
console.log( '3,"# ### ###.###" '+formatNumber(3,"# ### ###.###") );
console.log( '12345.368,"# ### ###.#" '+formatNumber(12345.368,"# ### ###.#") );
console.log( '59.368,"# ### ###" '+formatNumber(59.368,"# ### ###") );
console.log( '345.32,"# ### ###.###" '+formatNumber(345.32,"# ### ###.###") );      