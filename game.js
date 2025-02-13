const currentNumber=document.getElementById('number');
const clearGame=document.getElementById('clearBtn');
const timeSlider=document.getElementById('timeSlider');
const playButton=document.getElementById('playBtn');
const intervalLbl = document.getElementById('intervaltime'); 
const pastNumbers=document.getElementById('pastNumbers');
const past3 = document.getElementById('pastNum'); 
const boardSelect=document.getElementById('boardSelect');
const boardImg=document.getElementById('boardImg');
const soundEvery = new Audio('https://codehs.com/uploads/157e5fe97b026657919c0ce8c715241c');
const resetSound = new Audio('https://codehs.com/uploads/a42584e1f96d94f39e3f4149a8b27848');

playButton.addEventListener("click", playPause);
timeSlider.addEventListener("change", runTimed);
clearGame.addEventListener('click', resetGame); 
boardSelect.addEventListener("change", changeBoard);

const numbers=["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14","B15",
                "I16","I17","I18","I19","I20","I21","I22","I23","I24","I25","I26","I27","I28","I29","I30",
                "N31","N32","N33","N34","N35","N36","N37","N38","N39","N40","N41","N42","N43","N44", "N45",
                "G46","G47","G48","G49","G50","G51","G52","G53","G54","G55","G56","G57","G58","G59","G60",
                "O61","O62","O63","O64","O65","O66","O67","O68","O69","O70","O71","O72","O73","O74","O75"];
let chosen=[];
let pauseCount=0;
let intervalID;



//playPause(); 


function resetGame(){
    singleTest(); 
    run1000trials(); 
    
    chosen = []; 
     currentNumber.innerText=" ";
    for(let i=0;i<numbers.length;i++){
        let num=""+numbers[i];
        document.getElementById(num).style.color= "#b8c2d1";
    }
    document.getElementById("value1").innerHTML = ""; 
    document.getElementById("value2").innerHTML = ""; 
    document.getElementById("value3").innerHTML = ""; 
    resetSound.play();
    
    printChosen(); 
    singleTest();
}

function displayPast3(){
    if(chosen.length > 3){
        document.getElementById("value1").innerHTML = chosen[chosen.length-2]; 
        document.getElementById("value2").innerHTML = chosen[chosen.length-3];
        document.getElementById("value3").innerHTML = chosen[chosen.length-4];
    } else if (chosen.length > 2){
        document.getElementById("value1").innerHTML = chosen[chosen.length-2]; 
        document.getElementById("value2").innerHTML = chosen[chosen.length-3];
    } else if (chosen.length > 1){
        document.getElementById("value1").innerHTML = chosen[chosen.length-2];
    } 
    


}

function changeBoard(){
    output = boardSelect.options[boardSelect.selectedIndex].text; 
    console.log(output);
    if(output == "C"){
        boardImg.src = "/boards/c.png"
    } else if (output == "H"){
        boardImg.src = "/boards/h.png"
    }else if (output == "S"){
        boardImg.src = "/boards/s.png"
    }else if (output == "Blackout"){
        boardImg.src = "/boards/blackout.png"
    }else if (output == "X"){
        boardImg.src = "/boards/x.png"
    }else if (output == "Plus"){
        boardImg.src = "/boards/cross.png"
    }else if (output == "Star"){
        boardImg.src = "/boards/star.png"
    }else if (output == "4 Corners"){
        boardImg.src = "/boards/fourcorners.png"
    }else if (output == "I"){
        boardImg.src = "/boards/i.png"
    }else if (output == "Checkerboard"){
        boardImg.src = "/boards/checkerboard.png"
    } else if (output == "Around the World"){
        boardImg.src = "/boards/aroundtheworld.png"
    } else {
        boardImg.src = "/boards/standard.png"
    }
}

function changeColor(){
    let num=""+chosen[chosen.length-1];
    document.getElementById(num).style.color="red";
    document.getElementById(num).style.fontWeight="bold";
  
}

function playPause(){
    if(pauseCount%2==0){
        console.log(pauseCount);
        playButton.src="/button/pause.png";
        runTimed();
        pauseCount++;
    }else{
        console.log(pauseCount);
        playButton.src="/button/play.png";
        clearInterval(intervalID); 
        intervalID = null; 
        pauseCount++;
        }
}

function runTimed(){
    clearInterval(intervalID);
    intervalID=setInterval(randomNumTest,timeSlider.value*1000);
    intervalLbl.innerText=(Math.floor(timeSlider.value) + " seconds"); 
}


function printNumbers(){
  for(let i=0;i<numbers.length;i++){
    console.log(numbers[i]);
    }  
}


function printChosen(){
    let print="";
    chosen.sort();
    for(let i=0;i<chosen.length;i++){
       print+=chosen[i]+ ", " 
    }
    console.log(print);
    console.log(chosen.length)
}

function randomNumTest(){
    let rand=Math.floor((Math.random()*75));    
    if(chosen.includes( numbers[rand])){
        randomNumTest;
    }else{
        currentNumber.innerText=numbers[rand]; 
        chosen.push(numbers[rand]);
        displayPast3();
        changeColor();
        soundEvery.play();
        console.log("sound");
    }
}


//Tests-------------------------------------------
function testRepeats(){
    for(let i=0;i<numbers.length;i++){
        let check =chosen[i]
      if(chosen.indexOf(check)!=chosen.lastIndexOf(check)){
          console.log("false - repeats");
          return false;
      }
    }
         
          return true;

}

function testSkips(){
    let cont=true;
    for(let i=0;i<numbers.length;i++){
      if(!chosen[i]==numbers[i]){
         console.log("false - skipped numbers");
         return false;
      }
    }
 
   return true;
}


function testReset(){
  randomNumTest();
  resetGame();
    if(chosen.length==0){
        return true; 
    }
}


function singleTest(){
    printChosen();
 if(testSkips){
    console.log("true-no skips");   
    }
if(testRepeats){
        console.log("true -no repeats"); 
    }
if(testReset){
    console.log("true - reset");
    }
}

function run1000trials(){
    console.log("\nOutput - Multiple Runs: ");
    let numSkips = 0; 
    let numRepeats =0; 
    let numReset = 0; 
    for(let i=0; i<1000; i++){
        randomNumTest();
        if(testSkips){
            numSkips++;
        }
        if(testRepeats){
            numRepeats++;
        }
        if(testReset){
            numReset++;
        }
    }
    
    console.log(1000 + " - total runs"); 
    console.log(numReset + " - runs reset properly"); 
    console.log(numRepeats + " - runs without repeats"); 
    console.log(1000-numRepeats + " - runs with repeats"); 
    console.log(numSkips + " - runs without skips"); 
    console.log(1000-numRepeats + " - runs with skips"); 
}
