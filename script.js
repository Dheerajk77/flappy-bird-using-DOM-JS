// bird ko niche girna chahiye
// key press pe bird ko jump karana
// pipes create karne hai
const bird = document.querySelector(".bird-png");
const game = document.querySelector(".game");

let birdTop = 200; // bird ek specific position pe hoga
let gravity = 2; // matlab apne position se gravity ke according girega

// bird continously niche girega isiliye set interval use kiya
setInterval(function () {
  // if(gameOver){
  //   return
  // }
  birdTop += gravity;
  bird.style.top = birdTop + "px"; // px---> se pixel me convert kiya hai

  if(birdTop>game.clientHeight || birdTop<0 ){
    gameOver()
  }


}, 20);

// key press pe bird ko jump karana
document.addEventListener("keydown", (e) => {
  // jab bhi space press hoga tab bird up hoga
  if (e.code === "Space") {
    birdTop = birdTop - 60;
  }
});

// pipes create karne hai

function createPipe() {
  if(isGameOver){
    return;
  }

  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");
  pipeTop.className = "pipe";
  pipeBottom.className = "pipe";

  let gap = 100;

  let gameHeight = game.clientHeight;

  let maxHeight = gameHeight - gap - 70;

  let topPipeHeight = Math.random() * maxHeight + 50; // 50 isliye add kiya kyuki agar mera random se 0 mila to multiply karne par bhi 0 rehta . thats why we add 50
  let bottomPipeHeight = maxHeight - topPipeHeight - gap;

  pipeTop.style.height = topPipeHeight + "px";
  pipeBottom.style.height = bottomPipeHeight + "px";

  pipeTop.style.top = 0;
  pipeBottom.style.bottom = 0;

  game.append(pipeTop, pipeBottom);

  let pipeLeft = game.clientWidth;

  pipeTop.style.left = pipeLeft + "px";
  pipeBottom.style.left = pipeLeft + "px";




  let move = setInterval(() => {
    pipeLeft -= 2;
    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";

    // collision wala part
    let birdRect = bird.getBoundingClientRect();
    let TopRect = pipeTop.getBoundingClientRect();
    let BottomRect = pipeBottom.getBoundingClientRect();
    if(birdRect.right > TopRect.left && birdRect.left < TopRect.right && (birdRect.top < TopRect.bottom || birdRect.bottom > BottomRect.top)){
      gameOver();
      clearInterval(move)
    }


    if(pipeLeft < -40){
      pipeTop.remove()
      pipeBottom.remove()
      clearInterval(move)
    }
  }, 20);


}

setInterval(createPipe, 2000);




let isGameOver = false;
function gameOver(){
  if(isGameOver){
    return;
  } else{
    isGameOver = true;
    alert('Your Game is Over')
    location.reload()
  }
}