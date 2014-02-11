this.game = this.game||{};

game.soundManager = {

    isSound : null,
    isMusic : null,

    initialize: function Initialize(){
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid) {
            return;
        }
        this.isSound = true;
        this.isMusic = true;
    },
    stop: function Stop(stage){
        createjs.Sound.stop();
    },
    play: function Play(name,type){
        if((type === "sound" && game.soundManager.isSound) || (type==="music" && game.soundManager.isMusic))
            createjs.Sound.play(name);
    }

};