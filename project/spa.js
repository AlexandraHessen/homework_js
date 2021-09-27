"use strict"
window.addEventListener("hashchange", checkIsPlay);
let play = false;
var SPAState={};

function checkIsPlay(){
  if (play){
    let changePage=confirm('При переходе на другую страницу игра будет остановлена!');
    if(changePage){
      play=false;
      switchToStateFromURLHash();
    }
  }else{
      switchToStateFromURLHash();
    }
}

function switchToStateFromURLHash() {
  var URLHash=window.location.hash;
  var stateStr=URLHash.substr(1);
  if ( stateStr!="" ) { 
    SPAState={pagename: stateStr}; 
  }
  else
    SPAState={pagename:'main'};

  var pageHTML="";
  switch ( SPAState.pagename ) {
    case 'main':
      $('.infoPage').css('transform','translateZ(0)')
      break;
    case 'rules':
          rulesPage.style.transform="translateZ(0) translateY(100vh)";
          document.getElementById("recordsPage").style.transform="translateZ(0) translateY(0)";
      break;
    case 'records':
          document.getElementById("recordsPage").style.transform="translateZ(0) translateY(100vh)";
          document.getElementById("rulesPage").style.transform="translateZ(0) translateY(0)";
      break;
  }
}

function switchToState(newState) {
  var stateStr=newState.pagename;
  location.hash=stateStr;
}

function switchToMainPage() {
  switchToState( { pagename:'main' } );
}

function switchToRulesPage() {
  if(play){
    let changePage=confirm('При переходе на другую страницу игра будет остановлена!');
    if(changePage){
      play=false;
      switchToState( { pagename:'rules'} );}
  } else{
    switchToState( { pagename:'rules'} );
  }

}

function switchToRecordsPage() {
  if(play){
    let changePage=confirm('При переходе на другую страницу игра будет остановлена!');
    if(changePage){
      play=false;
      switchToState( { pagename:'records' } );}
  } else{
    switchToState( { pagename:'records' } );
  }
  
}

switchToStateFromURLHash();

window.addEventListener('beforeunload',befUnload);
function befUnload(EO) {
  EO=EO||window.event;
  if (play){
    EO.returnValue='А у вас есть несохранённые изменения!';
  }
  
};