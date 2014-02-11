this.game = this.game||{};

(function(){

    //container
    var _stage = null;
    //texture
    var _background = null;
    // private buttons
    var _menuBtn = null;

    // находится ли игра в режиме паузы
    var isPause = false;

    // array of text objects
    var texts_array = null;
    //array of text background objects
    var texts_background_array = null;
    //array of enemy ships
    var enemy_array = null;

    var w;   // width
    var h;   // height


    var score = null;


    var btnMainMenu;
    var btnContinue;
    var btnRestart;

    // array of active bullets on the screen
    var bullets;

    // спрайт корабля игрока
    var player = null;

    // текстовая анимация номера раунда
    var round = null;

    // Текущее слово
    var currentWord = null;


    // data for game
    var data = {
        words : null,        // слова для раунда
        currentRound: null, // номер текущего раунда
        score: null,       //счет игрока
        currentWord: null, // текущее слово
        min_time: null, // минимальное время, за которое астероид доходит до планеты
        max_time: null  // максимальное время, ...
    }


    // public for first time
    function Initialize(){
        //container
         _stage = null;
        //texture
        _background = null;
        // private buttons
        _menuBtn = null;

        // находится ли игра в режиме паузы
        isPause = false;

        // array of text objects
        texts_array = null;
        //array of text background objects
        texts_background_array = null;
        //array of enemy ships
        enemy_array = null;

        score = null;

        // спрайт корабля игрока
        player = null;

        // текстовая анимация номера раунда
        round = null;

        // Текущее слово
        currentWord = null;


        // data for game
        data = {
            words : null,        // слова для раунда
            currentRound: null, // номер текущего раунда
            score: null,       //счет игрока
            currentWord: null, // текущее слово
            min_time: null, // минимальное время, за которое астероид доходит до планеты
            max_time: null  // максимальное время, ...
        }


        _stage = new createjs.Stage("Canvas");
        _stage.enableMouseOver(10);
        // grab canvas width and height for later calculations:
        w = _stage.canvas.width;
        h = _stage.canvas.height;
        // фон
        _background = new createjs.Bitmap(game.loader.preload.getResult("backGame"));
        _stage.addChild(_background);
        createjs.Ticker.addEventListener("tick", update);
        // начинаем новую игру
        restart();
        // делаем экран активным
        game.gameScreen.stage = _stage;
        // вешаем обработчик события
        document.onkeypress = keyPressedHandler;
    }

    function update(event){
        if(!isPause){  // если игра не находится в режиме паузы
            score.text = "Score : "+ data.score.toString();
            if(enemy_array != null) {  // если это не первый запуск игры
                if(enemy_array.length === 0){ // если на сцене закончились противники
                    enemy_array = null; // обнуляем массив противников
                    texts_array = null; // обнуляем массив слов
                    texts_background_array = null;
                    data.currentRound++; // раунд окончен, инкрементируем раунд
                    initializeNewRound(data.currentRound); // стартуем следующий раунд

                }
                else{
                    for(var i = 0; i < enemy_array.length;i++){
                        if(enemy_array[i].x === player.x && enemy_array[i].y === player.y){
                             GameOver();
                             break;
                        }
                    }
                }
            }
        }
    }


    function restart(){
        //создаем новые данные для игры
        data.currentRound = 1;
        data.score = 0;
        data.currentWord = null;
        data.min_time = 15000;
        data.max_time = 20000;
        // очистили пули
        bullets = new Array(0);
        // создали новый раунд
        initializeNewRound(data.currentRound);
        if(score === null)
            score = new createjs.Text("Score : " + data.score.toString());
            score.font = "bold 36px Bangers";
            score.color = "white";
            score.x = 0;
            score.y = 0;
            _stage.addChild(score);
        if(_menuBtn === null){
            _menuBtn =  new createjs.Bitmap(game.loader.preload.getResult("btnMenu"));
            _menuBtn.x = w - 50;
            _menuBtn.y = 50;
             _menuBtn.scaleX = 0.3;
            _menuBtn.scaleY = 0.3;
            _menuBtn.regX = 100;
            _menuBtn.regY = 100;
            _menuBtn.addEventListener("click",onBtnMenuClick);
            _menuBtn.addEventListener("mouseover",function(e){_menuBtn.scaleX+=0.05;_menuBtn.scaleY+=0.05;});
            _menuBtn.addEventListener("mouseout",function(e){_menuBtn.scaleX-=0.05;_menuBtn.scaleY-=0.05;});
            _stage.addChild(_menuBtn);
        }

    }

    function onBtnMenuClick(){
        isPause = true;
        //createjs.Ticker.setPaused("true");

        // кнопка главное меню
        btnMainMenu = new createjs.Bitmap(game.loader.preload.getResult("btnMainMenu"));
        btnMainMenu.x = w/2;
        btnMainMenu.y = h/2-160;
        btnMainMenu.regX = 155;
        btnMainMenu.regY = 80;
        btnMainMenu.addEventListener("click",onBtnMainManuClick);
        btnMainMenu.addEventListener("mouseover",function(e){btnMainMenu.scaleX+=0.05;btnMainMenu.scaleY+=0.05;});
        btnMainMenu.addEventListener("mouseout",function(e){btnMainMenu.scaleX-=0.05;btnMainMenu.scaleY-=0.05;});
        btnMainMenu.alpha = 1;

        // кнопка рестарт
        btnRestart = new createjs.Bitmap(game.loader.preload.getResult("btnRestart"));
        btnRestart.x = w/2;
        btnRestart.y = h/2;
        btnRestart.regX = 155;
        btnRestart.regY = 80;
        btnRestart.addEventListener("click",onBtnRestartClick);
        btnRestart.addEventListener("mouseover",function(e){btnRestart.scaleX+=0.05;btnRestart.scaleY+=0.05;});
        btnRestart.addEventListener("mouseout",function(e){btnRestart.scaleX-=0.05;btnRestart.scaleY-=0.05;});
        btnRestart.alpha = 1;

        // кнопка продолжить
        btnContinue= new createjs.Bitmap(game.loader.preload.getResult("btnContinue"));
        btnContinue.x = w/2;
        btnContinue.y = h/2+160;
        btnContinue.regX = 155;
        btnContinue.regY = 80;
        btnContinue.addEventListener("click",onBtnContinueClick);
        btnContinue.addEventListener("mouseover",function(e){btnContinue.scaleX+=0.05;btnContinue.scaleY+=0.05;});
        btnContinue.addEventListener("mouseout",function(e){btnContinue.scaleX-=0.05;btnContinue.scaleY-=0.05;});
        btnContinue.alpha = 1;

        _stage.addChild(btnMainMenu,btnRestart,btnContinue);
    }

    function onBtnMainManuClick(){
        isPause = false;
        game.soundManager.stop();
        game.menuScreen.initialize();
    }
    function onBtnRestartClick(){
        isPause = false;
        //createjs.Ticker.setPaused("false");
        game.soundManager.play("begin","sound");
        Initialize();
    }
    function onBtnContinueClick(){
        isPause = false;
        //createjs.Ticker.setPaused("false");
        _stage.removeChild(btnContinue,btnMainMenu,btnRestart);
    }

    function initializeNewRound(number){
        data.words =  getWordsFromServer(); // получили слова
        data.min_time -= 0.3;
        data.max_time -= 0.3;
        GenerateRound(number);  // создали анимацию появления раунда
    }
    // получаем слова с сервера
    function getWordsFromServer(){
        if (data.currentRound == 1) return ["привет","новый","игрок"];
        if (data.currentRound == 2) return ["ты","быстро","справился","падаван"];
        if (data.currentRound == 3) return ["хочешь","меня","разозлить","друг","получай"];
        if (data.currentRound == 4) return ["водопад","снеговик","мотоцикл","ха-ха"];
        if (data.currentRound == 5) return ["однако","ты","молодец","но","нужно","быть","быстрее"];
    }

    function GenerateRoundObjects(words){
        //Sprite player
        var data_player = {
            images: [game.loader.preload.getResult("player")],
            frames: {width:128, height:128},
            animations: { left:[0,15,"right"],
                right:[16,31,"forward"],
                forward:[32,47,"fly"],
                fly:[48,63,"left"] }
        };
        var sprite_sheet_player = new createjs.SpriteSheet(data_player);
        if(player === null){
            player = new createjs.Sprite(sprite_sheet_player, "fly");
            player.regX = 64;
            player.regY = 64;
            player.x = w/2;
            _stage.addChild(player);
        }
        player.y = h + 100;

        var data_tail_player = {
            images: [game.loader.preload.getResult("fire")],
            frames: {regX:32,regY:64, width:64, height:128},
            animations: { fly:[0,15,"fly"] }
        };
        var sprite_sheet_tail = new createjs.SpriteSheet(data_tail_player);
        var  tail = new createjs.Sprite(sprite_sheet_tail, "fly");
        _stage.addChild(tail);
        tail.x = player.x;
        tail.y = player.y+64;
        tail.scaleX = 3;
        tail.scaleY = 3;
        createjs.Tween.get(tail).to({y:h-100+64,scaleX:0.8,scaleY:0.8},1000,createjs.Ease.quartIn).call(function(){ _stage.removeChild(tail);});
        createjs.Tween.get(player).to({y:h-100},1000,createjs.Ease.quartIn).call(CreateEnemy,[words]);

    }

    function CreateEnemy(words){

        enemy_array = new Array(words.length);
        texts_array = new Array(words.length);
        texts_background_array = new Array(words.length);
        //Sprite Enemy
        for(var i = 0; i < words.length; i++){
            enemy_array[i] = EnemyFactory(words[i]);
            texts_array[i] = new createjs.Text(words[i],"bold 36px Clip","white");
            texts_background_array[i] = new createjs.Shape();
            if(data.currentRound > 1){
                texts_background_array[i].graphics.beginFill("#ffffff").drawRect(0, 0, texts_array[i].getMeasuredWidth(), 2*texts_array[i].getMeasuredLineHeight());
            }
            else{
                texts_background_array[i].graphics.beginFill("#ffffff").drawRect(0, 0, texts_array[i].getMeasuredWidth(), texts_array[i].getMeasuredLineHeight());
            }

            texts_background_array[i].alpha = 0.1;

            enemy_array[i].regX = 64;
            enemy_array[i].regY = 64;
            texts_array[i].regX = texts_array[i].getMeasuredWidth()/2;
            texts_array[i].regY = texts_array[i].getMeasuredLineHeight()/2;
            texts_background_array[i].regX = texts_array[i].getMeasuredWidth()/2;
            texts_background_array[i].regY = texts_array[i].getMeasuredLineHeight()/2;

            enemy_array[i].x = getRandom(0+64,w-64);
            texts_array[i].x =  enemy_array[i].x;
            texts_background_array[i].x = texts_array[i].x;

            enemy_array[i].y = getRandom(-300,-64);
            texts_array[i].y =  enemy_array[i].y+10;
            texts_background_array[i].y = texts_array[i].y;

            _stage.addChild(enemy_array[i],texts_background_array[i],texts_array[i]);

            var time = getRandom(data.min_time,data.max_time);

            createjs.Tween.get(enemy_array[i]).to({x:player.x, y:player.y},
                time,
                createjs.Ease.linear);

            createjs.Tween.get(texts_array[i]).to({x:player.x, y:player.y},
                time,
                createjs.Ease.linear);

            createjs.Tween.get(texts_background_array[i]).to({x:player.x, y:player.y},
                time,
                createjs.Ease.linear);
        }
    }

    function GameOver(){

        _stage.removeAllChildren();
        isPause = true;
        var text = new createjs.Text("game over","bold 36px Clip","white");
        text.regX = text.getMeasuredWidth()/2;
        text.regY = text.getMeasuredLineHeight()/2;
        text.x = w/2;
        text.y = h/2;
        text.alpha = 0;
        _stage.addChild(_background,text);
        createjs.Tween.get(text).to({alpha:1},2500,createjs.Ease.quadIn).call(onBtnMenuClick);
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function EnemyFactory(word){

        var enemy = null;
        // соответственно длине слова, ставим разные картинки
        if(word.length < 5){
            var data_enemy = {
                images: [game.loader.preload.getResult("enemy1")],
                frames: {width:128, height:128},
                animations: { fly:[0,15,"fly"] }
            };
            var sprite_sheet_enemy = new createjs.SpriteSheet(data_enemy);
            enemy = new createjs.Sprite(sprite_sheet_enemy, "fly");
        }
        else if(word.length < 7){
            var data_enemy = {
                images: [game.loader.preload.getResult("enemy2")],
                frames: {width:128, height:128},
                animations: { fly:[0,15,"fly"] }
            };
            var sprite_sheet_enemy = new createjs.SpriteSheet(data_enemy);
            enemy = new createjs.Sprite(sprite_sheet_enemy, "fly");
        }
        else if(word.length < 9){
            var data_enemy = {
                images: [game.loader.preload.getResult("enemy3")],
                frames: {width:128, height:128},
                animations: { fly:[0,15,"fly"] }
            };
            var sprite_sheet_enemy = new createjs.SpriteSheet(data_enemy);
            enemy = new createjs.Sprite(sprite_sheet_enemy, "fly");
        }
        else if(word.length < 12){
            var data_enemy = {
                images: [game.loader.preload.getResult("enemy1")],
                frames: {width:128, height:128},
                animations: { fly:[0,15,"fly"] }
            };
            var sprite_sheet_enemy = new createjs.SpriteSheet(data_enemy);
            enemy = new createjs.Sprite(sprite_sheet_enemy, "fly");
        }

        return enemy;
    }

    function GenerateRound(number){
        // Формируем анимацию
        if(round === null){
            round = new createjs.Text("");
            _stage.addChild(round);
        }

        round.x = w/2;
        round.y = h/2;
        round.scaleX = 1;
        round.scaleY = 1;
        round.color = "red";
        round.font = "bold 72px Bangers";
        round.textAlign = "center";
        round.alpha = 1;
        round.text = "Round " + number.toString();

        if(number <= 1)
            createjs.Tween.get(round).to({y:0,alpha:0,scaleX:5,scaleY:5}, 4000,createjs.Ease.quadOut).call(GenerateRoundObjects,[data.words]);
        else{ // если это не первый раунд
            round.alpha = 0;
            createjs.Tween.get(round).to({alpha:1},1000,createjs.Ease.quadIn).call(function(){
                round.alpha = 1;
                createjs.Tween.get(round).to({y:0,alpha:0,scaleX:5,scaleY:5}, 4000,createjs.Ease.quadOut).call(GenerateRoundObjects,[data.words]);
                player.rotation = 0;
                var data_tail_player = {
                    images: [game.loader.preload.getResult("fire")],
                    frames: {regX:32,regY:64, width:64, height:128},
                    animations: { fly:[0,15,"fly"] }
                };
                var sprite_sheet_tail = new createjs.SpriteSheet(data_tail_player);
                var  tail = new createjs.Sprite(sprite_sheet_tail, "fly");
                _stage.addChild(tail);
                tail.x = player.x;
                tail.y = player.y+64+10;
                tail.scaleX = 1.5;
                tail.scaleY = 1.5;
                createjs.Tween.get(tail).to({y:-200+64,scaleX:0.8,scaleY:0.8},700,createjs.Ease.quadOut).call(function(){ _stage.removeChild(tail);});
                createjs.Tween.get(player).to({y:-200},700,createjs.Ease.quadOut);

            });

        }
    }
    function keyPressedHandler(e){
        if(!isPause||texts_array!==null){
            if(currentWord !== null){
                if(currentWord.text.length !== 0 && currentWord.text.charCodeAt(0) === e.charCode){
                    currentWord.text = currentWord.text.substring(1);
                    data.score++;
                    PlayerShoot();
                }
                if(currentWord.text.length === 0){
                    var index = -1;
                    for(var i = 0; i < texts_array.length && index === -1; i++){
                        if(texts_array[i]===currentWord){
                            index = i;
                        }
                    }
                    //записываем два поля которые нужно удалить со сцены
                    currentWord.child1 = enemy_array[index];
                    currentWord.child2 = texts_array[index];
                    currentWord.child3 = texts_background_array[index];
                    currentWord.index = index;
                    //enemy_array.splice(index,1);
                    //texts_array.splice(index,1);
                }
            }
            else{
                var findWord = false;
                for(var i = 0;!findWord && (i < texts_array.length); i++){
                    if( texts_array[i].text.length !== 0 &&  texts_array[i].text.charCodeAt(0) === e.charCode && texts_array[i].y > 0)
                    {
                        texts_array[i].text =  texts_array[i].text.substring(1);
                        data.score++;
                        texts_array[i].color = "red";
                        findWord = true;
                        var index = i;
                        currentWord = texts_array[index];
                        PlayerShoot();
                    }

                }
            }

        }
    }
    function PlayerShoot(){

        var gun_sprite_sheet = new createjs.SpriteSheet({
            "images": [game.loader.preload.getResult("gun")],
            "frames": {"height": 64, "count": 8,"width": 64},
            "animations": {"shoot": [0, 8, "shoot", 1]}
        });
        var gun_explosion  = new createjs.Sprite(gun_sprite_sheet,"shoot");

        var bullet_sprite_sheet = new createjs.SpriteSheet({
            "images": [game.loader.preload.getResult("bullet")],
            "frames": {"height": 64,"width": 32,"count": 16},
            "animations": {"fly": [0, 16, "fly", 1]}
        });
        var bullet = new createjs.Sprite(bullet_sprite_sheet,"fly");

        bullet.regX = 16; bullet.regY = 32;
        gun_explosion.regX = 32;gun_explosion.regY = 32;
        gun_explosion.scaleX = 1.3; gun_explosion.scaleY = 1.3;

        bullet.x = player.x;
        bullet.y = player.y-64;

        gun_explosion.addEventListener("animationend",handleShootExplosion);

        function handleShootExplosion(){
            _stage.removeChild(gun_explosion);
        }

        var dx = player.x - currentWord.x;
        var dy = player.y - currentWord.y

        var angle;
        var tg;
        var phi;
        var newAngle;

        if(dx < 0){
            tg = Math.abs(dy)/Math.abs(dx);
            phi = Math.atan(tg)*57.29;
            angle = 90 - phi;
            newAngle = angle;
        }
        else{
            tg = Math.abs(dy)/Math.abs(dx);
            phi = Math.atan(tg)*57.29;
            angle = 90 - phi;
            newAngle = 360-angle;
        }


        var k = 64/90; // сколько пикселей в 1 градусе

        if(newAngle > 180){
            bullet.x  -= angle*k;
        }
        else{
            bullet.x  += angle*k;
        }
        bullet.y  += angle*k;

        gun_explosion.x = bullet.x;
        gun_explosion.y = bullet.y;

        bullet.rotation = newAngle;
        player.rotation = newAngle;
        gun_explosion.rotation = newAngle;

        _stage.addChild(bullet,gun_explosion);
        createjs.Tween.get(bullet).to({x: currentWord.x, y:currentWord.y},((h-currentWord.y)/h)*300).call(handleComplete);
        function handleComplete(){
            _stage.removeChild(bullet);
            var explosion_sprite_sheet = new createjs.SpriteSheet({
                "images": [game.loader.preload.getResult("explosion")],
                "frames": {"regX": 32, "height": 64, "count": 12, "regY": 32, "width": 64},
                "animations": {"boom": [0, 12,"boom",1]}
            });
            var explosion = new createjs.Sprite(explosion_sprite_sheet,"boom");
            explosion.x = currentWord.x;
            explosion.y = currentWord.y;
            explosion.scaleX = 2;
            explosion.scaleY = 2;
            if(currentWord.text.length === 0){
                explosion.scaleX = 4;
                explosion.scaleY = 4;
            }
            _stage.addChild(explosion);
            explosion.addEventListener("animationend",handleCompleteExplosion);
            function handleCompleteExplosion(){
                _stage.removeChild(explosion);
                if(currentWord.text.length===0){
                    _stage.removeChild(currentWord.child1);
                    _stage.removeChild(currentWord.child2);
                    _stage.removeChild(currentWord.child3);
                    enemy_array.splice(currentWord.index,1);
                    texts_array.splice(currentWord.index,1);
                    texts_background_array.splice(currentWord.index,1);
                    currentWord=null;
                }
            }
        }

        bullets[bullets.length] = bullet;
    }

    game.gameScreen = { initialize: Initialize, stage: _stage};
})();
