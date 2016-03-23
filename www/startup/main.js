require.config({
    paths: {
	"angular": "lib/angular.min",
	"config": "config"
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
});

require(["config", "menubarController","angular"], function(config, menubarController, angular){
    // see Stack Overflow Q: 25168593
    var app = angular.module("startup", []);
    app.controller('menubar',menubarController)
    .config(function($controllerProvider) {
	app.cp = $controllerProvider;
    });
    app._addController = function(name, controller){
	app.controller(name, controller);
    };
    angular.bootstrap(document, ["startup"]);
    window.app = app;
});

