var app = angular.module('app');

app.controller('listCtrl',['$scope','$http','xxx',function ($scope,$http,xxx) {

	// 你点击的下标
	$scope.index = -1;
	
	// 显示添加
	$scope.add = false;

	// 显示编辑
	$scope.edit = false;
	

	// 切换下标
	$scope.changeIndex = function (a) {
		console.log(11);
		$scope.index = a;
	}
	
	

	// 请求数据
	$scope.data = [];
	
	// 设置每页的个数
	$scope.count = 5;

	
	// 发送ajax请求
	xxx.getData($scope,$http);
//	$http.get('/detail').then(function (str) {
//		console.log(str.data);
//		// {data: Array(5), total_count: 21, page: 1}
//		var {data,total_count,page} = str.data;
//		
//		// 当前页数
//		$scope.page = page;
//		
//		// 总共几页
//		var total_page = Math.ceil(total_count / $scope.count);
//		
//		$scope.arr = [];
//		$scope.arr.length = total_page;
//		
//		$scope.data = data;
//	});
	
	// 切换页数
	$scope.changePage = function (a) {
		$scope.page = a;
		// 请求数据
		xxx.getData($scope,$http,$scope.page);
	}
	
	// 删除一条数据
	$scope.delete = function (a) {
		
		var x = confirm('确认删除吗');
		
		if (x) {
			// 删除数据
			$http.get('/delete',{params: {id: a}}).then(function (str) {
				console.log(str);
				// 请求数据
				xxx.getData($scope,$http,$scope.page);
			});
		}
		
		
	}
	
	// 选中所有
	$scope.selectAll = function () {
		// false
		console.log($scope.all)
		// checked变为true
		angular.forEach($scope.data,function (ele) {
			ele.checked = $scope.all;
		});
	}
	
	// 删除所有
	$scope.deleteAll = function () {
		
		angular.forEach($scope.data,function (ele) {
			if (ele.checked) {
			// 选中了才删除
				$http.get('/delete',{params: {id: ele.id}}).then(function (str) {
					console.log(str);
				});
			}
		})
		
		// 重新获取数据
		xxx.getData($scope,$http,$scope.page);
		
		
	}
	
	// 显示批量删除
	$scope.showDelete = function () {
	
		var count = 0;
		
		angular.forEach($scope.data,function (ele) {
			if (!ele.checked) {
				count++;
			}
		});
		
		if (count == 0) {
			$scope.all = true;
		} else {
			$scope.all = false;
		}
		
		
		
		// 遍历数据,根据数据的checked属性返回对应的true或者false值
		for (var i = 0;i < $scope.data.length;i++) {
			var ele = $scope.data[i];
			if (ele.checked) {
				return false;
			}
		}
	
		return true;
	}
	
	// 添加
	$scope.addSubmit = function () {
		var oDate = $scope.date;
		
		var str = oDate.getFullYear()+'-'+(oDate.getMonth() + 1)+'-'+oDate.getDate();
		
		var data = {title: $scope.title,author: $scope.author,date: str,content: $scope.content};
		
		// 添加到数据库
		$.ajax({
			type: 'post',
			url: '/add',
			data: data,
			success: function (str) {
				$scope.add = false;
				$scope.title = '';
				$scope.author = '';
				$scope.date = null;
				$scope.content = '';
				// 重新获取数据
				xxx.getData($scope,$http,$scope.page);
				
			}
		});
		
	}
	
	//编辑
	$scope.ss = function (a) {
		$scope.edit = true;
		$scope.editEle = $scope.data[a];
		// 给绑定的数据一个初始值
		$scope.editTitle = $scope.editEle.title;
		$scope.editAuthor = $scope.editEle.author;
		// 把时间字符串转时间对象 2017-09-17
		
		var str = $scope.editEle.date;
		var oDate = new Date();
		
		// 找出匹配的字符串
		var arr = str.match(/[0-9]+/g);
		oDate.setFullYear(arr[0],arr[1],arr[2])
		$scope.editDate = oDate;
		$scope.editContent = $scope.editEle.content;
		
		// id
		$scope.id = $scope.editEle.id;
	}
	
	// 提交
	$scope.editSubmit = function () {
	
		console.log($scope.id);
	
		var oDate = $scope.editDate;
		
		var str = oDate.getFullYear()+'-'+(oDate.getMonth() + 1)+'-'+oDate.getDate();
		
		var data = {title: $scope.editTitle,author: $scope.editAuthor,date: str,content: $scope.editContent,id: $scope.id};
		
		// 发送数据请求
		$.ajax({
			type: 'post',
			url: '/update',
			data: data,
			success: function (str) {
				$scope.$apply(function () {
					$scope.edit = false;
					xxx.getData($scope,$http,$scope.page);
				});
				
			}
		});
		
		
		
	}
	
}]);
