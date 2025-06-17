let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game Started");
        started = true;
    }

    levelUp();
});

function gameflash(btn) {
    btn.classList.add("flash");

    setTimeout(function() {
        btn.classList.remove("flash")
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(function() {
        btn.classList.remove("userflash")
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    let gameColor = randBtn.getAttribute("id");

    gameSeq.push(gameColor);
    console.log(gameSeq);
    gameflash(randBtn);
}

function cheakAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp(), 1000);
        }
    } else {
        h2.innerHTML = `Game Over Your Score was <b>${level}</b> <br>Press any key to Start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"
        }, 150);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    cheakAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}