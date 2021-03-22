/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

const CLUE_HOLD_TIME = 1000;
const CLUE_PAUSE_TIME = 333; 
const NEXT_CLUE_WAIT_TIME = 1000;

var pattern = [2,2,4,3,2,1,2,4]; 
var progress = 0; 
var gamePlaying = false;

var tonePlaying = false;
var volume = .5; 


function startGame(){
  progress = 0;
  gamePlaying = true; 
    
  document.getElementById("startBtn").classList.add("hidden");
document.getElementById("stopBtn").classList.remove("hidden");
}

function stopGame(){
  console.log("stopgame");
  gamePlaying = false;
  
  document.getElementById("stopBtn").classList.add("hidden");
document.getElementById("startBtn").classList.remove("hidden");
}


function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit");
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit");
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn); 
    playTone(btn, CLUE_HOLD_TIME);
    setTimeout(clearButton, CLUE_HOLD_TIME, btn)
  }
}

function playClueSequence(){
  let delay = NEXT_CLUE_WAIT_TIME; 
  for(let i=0; i<=progress; i++){
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); 
    delay += CLUE_HOLD_TIME; 
    delay += CLUE_PAUSE_TIME; 
  }
}






// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 446.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)