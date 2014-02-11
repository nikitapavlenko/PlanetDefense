this.game = this.game||{};

(function(){
    //current stage
    var activeScreen;

    function Initialize(){
        activeScreen = null;
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", update);
    }
    function ActivateScreen(stage){
         game.screenManager.activeScreen = stage;

    }

    function update(event){
        if( game.screenManager.activeScreen != null)
            game.screenManager.activeScreen.update(event);
    }

    game.screenManager = {initialize : Initialize, activateScreen :ActivateScreen,activeScreen: activeScreen};
})();
