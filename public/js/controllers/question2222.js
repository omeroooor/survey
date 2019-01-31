app.controller('questionCtrl', function($scope) {
	$scope.questions = [];
	
	$scope.question = {name:'', description: '', answer_set:''};
	
	
	$scope.saveQuestion = function() {
		console.log($scope.question);
	};
	
	$scope.selectedMembers = [];
	
	$scope.showSelectedMembers = function(){
		console.log($scope.selectedMembers);
	}
});
