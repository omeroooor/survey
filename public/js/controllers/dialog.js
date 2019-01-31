
app.controller('dialogCtrl', function($scope, item, $mdDialog, $mdEditDialog, $http, $loadingOverlay, $timeout) {
    //console.log(item);
    $scope.item = item;
    $scope.url = "http://localhost:8000/";
  
  $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
  
  $scope.save = function() {
    $mdDialog.hide();
  };
  
  $scope.close = function(){
    $mdDialog.hide();
  };
  
  $scope.values = {
		count: item.values.length,
		data: item.values
	};
   
  console.log($scope.values);
  
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
  
  
  //------------------------------- Edit Area ----------------------------//
  $scope.editName = function (event, item) {
    event.stopPropagation();
    
    var editDialog = {
      modelValue: item.name,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-answer-set-value', {field:'name', value:input.$modelValue, id:item.id})
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
  
  $scope.editFontColor = function (event, item) {
    event.stopPropagation();
    
    var editDialog = {
      modelValue: item.text_color,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-answer-set-value', {field:'text_color', value:input.$modelValue, id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.text_color = input.$modelValue;
      },
      targetEvent: event,
      name: 'View Content',
      type: 'color'
    };
    var promise;
    promise = $mdEditDialog.large(editDialog);
    //promise = $mdEditDialog.small(editDialog);
	  
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
        input.type="color"
      });
    });
  };
  
  $scope.editBackgroundColor = function (event, item) {
    event.stopPropagation();
    
    var editDialog = {
      modelValue: item.bg_color,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-answer-set-value', {field:'bg_color', value:input.$modelValue, id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.bg_color = input.$modelValue;
      },
      targetEvent: event,
      name: 'View Content',
      type: 'color'
    };
    var promise;
    promise = $mdEditDialog.large(editDialog);
    //promise = $mdEditDialog.small(editDialog);
	  
    promise.then(function (ctrl) {
      var input = ctrl.getInput('color');
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };
  
  $scope.editValue = function (event, item) {
    event.stopPropagation();
    
    var editDialog = {
      modelValue: item.value,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-answer-set-value', {field:'value', value:input.$modelValue, id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.value = input.$modelValue;
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
  
  
  //---------------------------------------- create new value -------------------------//
  $scope.value = {text_color: '#000', bg_color: '#fff', answer_set_id: $scope.item.id};
  $scope.addNewValue = function(){
    $scope.showLoading(20000);
    $http.post($scope.url+'answer-set-value', $scope.value)
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
        $scope.values.data.push(response.data.data)
    })
    .catch(e => {
        $loadingOverlay.hide();
        console.log(e);
    });  
  }
  
   
  //----------------------------- Delete Question/s --------------------------//
  $scope.deleteSelected = function() {
    var deletedIds = []
    for (var i =0; i < $scope.selected.length; i++) {
      deletedIds.push($scope.selected[i].id)  
    }
    $scope.showLoading(20000);
    $http.post($scope.url+'delete-answer-set-value', {ids:deletedIds})
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
        for (var i =0; i < $scope.selected.length; i++) {
          for (var j = 0; j < $scope.values.data.length; j++) {
              if ($scope.selected[i].id == $scope.values.data[j].id) {
                  var index = $scope.values.data.indexOf($scope.values.data[j]);
                  $scope.values.data.splice(index, 1);
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