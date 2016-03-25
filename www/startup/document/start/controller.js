define( function(){
    var controller = function($scope){
	$scope.time = new Date();
	$scope.title = "Quick Start";
    };
    //angular.module("startup").cp.register("document", controller);
    return controller;
});
