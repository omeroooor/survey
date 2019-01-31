app.controller('planViewCtrl', function ($http, $loadingOverlay, $mdEditDialog, $q, $scope, $timeout, $mdDialog) {
	'use strict';
	$scope.url = "http://localhost:8000/";
	
	 
  // ----------------- Generic functions  -------------------//
  $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
	};
  // -------------------------------------------------------//
	
	$scope.items = {
		count: 0,
		data: []
	};
	
	$scope.loadPlanItems = function () {
		$scope.showLoading(20000);
		$http.get($scope.url+'plan-items')
		.then( response => {
			$loadingOverlay.hide();
			$scope.items.count = response.data.data.length;
			$scope.items.data = response.data.data;
			console.log($scope.items);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
	}
	
	$scope.loadPlanItems();
	
	
	
	//------------ Table View Control Area ----------//
		
  $scope.itemTypes = [];
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
    order: 'title',
    limit: 5,
    page: 1
  };
  
  $scope.updateItemUpper = function(item) {
	//console.log(item.upper_id);
	//return;
	if(item.upper_id == 'undefined') {
	  return;
	}
		
	$scope.showLoading(20000);
	$http.post($scope.url+'update-plan-item', {field:'upper', type:item.type.code, value:item.upper_id, id:item.id})
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
      modelValue: item.title,
      placeholder: 'View Content',
      save: function (input) {
        if(input.$modelValue == '') {
          input.$invalid = true;
          return $q.reject();
        }
		
		$scope.showLoading(20000);
		$http.post($scope.url+'update-plan-item', {field:'title', type:item.type.code, value:input.$modelValue, id:item.id})
		.then( response => {
			$loadingOverlay.hide();
			console.log(response.data);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
		
        item.title = input.$modelValue;
      },
      targetEvent: event,
      title: 'View Content',
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
  
  $scope.editContent = function (event, item) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var promise;
    
    //promise = $mdEditDialog.large(editDialog);
    //promise = $mdEditDialog.small(editDialog);
	
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
	
	function afterShowAnimation(scope, element, item) {
	   // post-show code here: DOM element focus, etc.
	   console.log('Dialog was Loaded');
	   console.log(scope);
	   if(scope.item.type.code == "chapter" || scope.item.type.code == "p" || scope.item.type.code == "heading" || scope.item.type.code == "subheading") {
		tinymce.remove();
		var e1 = angular.element(document.getElementById("contentHolder"));
		var input = document.createElement('textarea');
		input.setAttribute('ng-model', 'item.content');
		input.setAttribute('id', 'planItemContent');
		input.setAttribute('name', 'planItemContent');
		input.value = scope.item.content;
		
		e1.append(input);
		
		tinymce.init({ 
			selector:'textarea',
			menubar: '',
			init_instance_callback: function(editor) {
			  var textContentTrigger = function() {
				scope.item.content = editor.getContent({format : 'raw'});
				scope.$apply();
			  };
			  editor.on('KeyUp', textContentTrigger);
			  editor.on('ExecCommand', textContentTrigger);
			  editor.on('SetContent', function(e) {
				if(!e.initial)
				  textContentTrigger();
			  });
			  
			}
		});
	}
	
	if(scope.item.type.code == "table") {
		tinymce.remove();
		var e1 = angular.element(document.getElementById("contentHolder"));
		
		var input = document.createElement('textarea');
		input.setAttribute('ng-model', 'item.content');
		input.setAttribute('id', 'planItemContent');
		input.setAttribute('name', 'planItemContent');
		input.value = scope.item.content;
		
		//e1.html("<textarea ui-tinymce ng-model='item.content' name='planItemContent' id='planItemContent'></textarea>");
		
		e1.append(input);
		
		tinymce.init({ 
			selector:'textarea',
			menubar: 'table',
			plugins: "table",
			 init_instance_callback: function(editor) {
			  var textContentTrigger = function() {
				scope.item.content = editor.getContent({format : 'raw'});
				scope.$apply();
			  };
			  editor.on('KeyUp', textContentTrigger);
			  editor.on('ExecCommand', textContentTrigger);
			  editor.on('SetContent', function(e) {
				if(!e.initial)
				  textContentTrigger();
			  });
			  
			}
		});
	}
	
	if(scope.item.type.code == "list") {
		tinymce.remove();
		var e1 = angular.element(document.getElementById("contentHolder"));
		var input = document.createElement('textarea');
		input.setAttribute('ng-model', 'item.content');
		input.setAttribute('id', 'planItemContent');
		input.setAttribute('name', 'planItemContent');
		input.value = scope.item.content;
			
		e1.append(input);
		
		tinymce.init({ 
			selector:'textarea',
			menubar: '',
			plugins: "lists",
			 init_instance_callback: function(editor) {
			  var textContentTrigger = function() {
				scope.plan.content = editor.getContent({format : 'raw'});
				scope.$apply();
			  };
			  editor.on('KeyUp', textContentTrigger);
			  editor.on('ExecCommand', textContentTrigger);
			  editor.on('SetContent', function(e) {
				if(!e.initial)
				  textContentTrigger();
			  });
			  
			}
		});
	}
	
	if(scope.item.type.code == "img" || scope.item.type.code == "diagram") {
		tinymce.remove();
		var e1 = document.getElementById("contentHolder");
		e1.innerHTML = "";
		
		
		var label = document.createElement('label');
		label.setAttribute('for', 'planItemContent');
		
		var img = document.createElement('img');
		img.setAttribute('src', 'uploads/'+scope.item.content);
		img.setAttribute('id', 'contentPreview');
		img.setAttribute('title', 'Click here to update image');
		
		var input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.setAttribute('ng-model', 'content');
		input.setAttribute('id', 'planItemContent');
		input.setAttribute('name', 'planItemContent');
		input.setAttribute('style', 'display:none');
		
		label.appendChild(img);
		
		e1.append(label);
		e1.append(input);
		//e1.append(dsiplayArea);
		
		input.onchange = function() {
		  var img = document.getElementById("contentPreview");
		  var reader  = new FileReader();

		   reader.onloadend = function () {
				console.log('Image Loaded');
				console.log(reader.result);
			    img.src = reader.result;
		   }
		   
		  var file = this.files[0];
		  reader.readAsDataURL(file);
		  console.log('new file is');
		  console.log(file);
		  scope.item.content = file;
		  scope.$apply();
		};
		//input.click();
	}
}

	function imageLoaded(src) {
		var img = document.getElementById("planItemContent");
		img.setAttribute('src',src);
	}
    
    promise.then((ctrl) => {
      
	  //var input = ctrl.getInput();
      /*
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
	  */
	  console.log('ctrl');
    });
  };
  
  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };
  
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      $scope.loadPlanItems();
    }, 2000);
  }
  
  $scope.logItem = function (item) {
    console.log(item.title, 'was selected');
  };
  
  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  };
 
});




