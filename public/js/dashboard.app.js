var app = angular.module('researchApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngLoadingOverlay', 'md.data.table', 'ui.tinymce']);

app.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
});

app.config(function($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default').primaryPalette('blue')
    .primaryPalette('pink')
    .accentPalette('orange');
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "dashboard.html"
    })
    .when("/new-group", {
        templateUrl : "new_group.html"
    })
    .when("/dashboard", {
        templateUrl : "dashboard.html"
    })
    .when("/add-question", {
        templateUrl : "questions/add.html"
    })
    .when("/view-questions", {
        templateUrl : "questions/view.html"
    })
    .when("/add-user", {
        templateUrl : "users/add-user.html"
    })
    .when("/view-users", {
        templateUrl : "users/view-users.html"
    })
    .when("/new-answer-set", {
        templateUrl : "views/answer_set/new.html"
    })
    .when("/view-answer-sets", {
        templateUrl : "views/answer_set/view.html"
    })
    .when("/new-domain", {
        templateUrl : "views/domain/new.html"
    })
    .when("/view-domains", {
        templateUrl : "views/domain/view.html"
    })
    .when("/new-question", {
        templateUrl : "views/question/new.html"
    })
    .when("/view-questions", {
        templateUrl : "views/question/view.html"
    })
    .when("/new-questionnaire", {
        templateUrl : "views/questionnaire/new.html"
    })
    .when("/view-questionnaires", {
        templateUrl : "views/questionnaire/view.html"
    })
    .when("/logout", {
        templateUrl : "logout.html"
    });
});

app.controller('loginCtrl', function($scope) {
	$scope.loginData = {groupId: '', password: ''};
	
	$scope.login = function() {
		console.log($scope.loginData);
		location = "dashboard";
	}
	
	
});

app.controller('homeCtrl', function($scope, $timeout, $mdSidenav, $log) {
   
});

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
	  console.log("Sidenave is closed now");
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
  
app.controller('verificationCtrl', function($scope, $http, $loadingOverlay, $timeout) {
	$scope.code = "";
	
	$scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
	};
	
	$scope.verify = function() {
		$scope.showLoading(20000);
		console.log($scope.code);
		$http.post("verify", {code: $scope.code})
		.then(function(response) {
			$loadingOverlay.hide();
			console.log(response.data);
			if(response.data.success) {
				location = "dashboard";
			} else {
				console.log(response.data);
			}
		})
		.catch(e => {
			console.log(e);
		});
	}
});