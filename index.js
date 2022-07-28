

let buttonColours = ["red", "blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;


$(document).keydown(function (tecla) {
    if (tecla.keyCode === 65 && started === false ){
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true
         }
        });

$(".btn").click(function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    });

    


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        console.log("Success")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        console.log("wrong")
        $("#level-title").text("Game Over, Press A Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
         $("body").removeClass("game-over");
        }, 200);
        startOver();

    }

}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
        playSound(randomChosenColour);  
        animatePress(randomChosenColour);
        
}




function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour ).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + currentColour ).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour ).removeClass("pressed");
        }, 100);
    
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    
}



