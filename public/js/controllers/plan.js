app.controller('planCtrl', function ($http, $loadingOverlay, $mdEditDialog, $q, $scope, $timeout) {
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
	
	$scope.showLoading(20000);
	$http.get("plan-item-types")
	.then(function(response) {
		//$loadingOverlay.hide();
		console.log(response.data);
		$scope.itemTypes = response.data;
		
		$http.get($scope.url+'plan-items')
		.then( response => {
			$loadingOverlay.hide();
			$scope.items = response.data.data;
			console.log($scope.items);
		})
		.catch(e => {
			$loadingOverlay.hide();
			console.log(e);
		});
	})
	.catch(e => {
		$loadingOverlay.hide();
		console.log(e);
	});
	
	$scope.loadPlanItems = function () {
		
	}
	$scope.items = [];
	$scope.plan = {}
	
  $scope.itemTypes = [];
  
  
  $scope.typeChanged = function(){
	console.log($scope.plan.type);
	if($scope.plan.type.code == "chapter" || $scope.plan.type.code == "p" || $scope.plan.type.code == "heading" || $scope.plan.type.code == "subheading") {
		$scope.getTextEditor();
	}
	if($scope.plan.type.code == "table") {
		$scope.getTableEditor();
	}
	if($scope.plan.type.code == "list") {
		$scope.getListEditor();
	}
	if($scope.plan.type.code == "img" || $scope.plan.type.code == "diagram") {
		$scope.getImageEditor();
	}
  }
  
  // ------------- Tinymce functions area -------------
  $scope.getTextEditor = function() {
	tinymce.remove();
	var e1 = angular.element(document.getElementById("contentHolder"));
	e1.html("<textarea ui-tinymce ng-model='content' name='planItemContent' id='planItemContent'></textarea>");
	
	tinymce.init({ 
		selector:'textarea',
		menubar: '',
		init_instance_callback: function(editor) {
          var textContentTrigger = function() {
            $scope.plan.content = editor.getContent({format : 'raw'});
            $scope.$apply();
          };
          editor.on('KeyUp', textContentTrigger);
          editor.on('ExecCommand', textContentTrigger);
          editor.on('SetContent', function(e) {
            if(!e.initial)
              textContentTrigger();
          });
		  
        }
	});
  };
  
  $scope.getTableEditor = function() {
	console.log("Called");
	tinymce.remove();
	var e1 = angular.element(document.getElementById("contentHolder"));
	e1.html("<textarea ui-tinymce ng-model='content' name='planItemContent' id='planItemContent'></textarea>");
	
	tinymce.init({ 
		selector:'textarea',
		menubar: 'table',
		plugins: "table",
		 init_instance_callback: function(editor) {
          var textContentTrigger = function() {
            $scope.plan.content = editor.getContent({format : 'raw'});
            $scope.$apply();
          };
          editor.on('KeyUp', textContentTrigger);
          editor.on('ExecCommand', textContentTrigger);
          editor.on('SetContent', function(e) {
            if(!e.initial)
              textContentTrigger();
          });
		  
        }
	});
  };
  
  $scope.getListEditor = function() {
	tinymce.remove();
	var e1 = angular.element(document.getElementById("contentHolder"));
	e1.html("<textarea ui-tinymce ng-model='content' name='planItemContent' id='planItemContent'></textarea>");
	
	tinymce.init({ 
		selector:'textarea',
		menubar: '',
		plugins: "lists",
		 init_instance_callback: function(editor) {
          var textContentTrigger = function() {
            $scope.plan.content = editor.getContent({format : 'raw'});
            $scope.$apply();
          };
          editor.on('KeyUp', textContentTrigger);
          editor.on('ExecCommand', textContentTrigger);
          editor.on('SetContent', function(e) {
            if(!e.initial)
              textContentTrigger();
          });
		  
        }
	});
  };
  
  
  
  $scope.getImageEditor = function() {
	tinymce.remove();
	var e1 = document.getElementById("contentHolder");
	e1.innerHTML = "";
	
	var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('ng-model', 'content');
    input.setAttribute('id', 'planItemContent');
    input.setAttribute('name', 'planItemContent');
	
	//var dsiplayArea = document.createElement('div');
	//dsiplayArea.append('<div id="fileDisplayArea"></div>');
	
	
	e1.append(input);
	//e1.append(dsiplayArea);
	
	input.onchange = function() {
      var file = this.files[0];
      $scope.plan.content = file;
	  $scope.$apply();
    };
    input.click();
  };
  
  // ---------------------------------------------------
  $scope.url = "http://localhost:8000/";
  $scope.content = "";
  $scope.saveItem = function() {
	//var planItemContent = document.getElementById("planItemContent").value;
	//$scope.plan.content = planItemContent;
	//$scope.$apply();
	
	/*
	var myForm = document.getElementById("plan_item_form");
	//alert(myForm);
	var formdata = new FormData(myForm);
	*/
	
	var formdata = new FormData();
	formdata.append('title', $scope.plan.title);
	formdata.append('upper', $scope.plan.upper);
	formdata.append('type', $scope.plan.type.id);
	formdata.append('content', $scope.plan.content);
	
	/*
	if($scope.plan.type.code == 'img' || $scope.plan.type.code == 'diagram') {
		var myfile = document.getElementById("planItemContent");
		alert(myfile.files[0]);
		//formdata.append('content', myfile.files[0], 'planItemContent');
		formdata.append('content', $scope.plan.content);
	} else {
		formdata.append('content', $scope.plan.content);
	}
	*/
	
	console.log($scope.plan);
	console.log('------------ Form Data ------------');
	console.log(formdata);
	//console.log(planItemContent);
	$http.post($scope.url+'plan-item', formdata, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
	.then(response => {
		console.log(response);
		$scope.plan.title = "";
		$scope.plan.upper = "";
		$scope.plan.type.id = "";
		$scope.plan.content = "";
	})
	.catch(e => {
		console.log(e);
	});
  }
  
});




