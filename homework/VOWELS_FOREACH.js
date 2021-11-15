"use strict";
let str=prompt("Введите текст:");
let strArr=str.toLowerCase().split('');
const vowels=['а','у', 'о', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё'];
let count=0;
strArr.forEach(isVowel);
function isVowel(letter){
  if (vowels.indexOf(letter)!==-1){
count++;}
return count;}

console.log(`Количество русских гласных букв в тексте: ${isVowel()}`);
//     ?? если писать без отдельно вынесенной строки strArr.forEach(isVowel);, 
//    а в console.log(`Количество: ${strArr.forEach(isVowel)}`), то выводится в консоле undefined, 
//  хотя функция возвращает нужное количество