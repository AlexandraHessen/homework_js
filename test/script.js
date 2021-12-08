'use strict'
var RAF=
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback)
  { window.setTimeout(callback, 1000 / 60); }
let divField=document.querySelector('.game');
let svgField=document.getElementById('svgGameId');
svgField.style.overflow='hidden';
let menuField=document.querySelector('.menu');
let clientWidth=document.documentElement.clientWidth;
let clientHeight=document.documentElement.clientHeight;
let rocketSvg; 
let ballSvg; 
let brickRect=[];
let isResize=false;
let rightPressed = false;
let leftPressed = false;
let buildScreen = function () {             
  let pageWidth = getWindowClientSize().width;
  let pageHeight = getWindowClientSize().height;
  
  if (clientWidth>=780) {
    svgField.setAttribute("width", 0.6*pageWidth);
    svgField.setAttribute("height", pageHeight);

    menuField.style.width = 0.15 * pageWidth + 'px';
    divField.style.width = 0.6 * pageWidth + 'px';  
    divField.style.height = pageHeight + 'px';
  } else {  
    svgField.setAttribute("width", pageWidth);
    svgField.setAttribute("height", 0.95*pageHeight);

    menuField.style.width = pageWidth + 'px';
    menuField.style.height = 0.05*pageHeight + 'px';
    divField.style.width = pageWidth + 'px';  
    divField.style.height = 0.95*pageHeight + 'px';
  }
}

buildScreen();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
document.addEventListener("mousemove", mouseMove);
svgField.addEventListener('touchstart', touchStartHandler, false);
svgField.addEventListener('touchmove', touchMoveHandler, false);
svgField.addEventListener('touchend', touchEndHandler, false);

let buttonControlPageJs=document.querySelectorAll('.buttonControlPage')
for (let i=0; i<buttonControlPageJs.length; i++){
  menuField.appendChild(buttonControlPageJs[i])
}
let widthField=svgField.getBoundingClientRect().width; 
let heightField=svgField.getBoundingClientRect().height;

