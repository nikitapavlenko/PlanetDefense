this.game = this.game||{};

(function(){
    //container
    var _stage;
    //texture
    var _background;
    var _logo;
    // private buttons
    var _playBtn;
    var _settingsBtn;
    var _musicBtn;
    var _soundBtn;
    var _returnBtn;
    var _creditBtn;

    //text
    var _devText;
    var _devAuthorText1;
    var _devAuthorText2;
    var _artText;
    var _artAuthorsText;

    var w,h;

    // public for first time
    function initialize(){
        //сцена
        _stage = new createjs.Stage("Canvas");
        _stage.enableMouseOver(10);
        w = _stage.canvas.width;
        h = _stage.canvas.height;
        // фон
        _background = new createjs.Bitmap(game.loader.preload.getResult("backMenu"));
        // логотип
        _logo = new createjs.Bitmap(game.loader.preload.getResult("logoMenu"));

        //кнопка играть
        _playBtn =  new createjs.Bitmap(game.loader.preload.getResult("btnPlay"));
        _playBtn.x = w/2-40;
        _playBtn.y = 380;
        _playBtn.regX = 155;
        _playBtn.regY = 80;
        _playBtn.addEventListener("click",onBtnPlayClick);
        _playBtn.addEventListener("mouseover",function(e){_playBtn.scaleX+=0.05;_playBtn.scaleY+=0.05;});
        _playBtn.addEventListener("mouseout",function(e){_playBtn.scaleX-=0.05;_playBtn.scaleY-=0.05;});

         // кнопка настройки
        _settingsBtn =  new createjs.Bitmap(game.loader.preload.getResult("btnSettings"));
        _settingsBtn.x = w/2+155+10;
        _settingsBtn.y = 385;
        _settingsBtn.regX = 400;
        _settingsBtn.regY = 400;
        _settingsBtn.scaleX = 0.35;
        _settingsBtn.scaleY = 0.35;
        _settingsBtn.addEventListener("click",onBtnSettingsClick);
        _settingsBtn.addEventListener("mouseover",function(e){_settingsBtn.scaleX+=0.05;_settingsBtn.scaleY+=0.05;});
        _settingsBtn.addEventListener("mouseout",function(e){_settingsBtn.scaleX-=0.05;_settingsBtn.scaleY-=0.05;});

        // кнопка музыка
        _musicBtn = new createjs.Bitmap(game.loader.preload.getResult("btnMusic"));
        _musicBtn.x = w/2-80;
        _musicBtn.y = h/2-80;
        _musicBtn.regX = 400;
        _musicBtn.regY = 400;
        _musicBtn.scaleX = 0.4;
        _musicBtn.scaleY = 0.4;
        _musicBtn.addEventListener("click",onBtnMusicClick);
        _musicBtn.addEventListener("mouseover",function(e){_musicBtn.scaleX+=0.05;_musicBtn.scaleY+=0.05;});
        _musicBtn.addEventListener("mouseout",function(e){_musicBtn.scaleX-=0.05;_musicBtn.scaleY-=0.05;});
        _musicBtn.alpha = 0;

         // кнопка звук
        _soundBtn = new createjs.Bitmap(game.loader.preload.getResult("btnSound"));
        _soundBtn.x = w/2+80;
        _soundBtn.y = h/2-80;
        _soundBtn.regX = 400;
        _soundBtn.regY = 400;
        _soundBtn.scaleX = 0.4;
        _soundBtn.scaleY = 0.4;
        _soundBtn.addEventListener("click",onBtnSoundClick);
        _soundBtn.addEventListener("mouseover",function(e){_soundBtn.scaleX+=0.05;_soundBtn.scaleY+=0.05;});
        _soundBtn.addEventListener("mouseout",function(e){_soundBtn.scaleX-=0.05;_soundBtn.scaleY-=0.05;});
        _soundBtn.alpha = 0;

        // кнопка об авторах
        _creditBtn= new createjs.Bitmap(game.loader.preload.getResult("btnCredit"));
        _creditBtn.x = w/2;
        _creditBtn.y = h/2+80;
        _creditBtn.regX = 155;
        _creditBtn.regY = 80;
        _creditBtn.addEventListener("click",onBtnCreditClick);
        _creditBtn.addEventListener("mouseover",function(e){_creditBtn.scaleX+=0.05;_creditBtn.scaleY+=0.05;});
        _creditBtn.addEventListener("mouseout",function(e){_creditBtn.scaleX-=0.05;_creditBtn.scaleY-=0.05;});
        _creditBtn.alpha = 0;

        // кнопка назад
        _returnBtn = new createjs.Bitmap(game.loader.preload.getResult("btnReturn"));
        _returnBtn.x = -160;
        _returnBtn.y = 400;
        _returnBtn.regX = 400;
        _returnBtn.regY = 400;
        _returnBtn.scaleX = 0.2;
        _returnBtn.scaleY = 0.2;
        _returnBtn.addEventListener("click", onBtnReturnClick);
        _returnBtn.addEventListener("mouseover",function(e){_returnBtn.scaleX+=0.05;_returnBtn.scaleY+=0.05;});
        _returnBtn.addEventListener("mouseout",function(e){_returnBtn.scaleX-=0.05;_returnBtn.scaleY-=0.05;});
        _returnBtn.alpha = 0;

         //описание авторов
        _devText = new createjs.Text("Development & Game design :");
        _devText.x = w+100;
        _devText.y = h/2 - 150;
        _devText.font = "bold 24px Bangers";
        _devText.color = "white";
        _devText.alpha = 0;

        _devAuthorText1 =  new createjs.Text("Pavlenko Nikita");
        _devAuthorText1.x = w+100;
        _devAuthorText1.y = h/2 - 50;
        _devAuthorText1.font = "bold 24px Bangers";
        _devAuthorText1.color = "white";
        _devAuthorText1.alpha = 0;

        _devAuthorText2 =  new createjs.Text("Posashkov Vlad");
        _devAuthorText2.x = w+100;
        _devAuthorText2.y = h/2 + 50;
        _devAuthorText2.font = "bold 24px Bangers";
        _devAuthorText2.color = "white";
        _devAuthorText2.alpha = 0;

        _artText = new createjs.Text("Art: ");
        _artText.y = h/2 - 150;
        _artText.font = "bold 24px Bangers";
        _artText.color = "white";
        _artText.x = -100;
        _artText.alpha = 0;

        _artAuthorsText = new createjs.Text("Silich Denis");
        _artAuthorsText.y = h/2 - 50;
        _artAuthorsText.alpha = 0;
        _artAuthorsText.font = "bold 24px Bangers";
        _artAuthorsText.color = "white";
        _artAuthorsText.x = -100;

        _stage.addChild(_background,_logo,_playBtn,_settingsBtn);

        _stage.addChild(_musicBtn);
        _stage.addChild(_returnBtn);
        _stage.addChild(_soundBtn);
        _stage.addChild(_creditBtn);

        _stage.addChild(_devText,_devAuthorText1,_devAuthorText2,_artText,_artAuthorsText);

        createjs.Tween.get(_logo, {loop:true})
            .to({x : 5,y : 5}, 600,createjs.Ease.quadIn)
            .to({x : 0,y : 0}, 700,createjs.Ease.quadOut);

        game.menuScreen.stage = _stage;
        game.screenManager.activateScreen(_stage);

        game.soundManager.play("music","music");
    }

    function onBtnPlayClick(e){

        game.soundManager.play("begin","sound");
        game.gameScreen.initialize();
        game.screenManager.activateScreen(game.gameScreen.stage);
    }
    function onBtnSettingsClick(e){
        game.soundManager.play("begin","sound");
        createjs.Tween.get(_playBtn).to({alpha:0},200,createjs.Ease.quadOut);
        createjs.Tween.get(_settingsBtn).to({alpha:0},200,createjs.Ease.quadOut);
        createjs.Tween.get(_logo).to({image : game.loader.preload.getResult("logoMenuDark")},200,createjs.Ease.quadOut);

        createjs.Tween.get(_musicBtn).to({alpha:1},400,createjs.Ease.quadIn);
        createjs.Tween.get(_soundBtn).to({alpha:1},400,createjs.Ease.quadIn);
        createjs.Tween.get(_creditBtn).to({alpha:1},400,createjs.Ease.quadIn);
        createjs.Tween.get(_returnBtn).to({alpha:1,x:100},600,createjs.Ease.quadIn);
    }
    function onBtnSoundClick(e){
        game.soundManager.isSound = !game.soundManager.isSound;
        if(_soundBtn.image===game.loader.preload.getResult("btnSound")){
            createjs.Tween.get(_soundBtn).to({image:game.loader.preload.getResult("btnNoSound")},200,createjs.Ease.quadIn);
        }
        else{
            createjs.Tween.get(_soundBtn).to({image:game.loader.preload.getResult("btnSound")},200,createjs.Ease.quadIn);
        }
    }
    function onBtnMusicClick(e){
        game.soundManager.isMusic = !game.soundManager.isMusic;
        if(game.soundManager.isMusic===false) game.soundManager.stop();
        else game.soundManager.play("music","music");
        if(_musicBtn.image===game.loader.preload.getResult("btnMusic")){
            createjs.Tween.get(_musicBtn).to({image:game.loader.preload.getResult("btnNoMusic")},200,createjs.Ease.quadIn);
        }
        else{
            createjs.Tween.get(_musicBtn).to({image:game.loader.preload.getResult("btnMusic")},200,createjs.Ease.quadIn);
        }
    }

    function onBtnCreditClick(e){
        game.soundManager.play("begin","sound");

        createjs.Tween.get(_musicBtn).to({alpha:0},200,createjs.Ease.quadOut);
        createjs.Tween.get(_soundBtn).to({alpha:0},200,createjs.Ease.quadOut);
        createjs.Tween.get(_creditBtn).to({alpha:0},200,createjs.Ease.quadOut);

        createjs.Tween.get(_devAuthorText1).to({alpha:1,x:100},1100,createjs.Ease.bounceOut);
        createjs.Tween.get(_devAuthorText2).to({alpha:1,x:100},1100,createjs.Ease.bounceOut);
        createjs.Tween.get(_devText).to({alpha:1,x:100},1100,createjs.Ease.bounceOut);

        createjs.Tween.get(_artAuthorsText).to({alpha:1,x:w/2+150},1100,createjs.Ease.bounceOut);
        createjs.Tween.get(_artText).to({alpha:1,x:w/2+150},1100,createjs.Ease.bounceOut);

        _returnBtn.removeEventListener("click",onBtnReturnClick);
        _returnBtn.addEventListener("click",onBtnCreditReturnClick);
    }

    function onBtnCreditReturnClick(){
        game.soundManager.play("begin","sound");

        createjs.Tween.get(_musicBtn).to({alpha:1},400,createjs.Ease.quadIn);
        createjs.Tween.get(_soundBtn).to({alpha:1},400,createjs.Ease.quadIn);
        createjs.Tween.get(_creditBtn).to({alpha:1},400,createjs.Ease.quadIn);

        createjs.Tween.get(_devAuthorText1).to({alpha:0,x:w+100},200,createjs.Ease.quadOut);
        createjs.Tween.get(_devAuthorText2).to({alpha:1,x:w+100},200,createjs.Ease.quadOut);
        createjs.Tween.get(_devText).to({alpha:0,x:w+100},200,createjs.Ease.quadOut);

        createjs.Tween.get(_artAuthorsText).to({alpha:0,x:-100},600,createjs.Ease.quadOut);
        createjs.Tween.get(_artText).to({alpha:0,x:-100},600,createjs.Ease.quadOut);

        _returnBtn.removeEventListener("click",onBtnCreditReturnClick);
        _returnBtn.addEventListener("click",onBtnReturnClick);
    }
    function onBtnReturnClick(e){
        game.soundManager.play("begin","sound");
        createjs.Tween.get(_playBtn).to({alpha:1},400,createjs.Ease.quadIn);
        createjs.Tween.get(_settingsBtn).to({alpha:1},400,createjs.Ease.quadIn);
        createjs.Tween.get(_logo).to({image : game.loader.preload.getResult("logoMenu")},400,createjs.Ease.quadIn);

        createjs.Tween.get(_musicBtn).to({alpha:0},200,createjs.Ease.quadOut);
        createjs.Tween.get(_soundBtn).to({alpha:0},200,createjs.Ease.quadOut);
        createjs.Tween.get(_creditBtn).to({alpha:0},200,createjs.Ease.quadOut);
        createjs.Tween.get(_returnBtn).to({alpha:0,x:-160},600,createjs.Ease.quadOut);
    }

    game.menuScreen = { initialize: initialize, stage : _stage};
})();