requirejs.config({
    urlArgs: 'bustCache=' + (new Date()).getTime(),

    paths: {
        'jquery': '../bower_components/jquery/dist/jquery'
    },

    callback: function () {
        "use strict";

        require(["app"], function (App) {
            var app = new App();
            app.start();
        });
    }
});
