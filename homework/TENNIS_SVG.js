let fieldWidth=500; //ширина поля
let fieldHeight=300; //высота поля
var RAF=
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback)
    { window.setTimeout(callback, 1000 / 60); }
let play = false;
let upPressed = false;
let downPressed = false;
let shiftPressed = false;
let ctrlPressed = false;
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

let svg=document.createElementNS("http://www.w3.org/2000/svg", 'svg');
svg.setAttribute('width', fieldWidth);
svg.setAttribute('height', fieldHeight);
document.body.appendChild(svg);

//field
let field=document.createElementNS("http://www.w3.org/2000/svg", 'rect');
field.setAttribute('width', fieldWidth);
field.setAttribute('height', fieldHeight);
field.setAttribute('fill', '#F0EE7E');
field.setAttribute('stroke', '#000');
field.setAttribute('position', 'relative')
svg.appendChild(field);

//ball
let ballSvg;
function Ball(){
let self=this;
ballSvg=document.createElementNS("http://www.w3.org/2000/svg",'circle');
self.radius=fieldWidth*0.025;
ballSvg.setAttribute('r', self.radius); 
ballSvg.setAttribute('position', 'absolute');
ballSvg.setAttribute('fill', '#F02137');
ballSvg.setAttribute("id",'ballId');
svg.appendChild(ballSvg);

self.posX=fieldWidth/2; //расположения центра мяча x
self.posY=fieldHeight/2;
self.width=self.radius*2;
self.height=self.radius*2;
self.update= function(){
    ballSvg.style.transform="translateX("+self.posX+"px) translateY("+self.posY+"px) translateZ(0)";
};
}
let ball=new Ball();
ball.update();

//rocket
function Rocket(rocketName, color){
let self=this;
rocketName=document.createElementNS("http://www.w3.org/2000/svg", 'rect');
self.width=fieldWidth*0.015;
self.height=fieldHeight*0.25;
rocketName.setAttribute('width', self.width);
rocketName.setAttribute('height', self.height);
rocketName.setAttribute('x', 0);
rocketName.setAttribute('y', 0);
rocketName.setAttribute('fill', color);
rocketName.setAttribute('position', 'absolute');
rocketName.setAttribute('id', color);
svg.appendChild(rocketName);

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
    if(self.posY+self.height>fieldHeight){
        self.posY=fieldHeight-self.height;
    }
    return self;
}
self.update=function(){
    rocketName.style.transform="translateY("+self.posY+"px) translateZ(0)";
    return self;
}


}

let rocketLeft;
let rocketRight;
let left=new Rocket(rocketLeft, '#09AA57');
let right=new Rocket(rocketRight, '#191497');
rocketRight=document.getElementById('#191497');
rocketRight.setAttribute('x', fieldWidth-right.width);

//count
let count=document.getElementById('countId');
count.style.cssText='font: 38px Arial, sans-serif; text-align: center';
count.style.width=fieldWidth+'px';
let pointLeft=0; //начальный счет
let pointRight=0; //начальный счет
let countText=document.createTextNode(`${pointLeft}:${pointRight}`);
count.appendChild(countText);

function start(){
    play=true;
    ball.speedX=3;
    ball.speedY=2;
    ball.posX=fieldWidth/2;
    ball.posY=fieldHeight/2;
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

function move(){
    if(play){
        ball.posY+=ball.speedY;
    if(ball.posY+ball.radius>fieldHeight){
        ball.speedY=-ball.speedY;
        ball.posY=fieldHeight-ball.radius;
    }

    if(ball.posY-ball.radius<=0){
        ball.speedY=-ball.speedY;
        ball.posY=ball.radius;
    }

    ball.posX+=ball.speedX;          
//правее стены      
    if (ball.posX+ball.radius>=fieldWidth){
        if(ball.posY+ball.radius>=right.posY&&ball.posY<=right.posY+right.height){
            ball.posX=fieldWidth-ball.radius-right.width;
            ball.speedX=-ball.speedX;
        }else if(play===true){
            countText=`${pointLeft+=1}:${pointRight}`;
            count.innerHTML=countText;
            ball.speedX=0;
            ball.speedY=0;
            play=false;
        }         
    }

//левее стены
    if (ball.posX-ball.radius<=0){
        if(ball.posY>=left.posY&&ball.posY<=left.posY+left.height){
            ball.posX=left.width+ball.radius;
            ball.speedX=-ball.speedX;
        }else if(play===true){
            countText=`${pointLeft}:${pointRight+=1}`;
            count.innerHTML=countText
            ball.posX=ball.radius;
            ball.speedX=0;
            ball.speedY=0;
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

ball.update();
RAF(move);
}
move();
