let str = prompt("Введите фразу:");

function isPalindromeRec(phrase) {
    phrase = phrase.toLowerCase().split(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g).join('').split('ё').join('e').split(
        'ъ').join('ь');
    if (phrase.length <= 1) {
        return true;
    }
    return (phrase.charAt(0) == phrase.charAt(phrase.length - 1) && isPalindromeRec(phrase.slice(1, phrase
        .length - 1)));
}

if (isPalindromeRec(str)) {
    console.log('Это палиндром.');
} else {
    console.log('Это не палиндром.');
}