"use strict";
let str=prompt("Введите текст:");
let strArr=str.toLowerCase().split('');
const vowels=['а','у', 'о', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё'];
function isVowel(letter){
    return vowels.indexOf(letter)!==-1;
}
console.log(`Количество русских гласных букв в тексте: ${strArr.filter(isVowel).length}`);
//по filter – каждая буква из массива текста будет проходить функцию проверку, 
//при ее сравнении с массивом гласных, если найдено, то вернет true и буква попадет в новый массив, 
//количество гласных букв, прошедших отбор = длине нового массива
