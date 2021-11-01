'use strict'
const radiusBigCircle=100; //радиус большого диска, при ее изменении все часы резинятся
let numbCircleWidth=radiusBigCircle*0.3; // ширина кружков для цифр, размер 30% от радиуса большого диска
let bigCircle=document.getElementById('bigCircleHtml');

bigCircle.style.cssText='background-color: #FCCA66; border-radius: 50%'
bigCircle.style.width=radiusBigCircle*2+'px';
bigCircle.style.height=radiusBigCircle*2+'px';
let centerXBigCircle=bigCircle.offsetLeft+bigCircle.offsetWidth/2;
let centerYBigCircle=bigCircle.offsetTop+bigCircle.offsetHeight/2;

for (let i=0; i<12; i++){
    let numbCircle=document.createElement('div');
    numbCircle.style.cssText='position: absolute; background-color: #48B382; border-radius: 50%';
    numbCircle.style.width=numbCircleWidth+'px';
    numbCircle.style.height=numbCircleWidth+'px';
    let radius=parseFloat(radiusBigCircle*0.8); // расстояние от центра большого диска до центра кружков для цифр, размер 80%
    let angle=parseFloat(i*360/12)/180*Math.PI; //угол расположения кружков для цифр в радианах 

    let centerXNumbCircle=centerXBigCircle+radius*Math.sin(angle);
    let centerYNumbCircle=centerYBigCircle-radius*Math.cos(angle);

    numbCircle.style.left=Math.round(centerXNumbCircle-numbCircleWidth/2)+'px';
    numbCircle.style.top=Math.round(centerYNumbCircle-numbCircleWidth/2)+'px';

    let numb=document.createElement('span');
    numb.style.cssText='position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-family: Arial, sans-serif; color: #2B2A29';
    let numText=document.createTextNode(i);
    if (i==0){
        numText=document.createTextNode(12); 
    }
    numb.appendChild(numText);
    numbCircle.appendChild(numb);       
    bigCircle.appendChild(numbCircle);
}

let hourHand=document.createElement('div');
hourHand.style.cssText=`position: absolute; background-color: #2B2A29; border-radius: 33%; transform: rotate(-90deg); transform-origin: left center; left:${centerXBigCircle}px; top:${centerYBigCircle}px;`;
hourHand.style.width=radiusBigCircle*0.55+'px'; //длина часовой стрелки; размер 55% от радиус большого диска
hourHand.style.height=radiusBigCircle*0.06+'px'; //толщина часовой стрелки; размер 6% от радиус большого диска
bigCircle.appendChild(hourHand);

let minHand=document.createElement('div');
minHand.style.cssText=`position: absolute; background-color: #2B2A29; border-radius: 33%; transform: rotate(-90deg); transform-origin: left center; left:${centerXBigCircle}px; top:${centerYBigCircle}px;`;
minHand.style.width=radiusBigCircle*0.78+'px'; //длина минутной стрелки; размер 78% от радиус большого диска
minHand.style.height=radiusBigCircle*0.05+'px'; //толщина минутной стрелки; размер 5% от радиус большого диска
bigCircle.appendChild(minHand);

let secHand=document.createElement('div');
secHand.style.cssText=`position: absolute; background-color: #2B2A29; transform: rotate(-90deg); transform-origin: left center; left:${centerXBigCircle}px; top:${centerYBigCircle}px;`;
secHand.style.width=radiusBigCircle*0.85+'px'; //длина секундной стрелки; размер 85% от радиус большого диска
secHand.style.height=radiusBigCircle*0.022+'px';  //толщина секундной стрелки; размер 2,2% от радиус большого диска
bigCircle.appendChild(secHand);

let time=document.createElement('div');  
time.style.cssText=`position: relative; text-align: center; font-size:1.3em; font-family: Aria, sans-serif; `
time.style.top=centerXBigCircle/2+'px';



clock();
//Я написалаwindow.addEventListener('DOMContentLoaded', clock);
//делаем для того чтобы с самого начла при загрузке страницы уже было время,
// Если не поставить стрелки станут на нужное место только через секунду по таймеру


setInterval(clock,1000);

function clock(){
    let timeDat=new Date();
    time.innerHTML=timeDat.toLocaleTimeString();
    bigCircle.appendChild(time);
    let sec=timeDat.getSeconds();
    let min=timeDat.getMinutes();
    let hour=timeDat.getHours();

    let secDeg=(sec-15)*360/60; // 360/60=6deg смещение сек стрелки за 1 сек; 15 т.к. у transform: rotate 0deg на 15сек
    let minDeg=(min-15)*360/60; // 360/60=6deg смещение мин стрелки за 1 мин; 15 т.к. у transform: rotate 0deg на 15мин
    let hourDeg=(hour-3)*360/12; // 360/12=30deg = 1 час; 3 т.к. у transform: rotate 0deg на 3ч  // 30(h+m/60)
//Можно делать через turn единица измерения = 1поворот => sec/60 turn


    secHand.style.transform=`rotate(${secDeg}deg)`;
    minHand.style.transform=`rotate(${minDeg + 6/60*sec}deg)`  // 6/60=0.1deg смещение минутной стрелки за 1 сек
    hourHand.style.transform=`rotate(${hourDeg + 30/60*min+6/3600*sec}deg)`// 30/60=0.5deg смещение часовой стрелки за 1 мин  6/3600=0.0017deg смещение часовой стрелки за 1 сек

    console.log(timeDat.toLocaleTimeString())
}

// Для того чтобы показывало абсолютно точное время нужно
// Вместо  setInterval(clock,1000);
// установить
// setTimeout(clock, 1020-timeDat.getMilliseconds()) 
// и в функции clock {
// setTimeout(clock, 1020-timeDat.getMilliseconds()) 
// //добавить в конец
// }


// Делаем часы создавая все элементы через JS. Кружочки цифр позиционируем центром от центра большого диска centerXNumbCircle=centerXBigCircle+radius*Math.sin(angle);
// Выравниваем по вертикале и горизонтали position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)
// Стрелки перемещаем задавая градус смещения 
// secHand.style.transform=`rotate(${secDeg}deg)`;
// Если сами задаем координаты по таймеру всегда вначале надо вызвать просто функцию без таймера чтобы при загрузке уже было значение, а потом с таймером
// clock(); setInterval(clock,1000); 
