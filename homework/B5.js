'use strict'
function buildWrapper(tag){
    return (st, atr)=>{
        function change(str){
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
        return str;
    }
    
    st=change(st);

    if (atr){
    function atrToStr(atr){
    let atrStrF = '';
    for (let k in atr) {
        atr[k]=change(atr[k]);
    atrStrF += ` ${k}='${atr[k]}'`}
    return atrStrF;
    }   
return (`<${tag}${atrToStr(atr)}>${st}</${tag}>`);
    }

return (`<${tag}>${st}</${tag}>`)
    }
}

 var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
console.log( wrapP("Однажды в студёную зимнюю пору") );
// в консоль выводится строка "<P>Однажды в студёную зимнюю пору</P>"
console.log( wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
// в консоль выводится строка "<P lang='ru'>Однажды в студёную зимнюю пору</P>"
// Функция должна учитывать, что некоторые символы надо заменять на HTML-мнемоники (а именно - символы < > ' " &):
 console.log( wrapP("Однажды в <студёную> зимнюю пору") );
// в консоль выводится строка "<P>Однажды в &lt;студёную&gt; зимнюю пору</P>"
var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
// в консоль выводится строка "<H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1>"


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