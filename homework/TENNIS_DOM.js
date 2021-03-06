'use strict'
let play = false;
let upPressed = false;
let downPressed = false;
let shiftPressed = false;
let ctrlPressed = false;
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
//field
let widthField=500; //ширина поля
let heightField=300; //высота поля
let field=document.getElementById('fieldId');
field.style.position='relative';
field.style.width=widthField+'px';
field.style.height=heightField+'px';
field.style.backgroundColor='#F0EE7E';
field.style.border='1px solid black';

var RAF=
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback)
    { window.setTimeout(callback, 1000 / 60); }

//ball
let widthBall=widthField*0.05; //ширина мяча
let heightBall=widthBall; //высота мяча
let ball=document.createElement('div');
ball.style.position='absolute';
ball.style.width=widthBall+'px';
ball.style.height=heightBall+'px';
ball.style.backgroundColor='#F02137';
ball.style.borderRadius='50%';
field.appendChild(ball);

let ballObj={
    posX: widthField/2,
    posY: heightField/2,
    width: widthBall,
    height: heightBall,

    update: function(){
        ball.style.transform="translateX("+this.posX+"px) translateY("+this.posY+"px) translateZ(0)";
    }
}

//count
let count=document.getElementById('countId');
count.style.cssText='font: 38px Arial, sans-serif; text-align: center';
count.style.width=widthField+'px';
let pointLeft=0; //начальный счет
let pointRight=0; //начальный счет
let countText=document.createTextNode(`${pointLeft}:${pointRight}`);
count.appendChild(countText)

//rocket  
let widthRocket;
let heightRocket;

function Rocket(rocketName){
let self=this;
widthRocket=widthField*0.015;
heightRocket=heightField*0.25;
rocketName.style.position='absolute';
rocketName.style.width=widthRocket+'px';
rocketName.style.height=heightRocket+'px';
rocketName.style.backgroundColor='#09AA57';
field.appendChild(rocketName)
self.posX=0;
self.posY=0;
self.speedY=8;

self.up=function(){
    self.posY-=self.speedY;
    if(self.posY<0){
        self.posY=0;
    }
    return self;
}
self.down=function(){
    self.posY+=self.speedY;
    if(self.posY+heightRocket>heightField){
        self.posY=heightField-heightRocket;
    }
    return self;
}
self.update=function(){
    rocketName.style.transform="translateY("+self.posY+"px) translateZ(0)";
    return self;
}
}

let rocketLeft=document.getElementById('rocketLeftId')
let left=new Rocket(rocketLeft);

let rocketRight=document.getElementById('rocketRightId')
let right=new Rocket(rocketRight);
rocketRight.style.backgroundColor='#191497';
rocketRight.style.right=0+'px';

function start(){
    play=true;
    ballObj.speedX=3;
    ballObj.speedY=2;
    ballObj.posX=widthField/2;
    ballObj.posY=heightField/2;
}

function keyDown(EO) {
    EO=EO||window.event;
    EO.preventDefault();
    if(EO.key == "ArrowUp") {
        upPressed = true;
    }
    if(EO.key == "ArrowDown") {
        downPressed = true;
    }
    if(EO.key=='Shift'){
        shiftPressed = true;
    } 
    if(EO.key=='Control'){
        ctrlPressed = true;
    }
}

function keyUp(EO) {
    EO=EO||window.event;
    EO.preventDefault();
    if(EO.key == "ArrowUp") {
        upPressed = false;
    }
    if(EO.key == "ArrowDown") {
        downPressed = false;
    }
    if(EO.key=='Shift'){
        shiftPressed = false;
    } 
    if(EO.key=='Control'){
        ctrlPressed = false;
    }
}

function tennis(){
    if(play){
        ballObj.posY+=ballObj.speedY;
    if(ballObj.posY+ballObj.height>heightField){
        ballObj.speedY=-ballObj.speedY;
        ballObj.posY=heightField-ballObj.height;
    }

    if(ballObj.posY<0){
        ballObj.speedY=-ballObj.speedY;
        ballObj.posY=0;
    }

    ballObj.posX+=ballObj.speedX;          
//правее стены      
    if (ballObj.posX+ballObj.width>=widthField){
        if(ballObj.posY+heightBall>=right.posY&&ballObj.posY<=right.posY+heightRocket){
            ballObj.posX=widthField-ballObj.width-widthRocket;
            ballObj.speedX=-ballObj.speedX;
        }else if(play===true){
            countText=`${pointLeft+=1}:${pointRight}`;
            count.innerHTML=countText;
            ballObj.speedX=0;
            ballObj.speedY=0;
            play=false;
        }         
    }

//левее стены
    if (ballObj.posX<0){
        if(ballObj.posY+heightBall>=left.posY&&ballObj.posY<=left.posY+heightRocket){
            ballObj.posX=widthRocket;
            ballObj.speedX=-ballObj.speedX;
        }else if(play===true){
            countText=`${pointLeft}:${pointRight+=1}`;
            count.innerHTML=countText
            ballObj.speedX=0;
            ballObj.speedY=0;
            play=false;
        }
    }
}

    if(upPressed) {
        right.up().update();        
    }
    if(downPressed) {
        right.update().down();
    }
    if(shiftPressed) {
        left.up().update();
    }
    if(ctrlPressed) {
        left.update().down();
    }

ballObj.update();
RAF(tennis);
}
tennis();