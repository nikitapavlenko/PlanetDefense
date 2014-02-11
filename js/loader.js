this.game = this.game||{};

(function(){
    //public loader
    var preload;

    //private manifest
    var _manifest = [
        // Логотипы//////
        {src:"assets/img/logo.png", id:"logoMenu"},     // логотип в меню
        {src:"assets/img/logoDark.png", id:"logoMenuDark"}, // логотип темный

        /* кнопки/////////////////////////////*/
        {src:"assets/img/btnPlay.png", id:"btnPlay"},
        {src:"assets/img/btnSettings.png", id:"btnSettings"},
        {src:"assets/img/btnMusic.png", id:"btnMusic"},
        {src:"assets/img/btnNoMusic.png", id:"btnNoMusic"},
        {src:"assets/img/btnNoSound.png", id:"btnNoSound"},
        {src:"assets/img/btnSound.png", id:"btnSound"},
        {src:"assets/img/btnCredit.png", id:"btnCredit"},
        {src:"assets/img/btnBack.png", id:"btnReturn"},
        //GameScreen
        {src:"assets/img/gameScreen/btnMenu.png", id:"btnMenu"},
        {src:"assets/img/gameScreen/btnMainMenu.png", id:"btnMainMenu"},
        {src:"assets/img/gameScreen/btnRestart.png", id:"btnRestart"},
        {src:"assets/img/gameScreen/btnContinue.png", id:"btnContinue"},
        //////////////////////////

        // Задние фоны  //////////////
        {src:"assets/img/menuBack.png", id:"backMenu"},
        {src:"assets/img/gameBack.png", id:"backGame"},

         // спрайты для игры /////////////
        //враги
        {src:"assets/img/gameScreen/enemy1.png", id:"enemy1"},
        {src:"assets/img/gameScreen/enemy2.png", id:"enemy2"},
        {src:"assets/img/gameScreen/enemy3.png", id:"enemy3"},
        {src:"assets/img/gameScreen/enemy4.png", id:"enemy4"},
        // игрок
        {src:"assets/img/gameScreen/player.png", id:"player"},
        // пуля
        {src:"assets/img/gameScreen/bullet.png", id:"bullet"},
        // взрыв
        {src:"assets/img/gameScreen/explosion.png", id:"explosion"},
        //выстрел
        {src:"assets/img/gameScreen/gun.png", id:"gun"},
        //огонь во время полета
        {src:"assets/img/gameScreen/fire.png", id:"fire"},


        // музыка///////////////////////////
        {id:"begin", src:"assets/snd/Game-Spawn.mp3|assets/snd/Game-Spawn.ogg"},
        {id:"break", src:"assets/snd/Game-Break.mp3|assets/snd/Game-Break.ogg", data:6},
        {id:"death", src:"assets/snd/Game-Death.mp3|assets/snd/Game-Death.ogg"},
        {id:"laser", src:"assets/snd/Game-Shot.mp3|assets/snd/Game-Shot.ogg", data:6},
        {id:"music", src:"assets/snd/18-machinae_supremacy-lord_krutors_dominion.mp3|assets/snd/18-machinae_supremacy-lord_krutors_dominion.ogg"}
    ];

    function Initilize(){
        preload = new createjs.LoadQueue(true);
        preload.installPlugin(createjs.Sound);
        game.loader.preload = preload;

    }

    function SetHandleComplete(func){
        preload.addEventListener("complete", func);

    }
    function SetHandleProgress(func){
        preload.addEventListener("progress", func);
    }
    //public for loading queue
    function LoadFiles(){
        preload.loadManifest(_manifest);
    }

    game.loader = { loadFiles : LoadFiles,
                    initialize: Initilize,
                    setHandleComplete : SetHandleComplete,
                    setHandleProgress : SetHandleProgress,
                    preload: preload };
})();
