define(["config"], function(config){
    var menubarController = function($scope, $state){
	$scope.title = "Hello AngularJs and RequireJs";
	$scope.tabs = config.tabs;
	var tabClicked = function(tab){
	    if(tab.children.length>0) return;
	    console.log("go to "+tab.state);
	    $(".nav").find("li").removeClass("active");
	    $("#"+tab.state).addClass("active");
	    $state.go(tab.state);
	    while(tab.parent){
		$("#"+tab.parent.state).addClass("active");
		tab = tab.parent;
	    }
	    
	};
	
	var tabHover = function(state){
	    $("."+state).show();
	};
	
	var tabLeave = function(state){
	    $("."+state).toggle();
	};
	
	$scope.tabHover = tabHover;
	$scope.tabLeave = tabLeave;
	$scope.tabClicked = tabClicked;
    };
    return menubarController;
});