app.controller('visitorCtrl', function($scope, $http, $timeout, $mdSidenav, $log, $loadingOverlay) {
	$scope.currentNavItem = 1;
    $scope.items = []
        
    $scope.loadQuestionnaires = function(type) {
        $http.get("get-available-questionnaires/"+type)
        .then(function(response) {
            $loadingOverlay.hide();
            console.log(response.data);
            $scope.items = response.data.data;
        })
        .catch(e => {
            $loadingOverlay.hide();
            console.log(e);
        });
    }
    $scope.loadQuestionnaires(1)
    
    $scope.goto = function(page) {
      $scope.items = []
      $scope.loadQuestionnaires(page) 
    };
    
    $scope.loadSurvey = function(item) {
        console.log(item)
        window.open('run-survey/'+item.id,'_blak')
    }
    
    $scope.questionsNo = function(domains) {
        var count = 0
        for(var i=0; i < domains.length; i++) {
            for(var j=0; j < domains[i].questions.length; j++) {
                count++
            }
        }
        return count
    }
});
