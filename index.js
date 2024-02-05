var ansSequential = [];
var userSequential = [];
var level =0;
var colorArray = ['red','blue','green','yellow'];
var gameStarted = false;


// event listener
$(document).on("keydown",function(event){
    // console.log(event.key);
    if((event.key === "a" || event.key === "A") && gameStarted === false) {
        gameStarted = true;
        generateNewAnsSequential();
        level=1;
        showLevel();
    }
});

$(".btn").on("click",function(){
    animatePress(this.id);
    audioPress(this.id);
    if(gameStarted){
        userSequential.push(this.id);
        checkAns();
    }
});




function generateNewAnsSequential() {   
    var colorCode = colorArray[Math.floor(Math.random()*4)];
    ansSequential.push(colorCode);
    audioPress(colorCode);
    $("#"+colorCode).fadeIn(500).fadeOut(500).fadeIn(500);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    },100);
}

function audioPress(currentColor){
    var audio = new Audio("./sounds/" + currentColor + ".mp3");
    audio.play();
}

function gameOver() {
    $("h1").text("Game Over!!! Press A to Start Again.");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }
    ,500);
    var gameOverAudio = new Audio("./sounds/wrong.mp3");
    gameOverAudio.play();
    ansSequential = []; 
    userSequential = [];
    gameStarted = false;
}

function showLevel() {
    $("h1").text("Level " + level);
}

function checkAns() {
    if(ansSequential[userSequential.length-1] !== userSequential[userSequential.length-1]) {
        gameOver();
    }
    else if(compareTwoArray(ansSequential,userSequential)){
        showLevel(++level);
        generateNewAnsSequential();
        userSequential = [];
    }
}

function compareTwoArray(ans,user) {
    for(let i=0;i<ans.length;i++) {
        if(ans[i]!==user[i]) {
            return false;
        }
    }
    return true;
}