//brickall 
function Brick(){
  let self=this;
  self.width=function(){
    let width
    if(clientWidth>=780){width=0.6*getWindowClientSize().width*0.12
    }else{width=getWindowClientSize().width*0.12}
  return width}
  self.rowCount = 4; //кол-во строк
  self.columnCount = 6; //кол-во столбцов
  self.height = heightField*0.04; //
  self.between =10; // расстояние между
  self.top = heightField*0.12; // отступ сверху
  self.left = (widthField-(self.columnCount*self.width()+(self.columnCount-1)*self.between))/2;
  let bricks = [];
  for(let r=0; r<self.rowCount; r++) {
      bricks[r] = [];
      for(let c=0; c<self.columnCount; c++) {
          bricks[r][c] = { x: 0, y: 0 };
      }
  }

  const colorArr=['#7FFF00', '#FF0000', '#FFFF14', '#9932CC', '#0000FF']
  function colorChoice(){
    return colorArr[Math.floor(Math.random() * colorArr.length)]
  }

  self.draw=function() {
  for(let r=0; r<self.rowCount; r++) {
    for(let c=0; c<self.columnCount; c++) {
      let brickX = (c*(self.width()+self.between))+self.left;
      let brickY = (r*(self.height+self.between))+self.top;
      bricks[r][c].x = brickX;
      bricks[r][c].y = brickY;
      let brickSvg=document.createElementNS("http://www.w3.org/2000/svg",'rect');
      brickSvg.setAttribute('x', brickX);
      brickSvg.setAttribute('y', brickY);
      brickSvg.setAttribute('width', self.width());
      brickSvg.setAttribute('height', self.height);
      brickSvg.setAttribute('rx', '10');
      brickSvg.setAttribute('position', 'absolute');
      brickSvg.setAttribute('id', r+''+c);
      brickSvg.setAttribute('del', 'false');
      brickSvg.style.transitionDuration='300ms';
      brickSvg.style.transitionTimingFunction='linear';
      brickSvg.style.overflow='hidden';
      
    let color=colorChoice();
    let defs = document.createElementNS("http://www.w3.org/2000/svg",'defs');
    let linearGradient = document.createElementNS("http://www.w3.org/2000/svg",'linearGradient');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('x2', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('y2', '80%');
    defs.appendChild(linearGradient);
    linearGradient.setAttribute('id', color.slice(1));

    let stop1 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
    stop1.setAttribute("offset", "2%");
    stop1.setAttribute("stop-color", "#424242");

    let stop2 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color",color);

    svgField.appendChild(defs);
    defs.appendChild(linearGradient);
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);

    brickSvg.setAttribute('fill', `url(#${color.slice(1)})`);  
    brickRect.push(brickSvg)
    svgField.appendChild(brickSvg);
    }
  }
}
self.del=function() {
  for(let i=0; i< brickRect.length; i++){
    let bx=brickRect[i].getAttribute('x');
    let by=brickRect[i].getAttribute('y');
    let id=brickRect[i].getAttribute('id');
    let del=brickRect[i].getAttribute('del');
    let b = brickRect[i];
    if (del=='false'){
      if(ball.posX+ball.radius() > b.getAttribute('x')*1 && ball.posX-ball.radius() < b.getAttribute('x')*1+self.width() && ball.posY+ball.radius() > b.getAttribute('y')*1 && ball.posY-ball.radius()<b.getAttribute('y')*1+brick.height){
        ball.speedY=-ball.speedY;
        let textElem=document.getElementById(id)
        textElem.style.height='0'; textElem.style.width='0'; textElem.style.y='0';
        brickRect[i].setAttribute('del', 'true');
        clickSound();
        scoreSvg.innerHTML=`SCORE: ${++score}`;
        if(score==brick.columnCount*brick.rowCount){
          ball.speedX=0;
          ball.speedY=0;
          document.getElementById("end").innerHTML=endGameFunc('YOU WIN !');
          play = false;
        }
      }
    }
  }
}
}
let brick=new Brick();
brick.draw();

//rocketall
function Rocket(){
let self=this;
rocketSvg=document.createElementNS("http://www.w3.org/2000/svg",'rect');
self.width=function(){
  let width
  if(clientWidth>=780){width=0.6*getWindowClientSize().width*0.3
  }else{width=getWindowClientSize().width*0.3}
  return width}
self.height=function(){
  let height
  if(clientWidth>=780){height=0.6*getWindowClientSize().width*0.015
  } else{height=getWindowClientSize().width*0.02}
  return height}
self.posX=(widthField-self.width())/2;
self.posY=heightField*0.85+self.height();
rocketSvg.setAttribute('width', self.width());
rocketSvg.setAttribute('height', self.height());
rocketSvg.setAttribute('position', 'absolute');
rocketSvg.setAttribute('rx', '30');
rocketSvg.setAttribute('fill', 'url(#Shiny)');
rocketSvg.setAttribute('id', 'rocketId');
svgField.appendChild(rocketSvg);

self.speedX=8;

self.toRight=function(){
  self.posX+=self.speedX;
  if(self.posX+self.width()>widthField){
    self.posX=widthField-self.width();
  }
  return self;
}
self.toLeft=function(){
  self.posX-=self.speedX;
  if(self.posX<0){
    self.posX=0;
  }
  return self;
}
self.update=function(){
  rocketSvg.style.transform="translateX("+self.posX+"px) translateY("+self.posY+"px) translateZ(0)";
  return self;
}
}

let rocket=new Rocket();

let defs = document.createElementNS("http://www.w3.org/2000/svg",'defs');
let radialGradient = document.createElementNS("http://www.w3.org/2000/svg",'radialGradient');
radialGradient.setAttribute('cx', '0.5');
radialGradient.setAttribute('cy', '0.5');
radialGradient.setAttribute('fx', '0.25');
radialGradient.setAttribute('fy', '0.25');
radialGradient.setAttribute('r', '0.5');
defs.appendChild(radialGradient);
radialGradient.setAttribute('id', "Shiny");

