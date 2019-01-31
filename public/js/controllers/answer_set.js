app.controller('answerSetCtrl', function ($http, $loadingOverlay, $mdEditDialog, $q, $scope, $timeout, $mdDialog) {
  'use strict';
  
    tinymce.init({ 
        selector:'textarea',
        menubar: '',
    });
  
    $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
    };
	
	$scope.contentUpdated = function(event) {
		console.log(event);
	}
	
	$scope.items = {
		count: 0,
		data: []
	};
	
  $scope.answerSetTypes = [
    {value:'radiogroup', name:'إختيار واحدة من مجموعة قيم'},
    {value:'checkbox', name:'إختيار عدة أو كل القيم'},
    {value:'text', name:'نص'}
    ];
  $scope.answerSetValueNo = 0;
  $scope.value = {name:'',text_color:'',bg_color:'',value:''};
  
  $scope.answerSetValues = [];
  
  
  $scope.typeChanged = function(){
	if($scope.answerSet.type == "radiogroup" || $scope.answerSet.type == "checkbox") {
		console.log($scope.answerSetTypes);
	}
  }
  
  $scope.addToValues = function() {
    $scope.answerSetValues.push({name:$scope.value.name, text_color:$scope.value.text_color, bg_color: $scope.value.bg_color, value:$scope.value.value})  
  }
  
  $scope.removeFromValues = function(index) {
      //var index = $scope.answerSetValues.indexOf(value);
      $scope.answerSetValues.splice(index, 1);
  }
  
  // ------------- Tinymce functions area -------------
  
  
 
  
  // ---------------------------------------------------
  $scope.url = "http://localhost:8000/";
  $scope.content = "";
  $scope.saveAnswerSet = function() {
	
	
	var formdata = new FormData();
	formdata.append('name', $scope.answerSet.name);
	formdata.append('description', $scope.answerSet.description);
	formdata.append('type', $scope.answerSet.type);
	formdata.append('values', JSON.stringify($scope.answerSetValues));
	
	
	console.log('------------ Form Data ------------');
	console.log(formdata);
	//console.log(planItemContent);
	$http.post($scope.url+'answer-set', formdata, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
	.then(response => {
		console.log(response);
		$scope.answerSet.name = "";
		$scope.answerSet.description = "";
		$scope.answerSet.type = "";
        $scope.answerSetValues = [];
	})
	.catch(e => {
		console.log(e);
	});
  }
  
  
  
  //----------------------------- view area -------------------------//
  //------------ Table View Control Area ----------//
		
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
	$http.get("answer-sets")
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
    $scope.updateItemType = function(item) {
	if(item.type == 'undefined') {
	  return;
	}
		
	$scope.showLoading(20000);
	$http.post($scope.url+'update-answer-set', {field:'type', type:'varchar', value:item.type, id:item.id})
	.then( response => {
		$loadingOverlay.hide();
		console.log(response.data);
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
  }
  
  $scope.editTitle = function (event, item) {
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
		$http.post($scope.url+'update-answer-set', {field:'name', value:input.$modelValue, id:item.id})
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
  
  $scope.editDescription = function (event, item) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: item.description,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-answer-set', {field:'description', value:input.$modelValue, id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.description = input.$modelValue;
      },
      targetEvent: event,
      description: 'View Description',
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
  
  
  
  
  
  
  $scope.showValues = function (event, item) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var promise;
	
	var parentEl = angular.element(document.body);
	promise = $mdDialog.show({
		parent: parentEl,
		templateUrl: 'dialogs/dialog.html',
		targetEvent: event,
		locals: {
           item: item,
		   url: $scope.url
         },
		controller: 'dialogCtrl',
		onComplete: afterShowAnimation,
		fullscreen: true
	});
    function afterShowAnimation(scope, element, options) {
       // post-show code here: DOM element focus, etc.
    }
  };
  
});




