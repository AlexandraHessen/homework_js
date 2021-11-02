"use strict"
let countries={'Италия': 'Рим', 'Испания': 'Мадрид', 'Франция': 'Париж', 'Германия':'Берлин'};
let count;
let cap;
function addCountries(){
   count=prompt('Введите название страны:');
   cap=prompt('Введите название столицы:');
   add(countries, count, cap);
}
function add(obj, nam, city){
    obj[nam]=city;
    return obj;
}
function infoCountries(){
    count=prompt('Введите название страны:');
    alert (info(countries, count));
}
function info(obj, nam){
    if (nam in obj)
        return (`Страна ${nam} - столица ${obj[nam]}`);
    else 
        return `Информация о стране ${count} не найдена.`
}
function readCountries(){
    alert (read(countries));
}
function read(obj){
    var output = '';
    for (let nam in obj) {
    output += `Страна ${nam} - столица ${obj[nam]}` +'\n';}
    return output;
}
function deleteCountries(){
    count=prompt('Введите название страны, которую хотите удалить:');
    del (countries, count);
}
function del (obj, nam){
    delete obj[nam];
    return obj;
}