var app = angular.module('app');

// 创建service服务

app.service('xxx',function () {
	
	// 请求数据
	this.getData = function ($scope,$http,page) {
		
		$scope.page = page || 1;
		
		$http.get('/detail',{params: {page: $scope.page}}).then(function (str) {
			var {data,total_count,page} = str.data;
		
			// 当前页数
			$scope.page = page;
			
			// 总共几页
			var total_page = Math.ceil(total_count / $scope.count);
			
			$scope.arr = [];
			$scope.arr.length = total_page;
			
			$scope.data = data;
			
			
			angular.forEach($scope.data,function(ele){
			// 每个数据的选中状态
				ele.checked = false;
			});
			console.log($scope.data);
		});
	
	}
	
});
