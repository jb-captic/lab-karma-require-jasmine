'use strict';

(function(define){

    define(["jquery"], function ($) {

        var App = function (target) {
            this.target = target || $("body");
        };

        App.prototype.start = function () {
            this.target.html("App Started!");
        };

        return App;
    });
})(define);
