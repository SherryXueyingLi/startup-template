define( function(){
    var controller = function($scope){
	$scope.time = new Date();
	$scope.page = "document";
    };
    //angular.module("startup").cp.register("document", controller);
    return controller;
});
