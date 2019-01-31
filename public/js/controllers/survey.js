app.controller('surveyCtrl', function ($http, $loadingOverlay, $mdEditDialog, $q, $scope, $timeout, $mdDialog) {
  'use strict';
  
    $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
 
 
    
    $scope.items = []
	$http.get("get-available-questionnaires/1")
	.then(function(response) {
		$loadingOverlay.hide();
		console.log(response.data);
		$scope.items = response.data.data;
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
  
 
});




