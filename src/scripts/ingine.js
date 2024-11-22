const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        menu: document.getElementById("menu"),
        game: document.getElementById("game"),
        playButton: document.getElementById("play-button"),
    },

    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        life: 4,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        showMenu();
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                decreaseLife();
            }
        })
    });
}

function decreaseLife() {
    state.values.life --;
    state.view.life.textContent = `x${state.values.life}`;
    if (state.values.life <= 0) {
        alert("Game Over! Você perdeu toda a sua vida.");
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        showMenu();
    }
}

function showMenu() {
    state.view.menu.style.display = "block";
    state.view.game.style.display = "none";
}

function startGame() {
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.life = 3;
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.life.textContent = `x${state.values.life}`;
    state.view.menu.style.display = "none";
    state.view.game.style.display = "block";
   moveEnemy();
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function initialize() {
    state.view.playButton.addEventListener("click", startGame);
    addListenerHitbox();
    showMenu();

}

initialize();