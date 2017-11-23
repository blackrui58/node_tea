
// 获取app
var app = angular.module('app');
app.directive('esOpen',function () {
	return {
		restrict: 'AE',
		replace: true,
		link: function (scope,ele,attr) {
			ele.toggle(function () {
				// 添加is-opened类名
				$(this).parent().addClass('is-opened');
				// 下拉
				$(this).siblings().stop().slideDown();
			},function () {
				// 移除类名
				$(this).parent().removeClass('is-opened');
				// 上拉
				$(this).siblings().stop().slideUp();
			});
		}
	}
});


