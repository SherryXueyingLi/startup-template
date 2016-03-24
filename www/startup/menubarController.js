define(["config"], function(config){
    var menubarController = function($scope, $state){
	$scope.title = "Hello AngularJs and RequireJs";
	$scope.tabs = config.tabs;
	var tabClicked = function(tab){
	    console.log("go to "+tab.state);
	    $state.go(tab.state);
	};
	$scope.tabClicked = tabClicked;
    };
    
   
    return menubarController;
});