let stop1 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
stop1.setAttribute("offset", "0%");
stop1.setAttribute("stop-color", "#ffffff");

let stop2 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
stop2.setAttribute("offset", "60%");
stop2.setAttribute("stop-color",'#8CB0D4');

let stop3 = document.createElementNS("http://www.w3.org/2000/svg",'stop');
stop3.setAttribute("offset", "100%");
stop3.setAttribute("stop-color","#424242");

svgField.appendChild(defs);
defs.appendChild(radialGradient);
radialGradient.appendChild(stop1);
radialGradient.appendChild(stop2);
radialGradient.appendChild(stop3);

//ballall
function Ball(){
  let self=this;
  ballSvg=document.createElementNS("http://www.w3.org/2000/svg",'circle');
  self.radius=function(){
    let radius
    if(clientWidth>=780){radius=0.6*getWindowClientSize().width*0.02
    }else{radius=getWindowClientSize().width*0.025}
  return radius}
  ballSvg.setAttribute('r', self.radius()); 
  ballSvg.setAttribute('position', 'absolute');
  ballSvg.setAttribute('fill', 'url(#Shiny)');
  ballSvg.setAttribute("id",'ballId');
  svgField.appendChild(ballSvg);

  self.posX=widthField/2; //расположения центра мяча x
  self.posY=rocket.posY-self.radius();
  self.width=self.radius()*2;
  self.height=self.radius()*2;
  self.update= function(){
    ballSvg.style.transform="translateX("+self.posX+"px) translateY("+self.posY+"px) translateZ(0)";
  };
}
let ball=new Ball()

//score    
let score=0;
let scoreSvg=document.createElementNS("http://www.w3.org/2000/svg",'text');
scoreSvg.setAttribute('x', widthField/2);
scoreSvg.setAttribute('y', heightField*0.05);
scoreSvg.setAttribute('position', 'absolute');
scoreSvg.setAttribute('fill', '#d0e2f0');
scoreSvg.setAttribute('font-family', 'Bungee Inline');
scoreSvg.setAttribute('text-anchor', "middle");
scoreSvg.setAttribute('font-size', String(widthField*0.04));
svgField.appendChild(scoreSvg);
scoreSvg.innerHTML=`SCORE: ${score}`



function start(){
  play=true;
  ball.speedX=4;
  ball.speedY=-4;
  clickSoundInit();
}

function keyDown(EO) {
  EO=EO||window.event;
  if(EO.keyCode == 39) {
    rightPressed = true;
  }
  if(EO.keyCode == 37) {
    leftPressed = true;
    }
}

function keyUp(EO) {
    EO=EO||window.event;
    if(EO.key == "ArrowRight") {
      rightPressed = false;
    }
    if(EO.key == "ArrowLeft") {
      leftPressed = false;
    }
}

function mouseMove(EO) {
  if(EO.clientX >= divField.offsetLeft && EO.clientX <= divField.offsetLeft+widthField &&EO.clientY>=divField.offsetTop ){
    rocket.posX=EO.clientX- divField.offsetLeft;
    if(EO.clientX-divField.offsetLeft>widthField-rocket.width()){
      rocket.posX=svgField.getBoundingClientRect().width-rocket.width();   
    }
    rocket.update();
  }
}

function touchStartHandler(event) {
  if (event.touches.length ==1) {
    event.preventDefault();
  }
}

function touchMoveHandler(event) {
  if (event.touches.length == 1) {
    rocket.posX= event.touches[0].pageX - (window.innerWidth - window.innerWidth) * .5-rocket.width()/2;
    if(rocket.posX<0){
      rocket.posX=0;
    } else if(rocket.posX+rocket.width()>clientWidth){
      rocket.posX=clientWidth-rocket.width()
    }
    rocket.update();
  }
}

function touchEndHandler(event) {
  event.preventDefault();
}


