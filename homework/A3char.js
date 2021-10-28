let str = prompt("Введите фразу:");

function isPalindrome(phrase) {
    phrase = phrase.toLowerCase().split(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g).join('').split('ё').join('e').split('ъ').join('ь');
    for (var i = 0; i < phrase.length; i++)
        if (phrase.charAt(i) == phrase.charAt(phrase.length - 1 - i)) {
            return true;
        } else {
            return false;
        }
}

if (isPalindrome(str)) {
    console.log('Это палиндром.');
} else {
    console.log('Это не палиндром.');
}