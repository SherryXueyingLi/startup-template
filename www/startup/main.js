require.config({
    paths: {
	"angular": "lib/angular.min",
	"uiRouter": "lib/angular-ui-router",
	"config": "config",
	"css": "lib/css",  
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        "uiRouter": ["angular"],
    },
});

require(["config", "menubarController","angular","uiRouter", "css!style/site.css",], function(config, menubarController, angular){
    // see Stack Overflow Q: 25168593
    var app = angular.module("startup", ['ui.router']);
   
    app.config(function($controllerProvider, $stateProvider, $urlRouterProvider) {
	app.cp = $controllerProvider;
	app.$stateProvider = $stateProvider;
	setStates(config.tabs, $stateProvider);
	$urlRouterProvider.when("", "/main");
    });
    
    app.controller('menubar', menubarController);
    var cache={}; 
    var setStates = function(tabs, $stateProvider){
	for(var i in tabs){
	    if(tabs[i].children.length>0){
		setStates(tabs[i].children, $stateProvider);
	    }else{
		$stateProvider.state(tabs[i].state, generateConfig(tabs[i]));
	    }
	}
	
    };
    
    function generateConfig(tab){
	return {
            url: "/"+tab.url,
            templateUrl: tab.view,
            data: {
        	tab: tab,
        	name: tab.name,
        	state: tab.state,
        	path: tab.controllerPath
            },
            
            resolve: {
                tabController: ['$state',function($state){
                    if(cache[this.data.state]) return;
                    var data = this.data;
                    return load(data).then(function(data){
                	$("#"+data.state).click();
//                	menubarController.tabClicked(data);
                    });
                }]
            },
            controller: tab.state
	}
    };
    
    function load(data){
	var deferred = $.Deferred();
	require([data.path], function(ctrl){
	    angular.module("startup").cp.register(data.state, ctrl);
	    cache[data.state] = data.state;
	    deferred.resolve(data);
        });
        return deferred.promise();
    }
    
    //start angularjs manually. no 'ng-app' needed in html.
    angular.bootstrap(document, ["startup"]);
    
});