function move(){
  if(isResize){
    clientWidth=document.documentElement.clientWidth;
    if(clientWidth>=780){widthField=0.6*clientWidth; 
    } else{widthField=clientWidth;}
  }

  if(play){
    ball.posY+=ball.speedY; 
  if (ball.posX<rocket.posX+rocket.width() && ball.posX>rocket.posX && rocket.posY<rocket.posY+rocket.height() && ball.posY+ball.radius()>=rocket.posY){
    ball.speedY=-ball.speedY;
  } else if(ball.posY-ball.radius()>rocket.posY+rocket.height()){
    ball.speedX=0;
    ball.speedY=0;
    document.getElementById("end").innerHTML=endGameFunc('GAME OVER !');
    play = false;
  }
  if(ball.posY-ball.radius()<0){
    ball.speedY=-ball.speedY;
  }
  ball.posX+=ball.speedX;    

  if (ball.posX+ball.radius()>=widthField){
    ball.speedX=-ball.speedX;
  }
  if (ball.posX-ball.radius()<0){
    ball.speedX=-ball.speedX;
  }
  }

  if(rightPressed) {
    rocket.toRight().update();        
  }
  if(leftPressed) {
    rocket.toLeft().update(); 
  }

  ball.update();
  rocket.update();
  brick.del();
  RAF(move);
}

move();

let endGameText='';
function endGameFunc(word){
 return endGameText=`
  <div class="endGamePageCl" id='endGamePage'>
    <h1 class="endGameWord">${word}</h1>
      <h3>
          Enter your name:
      </h3>
      <input type='text' id='IName'>
      <div id='error'>Error! Enter your name!</div>
      <input type='button' class='buttonConfirm' value='OK' onclick='check()'>
  </div>`
  }

function closeEndGamePage(){
  document.getElementById("endGamePage").style.display='none'
}

function closeInfoPage(){
  $('.infoPage').css('transform','translateZ(0)')
}

let resizeFunc = function () {    
  isResize=true;
  buildScreen();  
  resizeGame(); 
}

function getWindowClientSize() {                  
    clientWidth=document.documentElement.clientWidth;
    clientHeight=document.documentElement.clientHeight;
  return {width: clientWidth, height: clientHeight}
}

function resizeGame(){    
  rocketSvg.setAttribute('width', rocket.width());
  rocketSvg.setAttribute('height', rocket.height());
  ballSvg.setAttribute('r', ball.radius());
  
  if (clientWidth>=780){
    let widthPK=0.6*getWindowClientSize().width;
    let heightPK=getWindowClientSize().height;
    resizeAllScreen(widthPK, heightPK)
  }else{
    let widthMob=getWindowClientSize().width;
    let heightMob=0.95*getWindowClientSize().height;
    resizeAllScreen(widthMob, heightMob)
  }

  function resizeAllScreen(width, height){     
    scoreSvg.setAttribute('x', width/2);
    scoreSvg.setAttribute('font-size', String(width*0.04));
    rocket.posX=(width-rocket.width())/2;
    rocket.posY=height*0.85+rocket.height();
    ball.posX=width/2;
    ball.posY=rocket.posY-ball.radius();
      for(let i=0; i< brickRect.length; i++){
        let id = brickRect[i].getAttribute('id');
        let row = id[1];
        let column = id[0];
        brickRect[i].setAttribute('width', width*0.12);
        brickRect[i].setAttribute('height', height*0.04);
        brick.top = height*0.12
        brick.left = (width-(brick.columnCount*width*0.12+(brick.columnCount-1)*brick.between))/2;
        brickRect[i].setAttribute("x",  (row*(width*0.12+brick.between))+brick.left);
        brickRect[i].setAttribute("y",  (column*(height*0.04+brick.between))+brick.top);
    }
  }
}

window.addEventListener('resize', resizeFunc); 




//ajaxall
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var messages; // элемент массива - {name:'Иванов',mess:'Привет'};
var updatePassword;
var stringName='yakovleva_game_records';

