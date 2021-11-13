"use strict";
let str=prompt("Введите текст:");
let strArr=str.toLowerCase().split('');
let vowels=['а','у', 'о', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё'];
function isVowel(count, letter){
    if (vowels.indexOf(letter)!==-1){
        count++;
    }
    return count;
}
console.log(`Количество русских гласных букв в тексте: ${strArr.reduce(isVowel, 0)}`);