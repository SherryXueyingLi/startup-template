define(["config"], function(config){
    var menubarController = function($scope, $state){
	
	var tabClicked = function(tab){
	    if(tab.children.length>0){
		$("."+tab.state).toggle();
		return;
	    } 
	    console.log("go to "+tab.state);
	    $("li.navBar").removeClass("active");
	    $("#"+tab.state).parent().addClass("active");
	    $state.go(tab.state);
	    while(tab.parent){
		$("#"+tab.parent.state).parent().addClass("active");
		tab = tab.parent;
	    }
	};
	
	$scope.title = "Hello AngularJs and RequireJs";
	$scope.tabs = config.tabs;
	var tabLeave = function(state){
	    $("."+state).hide();
	};
	
	$scope.tabLeave = tabLeave;
	
	Object.defineProperty($scope, 'tabClicked', {
	    get: function() {
		return tabClicked;
	    }
	});
    };
    return menubarController;
});