//自己创建的专属于即将上映的app
var coming_soonApp = angular.module('coming_soon',[]);

coming_soonApp.controller('coming_soonCtrl',['$scope','$http','$routeParams','$route',function ($scope,$http,$routeParams,$route){
	
	console.log($routeParams);
	// 初始化数据
	$scope.data = [];

	//当前页数
	$scope.currentPage = $routeParams.id;

	var count = 10;
	// 请求数据
	var url = '/coming_soon?count='+count+'&page='+$routeParams.id;
	$http.get(url).then(function (str) {
		// data: 我们需要的数据
		// total: 总共的数据 33 / 10 = 3.3333
		// 服务器返回的数据
		var json = str.data;
		$scope.data = json.data;
		// 计算总页数
		$scope.arr = [];
		$scope.arr.length = Math.ceil(json.total / count);
	});

	// 更新路由的参数
	$scope.changePage = function (a) {
		// 更新
		$route.updateParams({id: a});
	} 
}]);