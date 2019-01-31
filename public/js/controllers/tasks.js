app.controller('tasksCtrl', function($scope) {
	$scope.tasks = [];
	
	$scope.task = {name:'', upper: 0};
	
	
	$scope.saveTask = function() {
		console.log($scope.task);
	};
});
