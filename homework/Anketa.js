"use strict"
let nam=prompt('Введите Ваше имя');
nam=valid(nam);
let surname=prompt('Введите Вашу фамилию');
surname=valid(surname);
let otch=prompt('Введите Ваше отчество');
otch=valid(otch);
function valid(text){
    while (true){
        if ((Boolean(text)===false)||(text.length>20)){
            text=prompt(`Вы ввели некорректное значение!
Введите еще раз:`);
        } else {break;}
    }
    return text;
    }
let agePl=prompt("Введите Ваш возраст");
let age;
while(true){
    age=parseInt(agePl);
    if(isNaN(age)){
       agePl=prompt(`Вы ввели некорректное число!
Введите еще раз:`);
    } else{
        break;
    }
}
let genderPl=confirm('Если Ваш пол - мужской, нажмите \”ОК\”, если Ваш пол женский, нажмите \”Отмена\”');
let gender;
let pens;
if (genderPl){
    gender="мужской";
    if (age>=63){
        pens="да";}
    else{
        pens="нет";}
}else{
    gender="женский";
    if (age>=58){
        pens="да" }
    else{
        pens="нет";}
}
alert(`Ваше ФИО: ${nam} ${surname} ${otch}
Ваш возраст в годах: ${age}
Ваш возраст в днях: ${age*365}
Через 5 лет вам будет: ${age+5}
Ваш пол: ${gender}
Вы на пенсии: ${pens}`);