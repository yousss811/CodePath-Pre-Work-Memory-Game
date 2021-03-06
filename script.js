/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

const CLUE_HOLD_TIME = 500;
const CLUE_PAUSE_TIME = 333; 
const NEXT_CLUE_WAIT_TIME = 500;
const STRIKE_LIMIT = 3; 
const NUM_BUTTONS = 4;

var pattern;
var patternLen = 8;
var progress = 0; 
var gamePlaying = false;
var guessCounter = 0; 
var strikes = 0;

var tonePlaying = false;
var volume = .5; 

function lightButton(btn){ 
  document.getElementById("button"+btn).classList.add("lit");
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit");
}

function generatePattern(){
  pattern = []
  for(let i = 0; i < patternLen; i++){
    pattern.push(Math.floor(Math.random() * (NUM_BUTTONS) + 1));
  }
}

function changeDifficultyEasy(){
  if(gamePlaying){return;}
  patternLen = 4; 
  
  document.getElementById('mediumBtn').classList.remove("lit");
  document.getElementById('hardBtn').classList.remove("lit");
  
  document.getElementById('easyBtn').classList.add("lit");
}
function changeDifficultyMedium(){
  if(gamePlaying){return;}
  patternLen = 8; 
  
  document.getElementById("easyBtn").classList.remove("lit");
  document.getElementById('hardBtn').classList.remove("lit");
  
  document.getElementById('mediumBtn').classList.add("lit");
}
function changeDifficultyHard(){
  if(gamePlaying){return;}
  patternLen = 12; 
  
  document.getElementById("easyBtn").classList.remove("lit");
  document.getElementById('mediumBtn').classList.remove("lit");
  
  document.getElementById('hardBtn').classList.add("lit");
}


function startGame(){
  progress = 0;
  guessCounter = 0;
  strikes = 0;
  gamePlaying = true; 
  generatePattern(); 
  console.log(pattern);
    
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  playClueSequence();
}
function stopGame(){
  gamePlaying = false;
  
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
}
function loseGame(){
  stopGame(); 
  alert("Game Over. You lost.");
}
function winGame(){
  stopGame(); 
  alert("Congrats! You won.");
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn); 
    playTone(btn, CLUE_HOLD_TIME);
    setTimeout(clearButton, CLUE_HOLD_TIME, btn)
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = NEXT_CLUE_WAIT_TIME; 
  for(let i=0; i<=progress; i++){
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); 
    delay += CLUE_HOLD_TIME; 
    delay += CLUE_PAUSE_TIME; 
  }
}

function guess(btn){
  console.log("User guessed: " + btn); 
  if(!gamePlaying){
    return; 
  }
  
  if(pattern[guessCounter] == btn){
      guessCounter +=1;
    }
  else{
      if(strikes == STRIKE_LIMIT-1){
        loseGame();
      }
      else{
        strikes += 1; 
        alert("Wrong order! You now have "+ strikes + " strikes!");
        playClueSequence();
      }
      
  }
  if(guessCounter-1 == progress){
    progress += 1; 
    playClueSequence();
    if(progress == pattern.length){
      winGame();
    }
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