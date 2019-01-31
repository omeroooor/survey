app.controller('usersCtrl', function($scope) {
	$scope.users = [];
	
	$scope.user = {name:'', user: '', password:'', passwordConfirmation: ''};
	
	
	$scope.saveUser = function() {
		console.log($scope.user);
	};
	
	$scope.selectedUsers = [];
	
	$scope.showSelectedUsers = function(){
		console.log($scope.selectedUsers);
	}
});
