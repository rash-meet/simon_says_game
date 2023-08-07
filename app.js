let gameSeq = [];
let userSeq = [];
let count=0;
let hlevel=0;
let started = false;
let level = 0;
let h2 = document.querySelector('h2');
let btns = ['yellow', 'red', 'green', 'purple'];
let h21=document.createElement('h2');
document.addEventListener("keypress", function() {
    if (!started) {
        // console.log("started");
        started = true;
        levelUp();
    }
});
let bd = document.querySelector(".bd");
bd.addEventListener("click", function(event) {
    // console.dir(event.target.id);
    let cn=event.target.id;
    if (!started && (cn!= 'green' && cn!='red' && cn!='purple' && cn!='yellow')) {
        
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq=[];
    level++;

    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
        console.log("same value");
    }else{
        h2.innerHTML=`Game over!! <br> Your score was ${level} <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="antiquewhite";
        },150);
        // let h2= document.querySelector("h2");
        
        h2.insertAdjacentElement('beforebegin',h21);
        console.log(count);
        
           
        if(hlevel<level)
        {
            hlevel=level;
            h21.innerHTML=`highest score = ${hlevel}`;
           
        }
       

    //    else{
    //     if(hlevel<level)
    //     {
    //         hlevel=level;
    //         h21.innerHTML=`highest score = ${hlevel}`;
    //    }
    //    }
        count++;
        reset();
    }

}

function btnPress() {
    // console.log(this);
    let clickedBtn = this;
    userFlash(clickedBtn); 

    userBtn= this.getAttribute('id');
    userSeq.push(userBtn);
    // console.log(userBtn);
    checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    userSeq=[];
    gameSeq=[];
    level=0;
    started=false;
}