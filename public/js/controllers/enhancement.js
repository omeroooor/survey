app.controller('enhancementCtrl', function ($http, $loadingOverlay, $mdEditDialog, $q, $scope, $timeout, $mdDialog) {
  'use strict';
  
    $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
 
 
    
    $scope.questionnaires = []
	$http.get("questionnaires")
	.then(function(response) {
		$loadingOverlay.hide();
		console.log(response.data);
		$scope.questionnaires = response.data.data;
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
    
    $scope.domains = []
    $scope.getDomains = function(questionnaire) {
        //console.log(questionnaire);
        $scope.plan.minimum = 0
        $scope.plan.percentage = 0
        $http.get("questionnaire-domains/"+questionnaire.questionnaire)
        .then(function(response) {
            $loadingOverlay.hide();
            console.log(response.data);
            $scope.domains = response.data.data;
        })
        .catch(e => {
            $loadingOverlay.hide();
            console.log(e);
        });
    }
    
    $scope.updateResults = function(plan) {
        $scope.plan.minimum = $scope.plan.domain.minimum
        $scope.plan.percentage = $scope.plan.domain.percentage
    }
  
  // ---------------------------------------------------
  $scope.url = "http://localhost:8000/";
  $scope.content = "";
  $scope.saveEnhancementPlan = function() {
	
	
	var formdata = new FormData();
	formdata.append('questionnaire_domain_id', $scope.plan.domain.id);
	formdata.append('minimum', $scope.plan.minimum);
	formdata.append('result', $scope.plan.percentage);
	
	
	console.log('------------ Form Data ------------');
	console.log(formdata);
    //return
	//console.log(planItemContent);
	$http.post($scope.url+'enhancement-plan', formdata, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
	.then(response => {
		console.log(response);
        if(response.data.success) {
            $scope.plan.questionnaire = "";
            $scope.plan.domain = "";
            $scope.plan.minimum = "";
            $scope.plan.percentage = "";
        } else {
            alert("تم إضافة خطة تحسين لهذا المحور من قبل");
        }
	})
	.catch(e => {
		console.log(e);
	});
  }
  
  
  
  //----------------------------- view area -------------------------//
  //------------ Table View Control Area ----------//
    $scope.items = {
        count: 0,
        data: []
    };	
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  
  $scope.showLoading(20000);
	$http.get('enhancement-plan')
	.then(function(response) {
		$loadingOverlay.hide();
		console.log(response.data);
		$scope.items.count = response.data.data.length;
        $scope.items.data = response.data.data;
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
    
    //---------------------------- Update -------------------------------
  
  $scope.editName = function (event, item) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: item.name,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-enhancement-plan', {field:'name', value:input.$modelValue, id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.name = input.$modelValue;
      },
      targetEvent: event,
      name: 'View Content',
      validators: {
        'md-maxlength': 60
      }
    };
    var promise;
    promise = $mdEditDialog.large(editDialog);
    //promise = $mdEditDialog.small(editDialog);
	  
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };
  
  $scope.editAnswerSet = function (item) {	
    $scope.showLoading(20000);
    $http.post($scope.url+'update-enhancement-plan', {field:'answer_set_id', value:item.answer_set.id, id:item.id})
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
    })
    .catch(e => {
        $loadingOverlay.hide();
        console.log(e);
    });
  };
  
   
  //----------------------------- Delete Question/s --------------------------//
  $scope.deleteSelected = function() {
      var deletedIds = []
      for (var i =0; i < $scope.selected.length; i++) {
        deletedIds.push($scope.selected[i].id)  
      }
      //console.log($scope.selected)
      //console.log(deletedIds)
      //return
      $scope.showLoading(20000);
    $http.post($scope.url+'delete-enhancement-plan ', {ids:deletedIds})
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
        for (var i =0; i < $scope.selected.length; i++) {
          for (var j = 0; j < $scope.items.data.length; j++) {
              if ($scope.selected[i].id == $scope.items.data[j].id) {
                  var index = $scope.items.data.indexOf($scope.items.data[j]);
                  $scope.items.data.splice(index, 1);
                  continue;
              }
          }
            
        }
    })
    .catch(e => {
        $loadingOverlay.hide();
        console.log(e);
    });
  }
  
  
  
  // ------------------------------ activities -------------- //
  
    
  
  
  $scope.addActivity = function (event, item) {
    //console.log(item)
    event.stopPropagation(); // in case autoselect is enabled
    
    var promise;
	
	var parentEl = angular.element(document.body);
	promise = $mdDialog.show({
		parent: parentEl,
		templateUrl: 'views/enhancement/activities/new.html',
		targetEvent: event,
		locals: {
           plan_id: item.id,
           item: item,
		   url: $scope.url
         },
		controller: 'enhancementPlanActivityCtrl',
		onComplete: afterShowAnimation,
		fullscreen: true
	});
    function afterShowAnimation(scope, element, options) {
       // post-show code here: DOM element focus, etc.
    }
  };   
  
  
  $scope.showActivities = function (event, item) {
    //console.log($scope.item)
    event.stopPropagation(); // in case autoselect is enabled
    
    var promise;
	
	var parentEl = angular.element(document.body);
	promise = $mdDialog.show({
		parent: parentEl,
		templateUrl: 'views/enhancement/activities/view.html',
		targetEvent: event,
		locals: {
           plan_id: item.id,
           item: item,
		   url: $scope.url
         },
		controller: 'enhancementPlanActivityCtrl',
		onComplete: afterShowAnimation,
		fullscreen: true
	});
    function afterShowAnimation(scope, element, options) {
       // post-show code here: DOM element focus, etc.
    }
  };

  
});




