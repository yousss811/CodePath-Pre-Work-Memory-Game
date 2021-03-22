/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

var pattern = [2,2,4,3,2,1,2,4]; 
var progress = 0; 
var gamePlaying = false; 

function startGame(){
  progress = 0;
  gamePlaying = true; 
  
  document.getElementById("startBtn").classList.add("hidden"); 
  document.getElementById("stopBtn")
}

function stopGame(){
  gamePlaying = false; 
}