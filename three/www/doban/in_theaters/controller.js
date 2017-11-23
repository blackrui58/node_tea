
//自己创建的专属于正在热映的app
var in_theatersApp = angular.module('in_theaters',[]);

in_theatersApp.controller('in_theatersCtrl',['$scope','$http','$routeParams','$route','movie',function ($scope,$http,$routeParams,$route,movie){
	
	movie.getData($scope,$routeParams,$http).then(function (str) {
		var json = str.data;
		console.log(json)
		$scope.data = json.data;
		$scope.arr = [];
		$scope.arr.length = Math.ceil(json.total / $scope.count);
	});

	// 更新路由的参数
	$scope.changePage = function (a) {
		// 更新
		$route.updateParams({id: a});
	} 
}]);