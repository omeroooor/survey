<!doctype html>
<html lang="{{ app()->getLocale() }}" dir="rtl">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>مركز القياس والتقييم</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
		<link rel="stylesheet" type="text/css" href="css/angular-material.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/research.app.css"/>
		<link rel="stylesheet" type="text/css" href="css/fontawesome/css/fontawesome-all.min.css">
		<link rel="stylesheet" type="text/css" href="css/md-data-table.min.css"/>

		
		<style type="text/css">
			body,
		md-content {
		  background-color: #f5f5f5 !important;
		}

		body > md-toolbar {
		  z-index: 3;
		}

		md-toolbar.md-table-toolbar.alternate {
		  color: #1e88e5;
		  background-color: #e3f2fd;
		}

		md-toolbar.md-table-toolbar.alternate .md-toolbar-tools {
		  font-size: 16px;
		}

		md-card:first-child {
		  padding: 8px 8px 8px 24px;
		}

		.checkboxes > md-checkbox {
		  margin: 0;
		  padding: 16px;
		  min-width: 300px;
		  flex: 0 0 auto;
		}
	</style>
    </head>
<body ng-app="visitorApp" ng-cloak>


<div ng-controller="visitorCtrl"  layout="column" style="height: 500px;" ng-cloak>

<md-toolbar class="md-hue-2">
  <div class="md-toolbar-tools">
	<h2 flex md-truncate>مركز القياس والتقييم</h2>
    <span flex></span>
    <a href="/auth">
      <i class="fas fa-user"></i>
    </a>
  </div>
</md-toolbar>

<md-nav-bar
      md-no-ink-bar="disableInkBar"
      md-selected-nav-item="currentNavItem"
      nav-bar-aria-label="navigation links">
      <md-nav-item md-nav-click="goto('1')" name="1" flex-gt-xs="50">
        الموظفون
      </md-nav-item>
      <md-nav-item md-nav-click="goto('2')" name="2" ng-disabled="secondTabDisabled" flex-gt-xs="50">
        العملاء
      </md-nav-item>
    </md-nav-bar>
    <div class="ext-content">
    
      <md-button class="" ng-click="loadSurvey(item)" ng-repeat="item in items">
          <md-card>
        
            <md-toolbar class="md-table-toolbar md-default" ng-hide="options.rowSelection && selected.length">
              <div class="md-toolbar-tools">
                <span>{{item.name}}</span>
              </div>
            </md-toolbar>
            <md-card-content>
                <p>{{item.about}}</p>
            </md-card-content>
             
            <md-card-footer layout="row" layout-align="end center">
               <i class="fas fa-copy"></i>&nbsp;&nbsp;عدد المحاور: {{item.domains.length}}
               <span flex></span>
               <i class="fas fa-list-ol"></i>&nbsp;&nbsp;عدد الأسئلة: {{questionsNo(item.domains)}}
            </md-card-footer>
            
            </md-card-content>
             
            <md-card-footer layout="row" layout-align="end center">
               <i class="fas fa-calendar" style="color:green"></i>&nbsp;&nbsp;{{item.start_date}}
               <span flex></span>
               <i class="fas fa-calendar" style="color:red"></i>&nbsp;&nbsp;{{item.end_date}}
            </md-card-footer>
            
        </md-card>
      </md-button>
      
      
    </div>
	
</div>
		
		<script type="text/javascript" src="<?php echo asset('js/angular.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-animate.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-aria.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-messages.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/route.min.js');?>"></script>
		
		<script type="text/javascript" src="<?php echo asset('js/angular-material.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-loading-overlay.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/md-data-table.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-ui-tinymce/tinymce.min.js');?>"></script>
		
		<script type="text/javascript" src="<?php echo asset('js/visitor.app.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/visitor.app.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/survey.js');?>"></script>
		
		
		<script type="text/javascript" src="<?php echo asset('tinymce/tinymce.min.js');?>"></script>
		<script type="text/javascript" src="js/jquery-1.12.4.js"></script>
		
		<script type="text/javascript">
				
		</script>
    </body>
</html>
