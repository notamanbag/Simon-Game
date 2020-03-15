var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0;

function nexsequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makesound(randomChosenColour);
}

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] == userClickedPattern[currentlevel]) {
    console.log("Sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nexsequence();
      }, 100);

    }
  } else {
    console.log("Faliure");
    var wrong = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    var bodyV = document.body;
    setTimeout(function() {
      bodyV.classList.remove('game-over');
      // body...
    }, 200);
    $("#level-title").text("Game Over, Press A to Restart");
    startover();
  }



}


function handler() {
  $('.btn').click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    makesound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

  })
}
//Audio function
function makesound(color) {
  switch (color) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      console.log("Error");
      break;
  }
}
//ANimate Function
function animatePress(currentcolor) {
  var activeButton = document.querySelector("#" + currentcolor);
  $('#' + currentcolor).addClass("pressed");
  setTimeout(function(color) {
    activeButton.classList.remove('pressed');
    // body...
  }, 10);
}


//Function called.
$(document).keydown(function(event) {
  if (event.key == "A" || event.key == "a") {
    $("#level-title").text("Level " + level);
    nexsequence();
    handler();


  }
})

function startover() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
