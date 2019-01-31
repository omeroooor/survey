var app = angular.module('researchApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngLoadingOverlay']);

app.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "login.html"
    })
    .when("/signup", {
        templateUrl : "signup.html"
    });
});

app.controller('loginCtrl', function($scope, $http, $loadingOverlay, $timeout, $location) {
	$scope.loginData = {email: '', password: ''};
	
	$scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
	};

	var searchObject = $location.search();
	console.log(searchObject.email);
	if(searchObject.email != 'undefined') {
		$scope.loginData.email = searchObject.email;
	}
	//$scope.loginData.groupId = urlArray[urlArray.length-1];
	
	$scope.login = function() {
		$scope.showLoading(2000);
		console.log($scope.loginData);
		$http.post("login", $scope.loginData)
		.then(function(response) {
			$loadingOverlay.hide();
			console.log(response.data);
			location = "dashboard";
		});
	}
	
	$scope.signup = function() {
		console.log($scope.loginData);
		location = "#!signup";
	}
});











app.controller('signupCtrl', function($scope, $http, $loadingOverlay, $timeout) {

	 $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
	};

	
	$scope.user = {
		name: '', 
		email: '',
		password: '', 
		passwordConfirmation: ''
	};
	
	
	$scope.login = function(email) {
		console.log($scope.loginData);
		if(email != 'undefined') {
			location = "#!/?email="+email;
		} else {
			location = "#!/";
		}
	}
	
	$scope.signup = function() {
		//$scope.showLoading(60000);
		if($scope.user.password != $scope.user.passwordConfirmation) {
			alert("كلمتي المرور لم تتطابقا");
			return;
		}
		$http.post("user", $scope.user)
		.then(function(response) {
			//$loadingOverlay.hide();
			console.log(response.data);
			if(response.data.success) {
				$scope.login(response.data.email);
			} else {
				alert("حدث خطأ ما, نرجوا إعادة المحاولة");
			}
		})
		.catch(e => {
			console.log(e);
			//$loadingOverlay.hide();
			alert("حدث خطأ ما, نرجوا إعادة المحاولة");
		});
		console.log($scope.user);
	}
	
});
