this.game = this.game||{};
(function(){
    //container
    var _stage;
    //texture
    var _background;
    //progress
    var _loadLabel;
    // height
    var h;
    // width
    var w;
    // public for first time
    function initialize(){
        _stage = new createjs.Stage("Canvas");
        w = _stage.canvas.width;
        h = _stage.canvas.height;
        // Create background
        _background = new createjs.Bitmap("assets/img/loadBack.png");
        _loadLabel = new createjs.Bitmap("assets/img/loadLabel.png");
        _loadLabel.x = 350;
        _loadLabel.y = 390;
        _loadLabel.rexX = 130;
        _loadLabel.regY = 62;

        _stage.addChild(_background,_loadLabel);

        game.loadingScreen.stage = _stage;
    }

    // public for progressEvent
    function progressHandler(){
        if(!_loadLabel.hasActiveTweens)
            createjs.Tween.get(_loadLabel, {loop:true})
                .to({scaleX : 1.05,scaleY : 1.05}, 1000)
                .to({scaleX : 1,scaleY : 1}, 1000);
    }
    game.loadingScreen = { initialize: initialize, handleProgress: progressHandler, stage : _stage};
})();

