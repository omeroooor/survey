app.controller('dashboardCtrl', function($scope, $timeout, $mdSidenav, $log) {
	 $scope.currentNavItem = 'page1';
    $scope.isToggled = false;

    $scope.goto = function(page) {
      $scope.status = "Goto " + page;
    };
	
	$scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
		  console.log("Sidenave is closed now");
          $log.debug("close LEFT is done");
        });

    };
	
	$scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle()
		.then(() => {
			console.log('sidenav toggled now');
		});
      };
    }
	
	/**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
	
	/**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
	
	
	$scope.logout = function() {
		location="/";
	}
});


function test(){
    console.log('Document Fully Loaded');
}

test();
