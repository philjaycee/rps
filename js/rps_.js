
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const addElement1 = [...document.getElementsByClassName("latarganti")];
const winBox = document.getElementById('box');
const inFo = document.getElementById("h1");
const r_user = document.getElementById('r-user');
const p_user = document.getElementById('p-user');
const s_user = document.getElementById('s-user');
const r_com = document.getElementById('r-com');
const p_com = document.getElementById('p-com');
const s_com = document.getElementById('s-com');
const refresh = document.getElementById("refresh");
const x = document.querySelector(".user-tool");
const button = document.querySelector('button');

/*
function getComputerChoice() {
  const choices = ['r','p','s'];
  const randomNumber = Math.floor(Math.random()*3);
  return choices[randomNumber]
}
*/




function resultObject() {
    winBox.classList.add('winBox'),
        inFo.setAttribute("style", "font-size:36px; color:white;");

}
function resultDraw() {
    winBox.classList.add('drawBox');
    inFo.setAttribute("style", "font-size:36px; color:white;");
}





function win(userChoice, computerChoice) {
    userScore++;
    resultObject();
    userScore_span.innerHTML =userScore;
    computerScore_span.innerHTML = computerScore;
    inFo.innerText = "Player 1 Win";

}



function lose(userChoice, computerChoice) {
    computerScore++;
    resultObject();
    userScore_span.innerHTML =userScore;
    computerScore_span.innerHTML = computerScore;
    inFo.innerText = "Com 1 Win";
}
    



function draw(userChoice, computerChoice) {
    console.log("Draw");
    resultDraw();
    inFo.innerText = "Draw";
}



class Choice {
    constructor(userChoice) {
      this.userChoice = userChoice;
      this.getComputerChoice = this.drawPcChoice();
    }
    getUserChoice = () => this.userChoice;
    getComputerChoice = () => this.getComputerChoice;
    drawPcChoice() {
      const options = ["r", "p", "s"];
  
      return options[Math.floor(Math.random() * options.length)];
    }
}
class Result {
    static whoWin(userChoice) {
      const computerChoice = this.Choice.drawPcChoice();
      if ( userChoice === "r" && computerChoice === "s" || userChoice  === "s" && computerChoice === "p" || userChoice === "p" && computerChoice === "r") return win();
      else if (userChoice === "s" && computerChoice === "r" || userChoice === "p" && computerChoice === "s" || userChoice === "r" && computerChoice === "p") return lose();
      else return draw();
    }
}





/*

class Result {
    static whoWin(userChoice, computerChoice) {
        if (userChoice === 'r' && )

    }



}




function compareHands(userChoice) {
    const computerChoice = getComputerChoice();
    if(userChoice == computerChoice){
        if(computerChoice=="r"){
            draw();
            r_com.classList.add('chosen');
            return;
        }
        if(computerChoice=="p"){
            draw();
            p_com.classList.add('chosen');
            return;
        }
        if(computerChoice=="s"){
            draw();
            s_com.classList.add('chosen');
            return;
        }
    }
    if(userChoice=="r"){
        if(computerChoice == "s"){
            lose();
            s_com.classList.add('chosen_');
            return;
        }else{
            win();
            p_com.classList.add('chosen__');
            return;
        }
    }


    if(userChoice=="p"){
        if(computerChoice == "s"){
            win();
            s_com.classList.add('chosen__');
            return;
        }else{
            lose();
            r_com.classList.add('chosen_');
            return;
        }
    }

    if(userChoice=="s"){
        if(computerChoice == "r"){
            win();
            r_com.classList.add('chosen__');
            return;
        }else{
            lose();
            p_com.classList.add('chosen_');
            return;
        }
    }
}
*/



function main() {
    r_user.addEventListener('click', function() {
        r_user.classList.add('chosen');
        whoWin('r');
        addElement1.forEach(addElement3 => {
            addElement3.setAttribute("style", "cursor: not-allowed;pointer-events: none;")
        })
    })
    p_user.addEventListener('click', function() {
        p_user.classList.add('chosen');
        whoWin('p');
        addElement1.forEach(addElement3 => {
            addElement3.setAttribute("style", "cursor: not-allowed;pointer-events: none;")
        })
        
    })
    s_user.addEventListener('click', function() {
        s_user.classList.add('chosen');
        whoWin('s');
        addElement1.forEach(addElement3 => {
            addElement3.setAttribute("style", "cursor: not-allowed;pointer-events: none;")
        })
    })
}

main();




function Refresh() {
    refresh.addEventListener('click', function () {
        addElement1.forEach(addElement2 => {
            addElement2.classList.remove('chosen')
            addElement2.classList.remove('chosen_')
            addElement2.classList.remove('chosen__')

        });
        addElement1.forEach(addElement3 => {
            addElement3.removeAttribute("style", "cursor: not-allowed;pointer-events: none;")
    
        })
        
        winBox.classList.remove('winBox');
        winBox.classList.remove('drawBox');
        inFo.removeAttribute("style", "color: ''; font-size:'' ")

        inFo.style.marginTop = null
        inFo.style.fontSize = null
        inFo.innerText = "VS"
        button.disabled = false;
})

}

Refresh();

