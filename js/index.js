// namespace
this.game = this.game||{};

(function() {

    function initialize(){
        // инициализируем менеджеров
        game.soundManager.initialize();
        game.loader.initialize();
        game.screenManager.initialize();
        // добавляем обработчики событий на загрузку файлов
        game.loader.setHandleComplete(game.menuScreen.initialize);
        // добавляем обработчики событий на прогресс загрузки файлов
        game.loader.setHandleProgress(game.loadingScreen.handleProgress);
        game.loadingScreen.initialize();
        game.screenManager.activateScreen(game.loadingScreen.stage)
        game.loader.loadFiles();
    }
    game.initialize = initialize;
})();
