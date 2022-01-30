// ***ChoreBot*** the goal of the game is to avoid opening doors that the chorebot is behind. 
// If you open all the doors, you win! 

//global variables 
let doorImage1;
const botDoorPath = 'images/robot.svg';
//chorebot game global variables.
let numClosedDoors = 3; 
let openDoor1, openDoor2, openDoor3; 
const closedDoorPath = 'images/closed_door.svg'
const startButton = document.getElementById('start');
let currentlyPlaying = true;

//grabbing the elements that hold the door images
doorImage1 = document.getElementById('door1');
doorImage2 = document.getElementById('door2');
doorImage3 = document.getElementById('door3');

//creating variables of images to be used in game
beachDoorPath = 'images/beach.svg';
spaceDoorPath = 'images/space.svg';

/* onclick even handler for doors */
doorImage1.onclick = () => {

if (!(isClicked(doorImage1)) && currentlyPlaying) {
  console.log('this is not clicking')
doorImage1.src = openDoor1
playDoor(doorImage1);
}
}


doorImage2.onclick = () => {
 if (!(isClicked(doorImage2)) && currentlyPlaying) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
    }
}

doorImage3.onclick = () => {
 if (!(isClicked(doorImage3)) && currentlyPlaying) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
    }
}
//this is where it all starts, invoked at the end 
function startRound() {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good Luck!'
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}


startButton.onclick = () => {
  if (!currentlyPlaying) {  //can only start a new round when game is over
  startRound();
  }
}


//reveals the winner
function gameOver(status) {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play again?';
  }
  currentlyPlaying = false;
}

/*chorebot logic*/
//randomize the door the chorebot is behind
const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * 3);

  switch(choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 2:
      openDoor3 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor1 = spaceDoorPath;
      break;
  }
}



/* making this into a game */
//determine if bot is behind door
function isBot(door) {
  if (door.getAttribute('src') === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

//without this function, people can cheat by clicking an open door to victory
function isClicked(door) {
 
 if(door.getAttribute('src') === closedDoorPath) {
   
   return false;
 } else {
  
   return true;
 }
}

//determines who wins!
function playDoor(door) {
  numClosedDoors--;

 if (numClosedDoors === 0) {
   gameOver('win');
 } else if (isBot(door)) {
    gameOver();
 }
}


//Sets the stage!  Invoked when script is loaded AND when Play Again button is clicked. 
startRound();