// показывает все сообщения из messages на страницу
function showMessages() {
    var str='';
    for ( var m=0; m<messages.length; m++ ) {
        var message=messages[m];
        str+="<b>"+escapeHTML(message.name)+" : </b> "
            +escapeHTML(message.mess)+"<br />";
    }
    document.getElementById('IChat').innerHTML=str;
}

function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}

// получает сообщения с сервера и потом показывает
function refreshMessages() {
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false,
            success : readReady,
            error : errorHandler
        }
    );
}

function readReady(callresult) { // сообщения получены - показывает
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        messages=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            messages=JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
            if ( !Array.isArray(messages) )
                messages=[];
        }
        showMessages();
    }
}

// получает сообщения с сервера, добавляет новое,
// показывает и сохраняет на сервере
function sendMessage() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'LOCKGET', n : stringName,
                p : updatePassword },
            cache : false,
            success : lockGetReady,
            error : errorHandler
        }
    );
}

// GameOver YouWin Valid AJAX
let senderName;
function check(){
  if(document.getElementById('IName').value){
    senderName=document.getElementById('IName').value
    sendMessage(); 
    closeEndGamePage(); 
    switchToMainPage();
  }else{
    document.getElementById('error').style.visibility='visible';
  }
}


// сообщения получены, добавляет, показывает, сохраняет
function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        messages=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            messages=JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
            if ( !Array.isArray(messages) )
                messages=[];
        }
        var message=score;
        messages.push( { name:senderName, mess:message } );
        function compare(a,b){
          return b.mess-a.mess;
        }
        messages.sort(compare)
        if ( messages.length>10 )
          messages=messages.slice(0,10);
        showMessages();

        $.ajax( {
                url : ajaxHandlerScript,
                type : 'POST', dataType:'json',
                data : { f : 'UPDATE', n : stringName,
                    v : JSON.stringify(messages), p : updatePassword },
                cache : false,
                success : updateReady,
                error : errorHandler
            }
        );
    }
}

// сообщения вместе с новым сохранены на сервере
function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

refreshMessages();

(function($){
  $.event.special.doubletap = {
    bindType: 'touchend',
    delegateType: 'touchend',

    handle: function(event) {
      var handleObj   = event.handleObj,
          targetData  = jQuery.data(event.target),
          now         = new Date().getTime(),
          delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
          delay       = delay == null ? 300 : delay;

      if (delta < delay && delta > 30) {
        targetData.lastTouch = null;
        event.type = handleObj.origType;
        ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
          event[property] = event.originalEvent.changedTouches[0][property];
        })

        handleObj.handler.apply(this, arguments);
      } else {
        targetData.lastTouch = now;
      }
    }
  };
})(jQuery);

$('#rulesPage').on('doubletap',function(EO){
  EO.preventDefault();
  switchToMainPage()
});

$('#recordsPage').on('doubletap',function(EO){
  EO.preventDefault();
  switchToMainPage()
});

$('#endGamePage').on('doubletap',function(EO){
  EO.preventDefault();
  switchToMainPage()
  document.querySelector('#endGamePage').style.display='none';
});

let clickAudio=new Audio;
if ( clickAudio.canPlayType("audio/mpeg")=="probably" ){
  clickAudio.src="sounds/brick.mp3";
  clickAudio.type="audio/mp3";
} else{
  clickAudio.src="sounds/brick.ogg";
}

let mobile;
if ( clickAudio.canPlayType("audio/mpeg")=="maybe" ){
  mobile=true;
  clickAudio.src="sounds/brick.mp3";
  clickAudio.type="audio/mp3";
} else{
  clickAudio.src="sounds/brick.ogg";
}

function clickSoundInit() {
  clickAudio.play(); // запускаем звук
  clickAudio.pause(); // и сразу останавливаем
}

function clickSound() {
  if (!mobile){
    clickAudio.currentTime=0; // в секундах
    clickAudio.play();
  } else{
    clickAudio.load();
    clickAudio.play();
  }
}