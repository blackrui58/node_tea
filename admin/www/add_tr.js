angular.module('app').directive('esAdd',function () {
	
	return {
		restrict: 'AE',
		replace: true,
		link: function (scope,ele,attr) {
			var content = attr.esAdd;
			ele.toggle(function () {
				$(this).children().addClass('el-table__expand-icon--expanded');
				// 先获取点击的tr
				var tr = $(this).parent().parent();
				// 在后面插入一个新的tr
				var str = '<tr class="x"><td colspan="7" class="el-table__expanded-cell"><form class="el-form demo-table-expand el-form--label-left el-form--inline"><div class="el-form-item"><label class="el-form-item__label">[图书简介]</label><div class="el-form-item__content"><span>'+content+'</span><!----></div></div></form></td></tr>';
				$(str).insertAfter(tr);
			},function () {
				$(this).children().removeClass('el-table__expand-icon--expanded');
				// 删除添加的str
				var tr = $(this).parent().parent();
				// 删除
				// 获取下一个兄弟节点
				var sibling = tr.next();
				sibling.remove();
			});
		}
	}
});
