
app.controller('questionnaireDomainCtrl', function($scope, item, $mdDialog, $mdEditDialog, $http, $loadingOverlay, $timeout) {
    console.log(item);
    $scope.item = item;
    $scope.url = "http://localhost:8000/";
  
  $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
    
   $scope.domains = []
    $http.get('domains')
    .then(function(response) {
        console.log(response.data.data)
        $scope.domains = response.data.data;
    })
    .catch(e => {
        console.log(e);
    });
    
  $scope.yesNoValues = [
    {value: 0, name: 'لا'},
    {value: 1, name: 'نعم'}
  ]
    
  $scope.domain = {
      questionnaire_id: $scope.item.id
  }  
  
  $scope.save = function() {
    $mdDialog.hide();
  };
  
  $scope.close = function(){
    $mdDialog.hide();
  };
  
  $scope.items = {
		count: $scope.item.domains.length,
		data: $scope.item.domains
	};
  console.log($scope.items)
  
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
    $scope.showLoading(20000);
    $http.post($scope.url+'update-questionnaire-domain', {field:'is_required', value:item.is_required, id:item.id})
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
    $http.post($scope.url+'update-questionnaire-domain', {field:'as_meta', value:item.as_meta, id:item.id})
    .then( response => {
        $loadingOverlay.hide();
        console.log(response.data);
    })
    .catch(e => {
        $loadingOverlay.hide();
        console.log(e);
    });
  };
  
 
  //----------------------------- Add New Domain --------------------------//
  $scope.addNewDomain = function() {
      $scope.showLoading(20000);
    $http.post($scope.url+'questionnaire-domain', $scope.domain)
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
  
    //----------------------------- Design Area -----------------------------//
    
  
  
  
  $scope.showQuestions = function (event, item) {
    //console.log($scope.item)
    event.stopPropagation(); // in case autoselect is enabled
    
    var promise;
	
	var parentEl = angular.element(document.body);
	promise = $mdDialog.show({
		parent: parentEl,
		templateUrl: 'views/questionnaire/domain/question/question.html',
		targetEvent: event,
		locals: {
           questionnaire_id: $scope.item.id,
           item: item,
		   url: $scope.url
         },
		controller: 'questionnaireQuestionCtrl',
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
    $http.post($scope.url+'delete-questionnaire-domain', {ids:deletedIds})
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