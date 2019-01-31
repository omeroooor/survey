app.controller('questionCtrl', function ($http, $loadingOverlay, $mdEditDialog, $q, $scope, $timeout, $mdDialog) {
  'use strict';
  
    $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
 
 
    
    $scope.answerSets = []
	$http.get("answer-sets")
	.then(function(response) {
		$loadingOverlay.hide();
		console.log(response.data);
		$scope.answerSets = response.data.data;
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
  
  // ---------------------------------------------------
  $scope.url = "http://localhost:8000/";
  $scope.content = "";
  $scope.saveQuestion = function() {
	
	
	var formdata = new FormData();
	formdata.append('name', $scope.question.name);
	formdata.append('answerSet', $scope.question.answerSet);
	
	
	console.log('------------ Form Data ------------');
	console.log(formdata);
	//console.log(planItemContent);
	$http.post($scope.url+'question', formdata, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
	.then(response => {
		console.log(response);
		$scope.question.name = "";
		$scope.question.answerSet = "";
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
	$http.get('get-questions')
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
		$http.post($scope.url+'update-question', {field:'name', value:input.$modelValue, id:item.id})
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
    $http.post($scope.url+'update-question', {field:'answer_set_id', value:item.answer_set.id, id:item.id})
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
    $http.post($scope.url+'delete-question ', {ids:deletedIds})
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

  
});




