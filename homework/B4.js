'use strict'
let strPl=prompt("Введите текст:")
function buildWrapper(tag){
    return (str)=>{
    for (let i=0; i<str.length; i++){
        switch (str[i]){
            case '<':
                str=str.replace(str[i], '&lt;');
                break;
            case '>':
                str=str.replace(str[i], '&gt;');
                break;
            case "'":
                str=str.replace(str[i], '&apos;');
                break;
            case '"':
                str=str.replace(str[i], '&quot;');
                break;
            case '&':
                str=str.replace(str[i], '&amp;');
                break;       
        }       
    }
        return (`<${tag}>${str}</${tag}>`)
    }
}

var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
console.log( wrapH1("СТИХИ") ); // в консоль выводится строка "<H1>СТИХИ</H1>"
var wrapP=buildWrapper("P"); //  строим функцию для оборачивания текста в тег P
console.log( wrapP("Однажды в студёную зимнюю пору") );
console.log( wrapP("Вкусные M&M's") );
console.log( wrapP(strPl) );



// Каррирование - преобразование функции с множеством аргументов в набор вложенных функций с одним аргументом. 
//При вызове каррированной функции с передачей ей одного аргумента, она возвращает новую функцию, которая ожидает поступления следующего аргумента. 
// function multiply(a) {
//     return (b) => {
//         return (c) => {
//             return a * b * c
//         }
//     }
// }log(multiply(1)(2)(3)) // 6
// 
// 
// const mul1 = multiply(1);
// const mul2 = mul1(2);
// const result = mul2(3);
// log(result); // 6
