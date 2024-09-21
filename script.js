let colorSeq = [];
let userSeq = [];
let blocks = ["btn1", "btn2", "btn3", "btn4"];
let highScore = 0;

let startbtn = document.querySelector(".startbtn");
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
let body = document.querySelector("body");
let h3 =document.querySelector("h3");

let start = false;
let level = 0;

startbtn.addEventListener("click", function(){
    if(start == false){
        start = true;
        levelUp();

        for(btn of btns){
            btn.addEventListener("click", buttonPress);
        }
        removeScoreBar();
    }
});

function levelUp(){
    userSeq = [];
    level+=1;
    h2.innerText = `Level ${level}`;

    let randindx = Math.floor(Math.random() * blocks.length)
    let randblock = document.querySelector(`.${blocks[randindx]}`);
    colorSeq.push(randblock);

    setTimeout(flash, 700);
};


function userBlockFlash(block){
        block.classList.add("flash");
        setTimeout(function(){
        block.classList.remove("flash");
    },250);
};

function buttonPress(){
    userBlockFlash(this);
    let user = this.getAttribute("id");
    userSeq.push(user);

    checkSeq(userSeq.length - 1);

};

function checkSeq(indx){

        if(colorSeq[indx].id === userSeq[indx]){
            if(colorSeq.length == indx + 1){
                levelUp();
            }

        }
        else{
            h2.innerText = `GAME OVER ! Press START`;
            gameOver();
        }
}

function gameOver(){

    colorSeq = [];
    userSeq = [];
    start = false;

    if(highScore<level){
        highScore = level;
    }
    h3.innerText = `High Score : ${highScore}`
    let score = document.createElement("h3");
    score.classList.add("headings");
    score.id = "score";

    score.append(`YOUR SCORE : ${level}`);
    body.append(score);

    level = 0; 

    for(btn of btns){
        btn.classList.add("overflash");
    };
    setTimeout(function(){
        for(btn of btns){
            btn.classList.remove("overflash");
        };
    }, 350);
}

function removeScoreBar(){
    let score = document.querySelector("#score");
    if(score){
        score.remove();
    }
}

async function flash(){
    document.body.style.pointerEvents = 'none';//disable all event listeners
    for(color of colorSeq){
        await blockFlash(color);
    };
    document.body.style.pointerEvents = 'auto';// enable all event listeners
};


function blockFlash(block) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            //block.classList.remove("flash");
            setTimeout(() => {
                block.classList.add("flash");
                
                setTimeout(() => {
                    block.classList.remove("flash");
                    resolve();
                }, 250);

            }, 150);

        }, 250);
    });
}
