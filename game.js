
buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");      // store the id of the button that got clicked
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);       // after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){   // if the user got the most recent answer right
        if(userClickedPattern.length === gamePattern.length){             // check that user has finished their sequence
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];                                 // once user finished its sequence, resetting user clicked pattern to an empty array ready for the next level.
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  // adding flash to button
    playSound(randomChosenColour);
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");      // add pressed class to the button that gets clicked
    setTimeout(function(){                          // remove the pressed class after 100 ms
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



