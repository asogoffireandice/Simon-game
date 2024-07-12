

var gamePattern = [];
var buttonColors = ["red", "blue","green","yellow"];
var userClickedpattern =[];
var level = 0;


function nextSequence(){
    userClickedpattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColors = buttonColors[randomNumber];

    $("#" + randomChosenColors).addClass("pressed");
    setTimeout(function(){
        $("#" + randomChosenColors).removeClass("pressed");
    },200);


    playsound(randomChosenColors);

    gamePattern.push(randomChosenColors);

    
        level++;
        $("h1").text("level " + level);
}

function playsound(name){
    var audio = new Audio("./sounds/" + name +".mp3");
    audio.play();

}
function startOver(){
    level = 0;
    userClickedpattern =[];
    gamePattern = [];
    spacePressed = false;

    $(document).on("keydown", function(){

        $(document).one("keydown", function(event) {
            if (event.key === " ") { // Check if the pressed key is space
                if (!spacePressed) { // Check if space hasn't been pressed before
                    spacePressed = true; // Mark space as pressed
                    nextSequence(); // Call your function
                    $("h1").text("level " + level);
                }
            }
        });
    });
    
}

function handleClick(buttonId){

    userClickedpattern.push(buttonId);
        playsound(buttonId);

        $("#" + buttonId).addClass("pressed");
        setTimeout(function(){
            $("#" + buttonId).removeClass("pressed");
        },200);

        var currentLevel = userClickedpattern.length-1;
        if(buttonId === gamePattern[currentLevel] ){
            if(userClickedpattern.length === gamePattern.length){
                setTimeout(function() {
                    nextSequence();
                }, 800);
            }
        }else{
            
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
                startOver();
            }, 1000);
            $("h1").text("Game Over. Press Spacebar to Restart.");
            
            

        }
}

$("div .btn").click(function() {
    var userChosenColor =$(this).attr("id");
    handleClick(userChosenColor);
    
});

let spacePressed = false;

$(document).on("keydown", function(){

    $(document).one("keydown", function(event) {
        if (event.key === " ") { // Check if the pressed key is space
            if (!spacePressed) { // Check if space hasn't been pressed before
                spacePressed = true; // Mark space as pressed
                nextSequence(); // Call your function
            }
        }
    });
});



// $(document).one("keydown", function(){
    
//     nextSequence();
// });


