var app = angular.module('app',['ui.router']);

// 配置路由
app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	
	$stateProvider.state('home',{
		url: '/home',
		template: '<h1>首页1</h1>'
	}).state('userlist',{
		url: '/userlist',
		template: '<h1>首页2</h1>'
	}).state('booklist',{
		url: '/booklist',
		templateUrl: './list.html',
		controller: 'listCtrl'
	}).state('booktype',{
		url: '/booktype',
		template: '<h1>首页4</h1>'
	}).state('message',{
		url: '/message',
		template: '<h1>首页5</h1>'
	}).state('rename',{
		url: '/rename',
		template: '<h1>首页6</h1>'
	})


}]);