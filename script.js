/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

var pattern = [2,2,4,3,2,1,2,4]; 
var progress = 0; 
var gamePlaying = false; 

function startGame(){
  progress = 0;
  gamePlaying = true; 
    
  document.getElementById("startBtn").style.visibility="hidden"; 
  document.getElementById("stopBtn").style.visibility="visible"; 
}

function stopGame(){
  console.log("stopgame");
  gamePlaying = false;
  
  document.getElementById("startBtn").style.visibility="visible"; 
  document.getElementById("stopBtn").style.visibility="hidden"; 
}