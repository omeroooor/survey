app.controller('reviewMainCtrl', function ($http, $loadingOverlay, $q, $scope, $timeout, $mdDialog) {
  'use strict';
  
    $scope.url = "http://localhost:8000/";
    
    $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
 
    $scope.data = {}
    
    $scope.items = []
    
    /*
    $scope.items = []
	$http.post("http://localhost:8000/api/questionnaire-results",)
	.then(function(response) {
		$loadingOverlay.hide();
		console.log(response.data);
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
    */
  
 
});




