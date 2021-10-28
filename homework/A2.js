str=prompt("Введите Ваше имя:");
function delSpace(string){
    string=string.split(' ').join('');
    return string;
}
console.log('$'+delSpace(str)+"$");