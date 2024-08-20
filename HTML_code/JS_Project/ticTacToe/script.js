console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
music.loop = true;
music.play();
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        let boxes = document.getElementsByClassName("box");
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            if(turn==="0"){
                document.querySelector('.info').innerText ="Player 1 Won"
            }else{
                document.querySelector('.info').innerText ="Player 2 Won"
            }
            isgameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            boxes[e[0]].classList.add('won');
            boxes[e[1]].classList.add('won');
            boxes[e[2]].classList.add('won');
        }
    })
}

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            element.classList.add('colored');
            checkWin();
            if (!isgameover){
                if(turn==="0"){
                    document.querySelector('.info').innerText ="Player 2 Turn"
                }else{
                    document.querySelector('.info').innerText ="Player 1 Turn"
                }
            } 
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxes = document.getElementsByClassName("box");
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    Array.from(boxes).forEach(element => element.classList.remove('colored'));
    Array.from(boxes).forEach(element => element.classList.remove('won'));
})

