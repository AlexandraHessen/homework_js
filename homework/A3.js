let str=prompt("Введите фразу:");
function isPalindrome(phrase){
   phrase = phrase.toLowerCase().split(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g).join('').split('ё').join('e').split('ъ').join('ь');
   phraseReverse=phrase.split('').reverse().join('');
   return (phrase===phraseReverse);
}
if (isPalindrome(str)){
   console.log('Это палиндром.');
} else{
   console.log('Это не палиндром.');
}