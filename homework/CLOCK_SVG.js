'use strict'
let r=100;//радиус большого диска, при его изменении все часы резинятся
let clock=document.getElementById('clockSvg');
clock.setAttribute('width', r*2);
clock.setAttribute('height', r*2);

let bigCircle=document.createElementNS("http://www.w3.org/2000/svg",'circle');
bigCircle.setAttribute('r', r);
bigCircle.setAttribute('cx', r);
bigCircle.setAttribute('cy', r);
bigCircle.setAttribute('fill', '#fcca66');
clock.appendChild(bigCircle)

for(let i=0; i<12; i++){
    let numbCircle=document.createElementNS("http://www.w3.org/2000/svg",'circle');
    let distance=parseFloat(r*0.78); // расстояние от центра большого диска до центра кружков для цифр, размер 78%
    let angle=parseFloat(i*360/12)/180*Math.PI; //угол расположения кружков для цифр в радианах 
    let cx=r+distance*Math.sin(angle);
    let cy=r-distance*Math.cos(angle);
    numbCircle.setAttribute('r', r*0.15);
    numbCircle.setAttribute('cx', cx);
    numbCircle.setAttribute('cy', cy);
    numbCircle.setAttribute('fill',  '#48B382');
    clock.appendChild(numbCircle);
   
    let numb=document.createElementNS("http://www.w3.org/2000/svg",'text');
    numb.setAttribute('x', cx);
    numb.setAttribute('y', cy);
    numb.style.fill='#2B2A29';
    numb.setAttribute('font-family', 'Arial');
    numb.setAttribute('text-anchor', "middle");
    numb.setAttribute('alignment-baseline', 'central');
    numb.setAttribute('font-size', "13");
    numb.textContent=i;
    if (i==0){
        numb.textContent=12;
    }
    clock.appendChild(numb)
}

let hourHand=document.createElementNS("http://www.w3.org/2000/svg",'line');
hourHand.setAttribute('stroke', '#2b2a29');
hourHand.setAttribute('stroke-width', r*0.07);
hourHand.setAttribute('stroke-linecap', 'round');

let minHand=document.createElementNS("http://www.w3.org/2000/svg",'line');
minHand.setAttribute('stroke', '#2b2a29');
minHand.setAttribute('stroke-width', r*0.04);
minHand.setAttribute('stroke-linecap', 'round');

let secHand=document.createElementNS("http://www.w3.org/2000/svg",'line');
secHand.setAttribute('stroke', '#2b2a29');
secHand.setAttribute('stroke-linecap', 'round');

let time=document.createElementNS("http://www.w3.org/2000/svg",'text');
time.setAttribute('x', r);
time.setAttribute('y', r*0.7);
time.style.fill='#2B2A29';
time.setAttribute('font-family', 'Arial');
time.setAttribute('text-anchor', "middle");
time.setAttribute('font-size', "18");
clock.appendChild(time);

clockFunk();
    //Я написалаwindow.addEventListener('DOMContentLoaded', clockFunk);
    //делаем для того чтобы с самого начла при загрузке страницы уже было время,
    // Если не поставить стрелки станут на нужное место только через секунду по таймеру

setInterval(clockFunk,1000);

function clockFunk(){
    let timeDat=new Date();
    time.innerHTML=timeDat.toLocaleTimeString();

    let sec=timeDat.getSeconds();
    let min=timeDat.getMinutes();
    let hour=timeDat.getHours();
    
    let secRad=parseFloat(sec*360/60)/180*Math.PI; // 360/60=6deg смещение сек стрелки за 1 сек; 
    let minRad=parseFloat(min*360/60+ 6/60*sec)/180*Math.PI; // 360/60=6deg смещение мин стрелки за 1 мин; 6/60=0.1deg смещение минутной стрелки за 1 сек
    let hourRad=parseFloat(hour*360/12+ 30/60*min+6/3600*sec)/180*Math.PI; // 360/12=30deg = 1 час; // 30(h+m/60)
    //Можно делать через turn единица измерения = 1поворот => sec/60 turn

    let x1Sec=r;
    let y1Sec=r;
    let x2Sec=r*0.8;
    let y2Sec=r*0.8;
    secHand.setAttribute('x1', r);
    secHand.setAttribute('y1', r);
    x2Sec=x1Sec+x2Sec*Math.sin(secRad);
    y2Sec=x1Sec-y2Sec*Math.cos(secRad);
    secHand.setAttribute('x2', x2Sec);
    secHand.setAttribute('y2', y2Sec);
    clock.appendChild(secHand)

    let x1Min=r;
    let y1Min=r;
    let x2Min=r*0.7;
    let y2Min=r*0.7;
    minHand.setAttribute('x1', r);
    minHand.setAttribute('y1', r);
    x2Min=x1Min+x2Min*Math.sin(minRad);
    y2Min=x1Min-y2Min*Math.cos(minRad);
    minHand.setAttribute('x2', x2Min);
    minHand.setAttribute('y2', y2Min);
    clock.appendChild(minHand)

    let x1Hour=r;
    let y1Hour=r;
    let x2Hour=r*0.45;
    let y2Hour=r*0.45;
    hourHand.setAttribute('x1', r);
    hourHand.setAttribute('y1', r);
    x2Hour=x1Hour+x2Hour*Math.sin(hourRad);
    y2Hour=x1Hour-y2Hour*Math.cos(hourRad);
    hourHand.setAttribute('x2', x2Hour);
    hourHand.setAttribute('y2', y2Hour);
    clock.appendChild(hourHand);

    console.log(timeDat.toLocaleTimeString())
}

// Делаем часы создавая все элементы через JS. Кружочки цифр позиционируем центром от центра большого диска 
// cx=r+distance*Math.sin(angle);
// Выравниваем по вертикале и горизонтали         
// numb.setAttribute('text-anchor', "middle");
// numb.setAttribute('alignment-baseline', 'central');
// Стрелки перемещаем через смещение координат второй точки
// x2Sec=x1Sec+x2Sec*Math.sin(secRad);
// Если сами задаем координаты по таймеру всегда вначале надо вызвать просто функцию без таймера чтобы при загрузке уже было значение, а потом с таймером
// clock(); setInterval(clock,1000); 


