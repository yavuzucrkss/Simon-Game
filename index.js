var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;
var maxLevel = 0;


$(document).keypress(function () {
    if (!started) { //check to game state
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    audioPlay(randomChoosenColour);
}





$(".btn").click(function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    console.log(userClickedPattern);
    audioPlay(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
                if(maxLevel < level){
                    maxLevel = level;
                    $(".h2-maxlevel").text("Max Level = " + maxLevel);
                }
        
            }, 1000);


        }
    }
    else{
        console.log("wrong");
        gameOver();
    }
}



function gameOver() {
    $("body").addClass("game-over"); 
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200)
    $("#level-title").text("Game Over !! Press Any Key to Restart ")
    started = false;
   
    level = 0;
    gamePattern = []
    userClickedPattern = [];
}

function audioPlay(id) {
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}


function animatePress(id) {
    $("#" + id).addClass("pressed");
    setTimeout(function () {
        $("#" + id).removeClass("pressed");
    }, 100)
}