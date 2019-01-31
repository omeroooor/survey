
app.controller('questionnaireQuestionCtrl', function($scope, item, questionnaire_id, $mdDialog, $mdEditDialog, $http, $loadingOverlay, $timeout) {
    console.log(item);
    $scope.item = item;
    $scope.url = "http://localhost:8000/";
  
  $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
    
  $scope.questions = []
    $http.get('get-questions')
    .then(function(response) {
        console.log(response.data.data)
        $scope.questions = response.data.data;
    })
    .catch(e => {
        console.log(e);
    });
    
  $scope.question = {
      questionnaire_id: questionnaire_id,
      questionnaire_domain_id: $scope.item.domain.id
  }  
    
  $scope.yesNoValues = [
    {value: 0, name: 'لا'},
    {value: 1, name: 'نعم'}
  ]  
  
  $scope.save = function() {
    $mdDialog.hide();
  };
  
  $scope.close = function(){
    $mdDialog.hide();
  };
  
  $scope.items = {
		count: item.questions.length,
		data: item.questions
	};
   
  console.log($scope.items);
  
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
		$http.post($scope.url+'update-questionnaire-question', {field:'name', value:input.$modelValue, id:item.id})
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
  
  
  
  
  $scope.editRequired = function (item) {	
    console.log(item)
    $scope.showLoading(20000);
    $http.post($scope.url+'update-questionnaire-question', {field:'is_required', value:item.is_required, id:item.id})
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
    })
    .catch(e => {
        $loadingOverlay.hide();
        console.log(e);
    });
  };
  
  $scope.editMeta = function (item) {	
    $scope.showLoading(20000);
    $http.post($scope.url+'update-questionnaire-question', {field:'as_meta', value:item.meta, id:item.id})
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
    })
    .catch(e => {
        $loadingOverlay.hide();
        console.log(e);
    });
  };
  
  //----------------------------- Add New Question --------------------------//
  $scope.addQuestion = function() {
      $scope.showLoading(20000);
    $http.post($scope.url+'questionnaire-question', $scope.question)
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
        $scope.items.data.push(response.data.data)
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
      //console.log($scope.selected)
      //console.log(deletedIds)
      //return
      $scope.showLoading(20000);
    $http.post($scope.url+'delete-questionnaire-question', {ids:deletedIds})
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