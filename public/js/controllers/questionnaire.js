app.controller('questionnaireCtrl', function ($http, $loadingOverlay, $mdEditDialog, $q, $scope, $timeout, $mdDialog, $filter) {
  'use strict';
  
    $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
 
    $scope.questionnaireTypes = [
        {value:1, name:'خاص بالموظفين'},
        {value:2, name:'خاص بالعملاء'}
    ]
    
    $scope.questionnaire = {
        name: '',
        about: '',
        start_date: '',
        end_date: '',
        type: ''
    }
  
  // ---------------------------------------------------
  $scope.url = "http://localhost:8000/";
  $scope.content = "";
  $scope.saveQuestionnaire = function() {
    
    $scope.questionnaire.start_date = $filter('date')($scope.questionnaire.start_date, 'yyyy-MM-dd')
    $scope.questionnaire.end_date = $filter('date')($scope.questionnaire.end_date, 'yyyy-MM-dd')
    
	console.log($scope.questionnaire);
	$http.post($scope.url+'questionnaire', $scope.questionnaire)
	.then(response => {
		console.log(response);
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
	$http.get('questionnaires')
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
		$http.post($scope.url+'update-questionnaire', {field:'name', value:input.$modelValue, id:item.id})
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
  
  $scope.editStartDate = function (event, item) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: $filter('date')(item.start_date, 'yyyy-MM-dd'),
      placeholder: 'Start Date',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-questionnaire', {field:'start_date', value:$filter('date')(input.$modelValue, 'yyyy-MM-dd'), id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.start_date = $filter('date')(input.$modelValue, 'yyyy-MM-dd');
      },
      targetEvent: event,
      start_date: 'View Content',
      type: 'date'
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
  
  $scope.editEndDate = function (event, item) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: $filter('date')(item.end_date, 'yyyy-MM-dd'),
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
        
		$http.post($scope.url+'update-questionnaire', {field:'end_date', value:$filter('date')(input.$modelValue, 'yyyy-MM-dd'), id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.end_date = $filter('date')(input.$modelValue, 'yyyy-MM-dd');
      },
      targetEvent: event,
      end_date: 'View Content',
      type: 'date'
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
  
  
  $scope.editAbout = function (event, item) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: item.about,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-questionnaire', {field:'about', value:input.$modelValue, id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.about = input.$modelValue;
      },
      targetEvent: event,
      about: 'View Content',
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
  
  $scope.editType = function (item) {	
    $scope.showLoading(20000);
    $http.post($scope.url+'update-questionnaire', {field:'type', value:item.type, id:item.id})
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
    })
    .catch(e => {
        $loadingOverlay.hide();
        console.log(e);
    });
  };

  //----------------------------- Design Area -----------------------------//
    
  
  
  
  $scope.showDomains = function (event, item) {
    //console.log(item)
    event.stopPropagation(); // in case autoselect is enabled
    
    var promise;
	
	var parentEl = angular.element(document.body);
	promise = $mdDialog.show({
		parent: parentEl,
		templateUrl: 'views/questionnaire/domain/domain.html',
		targetEvent: event,
		locals: {
           item: item,
		   url: $scope.url
         },
		controller: 'questionnaireDomainCtrl',
		onComplete: afterShowAnimation,
		fullscreen: true
	});
    function afterShowAnimation(scope, element, options) {
       // post-show code here: DOM element focus, etc.
    }
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
    $http.post($scope.url+'delete-questionnaire', {ids:deletedIds})
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
  
  
  //----------------------------- Compare Questionnaires --------------------------//
  $scope.compareSelected = function() {
      var deletedIds = []
      if ($scope.selected.length != 2) {
          alert("يجب إختيار إستبيانين لإجراء المقارنة");
          return
      }
      for (var i =0; i < $scope.selected.length; i++) {
        deletedIds.push($scope.selected[i].id)  
      }
      
      window.open("compare/"+$scope.selected[0].id+"0"+$scope.selected[1].id)
     
  }
  
});




