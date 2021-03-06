'use strict'
let r=100; //радиус большого диска, при его изменении все часы резинятся

let clock=document.getElementById('clockCanvas');
clock.width=r*2;
clock.height=r*2;
let context=clock.getContext('2d');

clockFunk();
setInterval(clockFunk,1000);

function clockFunk(){
    context.fillStyle='#fcca66';
    context.beginPath();
    context.arc(r,r, r, 0,Math.PI*2, false);
    context.fill();

for (let i=0; i<12; i++){
    context.fillStyle='#48B382'
    context.beginPath();
    let distance=parseFloat(r*0.78); // расстояние от центра большого диска до центра кружков для цифр, размер 78%
    let angle=parseFloat(i*360/12)/180*Math.PI; //угол расположения кружков для цифр в радианах 
    let x=r+distance*Math.sin(angle);
    let y=r-distance*Math.cos(angle);
    context.arc(x,y, r*0.15, 0,Math.PI*2, false);
    context.fill();

    context.fillStyle='#2B2A29';
    context.font='normal 13px Arial';
    context.textAlign='center';
    context.textBaseline='middle';
    if(!i==0){
        context.fillText(i,x,y);               
    }else{
        context.fillText('12',x,y);
    }
}

    let time=new Date();
    context.fillStyle='#2B2A29';
    context.font='normal 18px Arial';
    context.textAlign='center';
    context.textBaseline='middle';
    context.fillText(time.toLocaleTimeString(),r,r*0.7);

    let sec=time.getSeconds();
    let min=time.getMinutes();
    let hour=time.getHours();

    let secRad=parseFloat(sec*360/60)/180*Math.PI; // 360/60=6deg смещение сек стрелки за 1 сек; 
    let minRad=parseFloat(min*360/60+ 6/60*sec)/180*Math.PI; // 360/60=6deg смещение мин стрелки за 1 мин;  6/60=0.1deg смещение минутной стрелки за 1 сек
    let hourRad=parseFloat(hour*360/12+ 30/60*min+6/3600*sec)/180*Math.PI; // 360/12=30deg = 1 час; // 30/60=0.5deg смещение часовой стрелки за 1 мин  6/3600=0.0017deg смещение часовой стрелки за 1 сек // 30(h+m/60) 
    //Можно делать через turn единица измерения = 1поворот => sec/60 turn

    let lengthSec=r*0.8; //Длина секундной стрелки
    let lengthMin=r*0.7; //Длина минутной стрелки
    let lengthHour=r*0.45; //Длина часовой стрелки

    let secX=r+lengthSec*Math.sin(secRad);
    let secY=r-lengthSec*Math.cos(secRad);

    let minX=r+lengthMin*Math.sin(minRad);
    let minY=r-lengthMin*Math.cos(minRad);

    let hourX=r+lengthHour*Math.sin(hourRad);
    let hourY=r-lengthHour*Math.cos(hourRad);

    //let secHand
    context.strokeStyle='#2B2A29';
    context.beginPath();
    context.lineWidth=r*0.01;
    context.lineCap='round';
    context.moveTo(r,r);
    context.lineTo(secX, secY);
    context.stroke();

    //let minHand
    context.strokeStyle='#2B2A29';
    context.beginPath();
    context.lineWidth=r*0.04;
    context.lineCap='round';
    context.moveTo(r,r);
    context.lineTo(minX, minY);
    context.stroke();

    //let hourHand
    context.strokeStyle='#2B2A29';
    context.beginPath();
    context.lineWidth=r*0.07;
    context.lineCap='round';
    context.moveTo(r,r);
    context.lineTo(hourX, hourY);
    context.stroke();

    console.log(time.toLocaleTimeString());

    }

// Делаем часы создавая все элементы через JS. Кружочки цифр позиционируем центром от центра большого диска 
// x=r+distance*Math.sin(angle);
// Выравниваем по вертикале и горизонтали         
// context.textAlign='center';
// context.textBaseline='middle';
// Стрелки перемещаем каждый раз полностью перерисовывая часы, и заново задавая конечную точку линии
// context.moveTo(r,r);
// context.lineTo(secX, secY);
// secX=r+lengthSec*Math.sin(secRad);
// Если сами задаем координаты по таймеру всегда вначале надо вызвать просто функцию без таймера чтобы при загрузке уже было значение, а потом с таймером
// clock(); setInterval(clock,1000); 