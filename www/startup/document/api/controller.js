define( function(){
    var controller = function($scope){
	$scope.time = new Date();
	$scope.title = "API";
    };
    //angular.module("startup").cp.register("document", controller);
    return controller;
});
