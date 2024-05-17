$(document).ready(() => {
    const insideTimeBar = $('#insideTimeBar');
    const startGameButton = $('#startGame');
    const mainMenuDiv = $('#mainMenu');
    const catchDiv = $('#catch');
    const catchTimeBar = $('#insideCatchTimeBar');
    const scoreDiv = $('#score');
    const fishDiv = $('#fish');
    const fishImg = $('#fishImg');
    
    let gameObject = {
        time: 100,
        gameTime: null,
        score: 0
    }

    let catchBar = {
        top: 80,
        height: 20,
        upTime: null,
        downtTime: null
    };

    let catchTime = {
        bottom: 0,
        height: 0,
    };

    let fish = {
        height: 4,
        top:50,
        catch: null,
        move: null,
        timeOut: null
    }

    function mainMenu(){
        document.addEventListener('dragstart', (e) =>  e.preventDefault());
        startGameButton.on("click",() => {
            startGame()
        });

        
    }

    function startGame(){
        gameObject.gameTime = setInterval(() => {
            mainMenuDiv.css("display", "none");
            gameObject.time -= 0.03;
            insideTimeBar.css("height", gameObject.time + "%");
            if(gameObject.time <= 0){
               endGame();
            }
        },3);

        fishAi();
        fish.catch = setInterval(catchControl,1)

        document.addEventListener("mousedown",upCatchBar)
        document.addEventListener("mouseup",downCatchBar)

    }

    function catchControl(){
        if(catchBar.top < fish.top && catchBar.top + catchBar.height > fish.top + fish.height){
            if(catchTime.height >= 100){
                gameObject.score += 1;
                catchTime.height = 0;
                catchTimeBar.css("height", catchTime.height + "%");
                gameObject.time = 100;
                fish.top = 50;
                fishDiv.css("top", fish.top + "%");

                scoreDiv.text(gameObject.score);

            }
            if(catchTime.height <= 100){
                catchTime.height += 0.08;
                catchTimeBar.css("height", catchTime.height + "%");
            }
        }
    }

    function downCatchBar(){
        clearInterval(catchBar.upTime);
        catchBar.downtTime = setInterval(() => {
            if(catchBar.top < 100 - catchBar.height - 0.5){
                catchBar.top += 0.2;

            }else{
                catchBar.top = 100 - catchBar.height - 0.5;
            }
            catchDiv.css("top", catchBar.top + "%");  
        },0.01);
        
    }

    function upCatchBar(){
        clearInterval(catchBar.downtTime);
        catchBar.upTime = setInterval(() => {
            if(catchBar.top > 0) {
                catchBar.top -= 0.2;  
            }else{
                catchBar.top = 0;
            }
            catchDiv.css("top", catchBar.top + "%");
        },0.01);
    }

    function moveFish() {
        let sign = Math.random() < 0.5 ? -1 : 1;
        fishImg.css("transform", `scaleY(${-sign})`)
        let interval = setInterval(() => {
            if (fish.top > 90 || fish.top < 10) {
                sign *= -1;
                fishImg.css("transform", `scaleY(${-sign})`)
            }
            fish.top += 0.15 * sign;
            fishDiv.css("top", fish.top + "%");
        }, 1);
    
        return interval;
    }
    
    function fishAi() {
        let second = Math.floor(Math.random() * 1500) + 200;
        clearInterval(fish.move);
        fish.move = moveFish();
        fish.timeOut = setTimeout(fishAi, second);
    }
 

    function endGame() {
        
        clearInterval(gameObject.gameTime);
        clearInterval(fish.catch);
        document.removeEventListener("mousedown", upCatchBar);
        document.removeEventListener("mouseup", downCatchBar);
        mainMenuDiv.css("display", "block");
        clearInterval(fish.move)
        clearTimeout(fish.timeOut);

        startGameButton.text("Restart Game");
        
        startGameButton.on("click",() => {
            location.reload();
        });

    }

    mainMenu();
});

