//自己创建的专属于正在热映的app
var movie_detailApp = angular.module('movie_detail',[]);

movie_detailApp.controller('movie_detailCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams){
	$http.get('/detail?id='+$routeParams.id).then(function (str) {
		console.log(str.data);
		$scope.data = str.data;
	});
	// console.log($routeParams);
}]);