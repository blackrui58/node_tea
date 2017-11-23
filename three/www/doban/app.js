
//注册app
var app = angular.module('app',['ngRoute','in_theaters','coming_soon','top250','movie_detail']);

// 配置路由表
// app.config(['$routeProvider',function ($routeProvider) {
// 	$routeProvider.when('/in_theaters/:id',{
// 		templateUrl: 'in_theaters/index.html',
// 		controller: 'in_theatersCtrl'
// 	}).when('/coming_soon/:id',{
// 		templateUrl: 'coming_soon/index.html',
// 		controller: 'coming_soonCtrl'
// 	}).when('/top250/1',{
// 		templateUrl: 'top250/index.html',
// 		controller: 'top250Ctrl'
// 	}).otherwise({redirectTo: '/in_theaters/1'});
// }]);

app.config(['$routeProvider',function ($routeProvider) {
	//    /detail/1
	$routeProvider.when('/detail/:id',{
		templateUrl: 'movie_detail/index.html',
		controller: 'movie_detailCtrl'
	}).when('/:movie/:id',{
		templateUrl: 'in_theaters/index.html',
		controller: 'in_theatersCtrl'
	}).otherwise({redirectTo: '/in_theaters/1'});
}]);
//初始化全局数据
app.run(function ($rootScope,$location) {
	$rootScope.arr = [
		{href: '#/in_theaters/1',value: '正在热映'},
		{href: '#/coming_soon/1',value: '即将上映'},
		{href: '#/top250/1',value: 'Top250'},
	];
	var path = $location.path();
	
	if (path.startsWith('/in_theaters')) {
		$rootScope.index = 0;
	} else if (path.startsWith('/coming_soon')) {
		$rootScope.index = 1;
	} else if(path.startsWith('/top250')) {
		$rootScope.index = 2;
	}
	$rootScope.changeIndex = function (a) {
		$rootScope.index = a;
	}
});
//自定义服务请求数据
app.service('movie',function () {
	this.getData = function ($scope,$routeParams,$http) {
		// 初始化数据
		$scope.data = [];

		//当前页数
		$scope.currentPage = $routeParams.id;

		$scope.count = 10;
		var ss = $routeParams.movie;
		// 请求数据
		var url = '/'+ss+'?count='+$scope.count+'&page='+$routeParams.id;
		return $http.get(url);
	}
});