$(document).ready(() => {
    const insideTimeBar = $('#insideTimeBar');
    const startGameButton = $('#startGame');
    const mainMenuDiv = $('#mainMenu');
    mainMenu();
    let gameObject = {
        time: 100,
        gameTime: null
    }

    function mainMenu(){
        startGameButton.on("click",() => {
            gameObject.gameTime = setInterval(() => {
                mainMenuDiv.css("display", "none");
                gameObject.time -= 0.03;
                insideTimeBar.css("height", gameObject.time + "%");
                if(gameObject.time == 0){
                   clearInterval(gameObject.gameTime);
                }
            },3);
        });
    }
});