app.controller('dialogCtrl', function ($scope, $http, $loadingOverlay, $mdDialog, $timeout, item, url) {
	'use strict';
	
	//console.log('Dialog Controller is loaded');
	$scope.dialogContent = "starting Point";
	
	$scope.item = item;
	$scope.closeDialog = function() {
	  $mdDialog.hide();
	}
	
	$scope.save = function(content) {
	  $scope.updateModel('content', item);
	}
	
	// ----------------- Generic functions  -------------------//
  $scope.showLoading = function (duration) {
		$loadingOverlay.show('<img src="imgs/loading.gif">');
		$timeout(function () {
			$loadingOverlay.hide();
		}, duration);
	};
	
  $scope.updateModel = function(field, item) {
	//console.log(item);
	//return;
	
	var formdata = new FormData();
	formdata.append('field', field);
	formdata.append('type', item.type.code);
	formdata.append('value', item.content);
	formdata.append('id', item.id);
	
	$scope.showLoading(20000);
	$http.post(url+'update-plan-item', formdata, {
		transformRequest: angular.identity,
		headers: {'Content-Type': undefined}
	})
	.then( response => {
		$loadingOverlay.hide();
		if(item.type.code == 'img') {
			item.content = response.data.data;
		}
		console.log(response.data);
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
  }
  // -------------------------------------------------------//
	
});
 
