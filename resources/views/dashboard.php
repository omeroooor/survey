<?php
if(!session()->has('user_id')) {
	header('location:/');
	exit;
}
?>
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
		<link rel="stylesheet" type="text/css" href="css/fontawesome/css/fontawesome-all.min.css"/>
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
<body ng-app="researchApp" ng-cloak>


<div ng-controller="dashboardCtrl"  layout="column" style="height: 500px;" ng-cloak>

<md-toolbar class="md-hue-2">
  <div class="md-toolbar-tools">

	<md-button ng-click="toggleLeft()" class="md-icon-button" aria-label="Favorite">
	  <md-icon md-svg-icon="imgs/icons/ic_menu_white_24px.svg" style="color: #fff;" ng-if="!isToggled"></md-icon>
	  <!--md-icon md-svg-icon="imgs/icons/ic_close_white_24px.svg" style="color: #fff;" ng-if="isToggled"></md-icon-->
	</md-button>
	
	<h2 flex md-truncate>مركز القياس والتقييم</h2>
	
  </div>
</md-toolbar>

<md-sidenav
		class="md-sidenav-right"
		md-component-id="left">

  <md-toolbar class="md-theme-indigo">
	<h1 class="md-toolbar-tools">القائمة</h1>
  </md-toolbar>
   <md-content no-padding>
   
	 <md-list class="md-theme-indigo">
   
		<!-- Dashboard Area -->
		<md-list-item role="listitem" class="_md-button-wrap _md md-clickable" ng-href="#!/">
            <div>
                <i class="fa fa-tachometer-alt"></i> &nbsp;&nbsp;
                لوحة التحكم
            </div>
		</md-list-item>
		<md-divider></md-divider>
		
		<!-- Tasks Area -->
		<md-subheader class="md-no-sticky">
			<i class="fa fa-tasks"></i> &nbsp;
			الإستبيانات
		</md-subheader>
		<md-list-item role="listitem" ng-href="#!new-questionnaire">
			إستبيان جديد
		</md-list-item>
		<md-list-item role="listitem" ng-href="#!view-questionnaires">
			الإستبيانات
		</md-list-item>
		
		<md-divider></md-divider>
		
		<!-- Tasks Area -->
		<md-subheader class="md-no-sticky">
			<i class="fa fa-tasks"></i> &nbsp;
			المحاور
		</md-subheader>
		<md-list-item role="listitem" ng-href="#!new-domain">
			محور جديد
		</md-list-item>
		<md-list-item role="listitem" ng-href="#!view-domains">
			المحاور
		</md-list-item>
		
		<md-divider></md-divider>
		
		<md-subheader class="md-no-sticky">
			<i class="fa fa-tasks"></i> &nbsp;
			الأسئلة
		</md-subheader>
		<md-list-item role="listitem" ng-href="#!new-question">
			سؤال جديد
		</md-list-item>
		<md-list-item role="listitem" ng-href="#!view-questions">
			الأسئلة
		</md-list-item>
        
		<md-divider></md-divider>
		
		<!-- Plan Area -->
		<md-subheader class="md-no-sticky">
			<i class="fas fa-road"></i> &nbsp;
			أطقم الإجابات
		</md-subheader>
		<md-list-item role="listitem" ng-href="#!new-answer-set">
            طقم إجابات جديد
		</md-list-item>
		<md-list-item role="listitem" ng-href="#!view-answer-sets">
			عرض أطقم الإجابات
		</md-list-item>
        
		<md-divider></md-divider>
		
		<!-- Group Area -->
		<md-subheader class="md-no-sticky">
			<i class="fa fa-users"></i> &nbsp;
			إدارة المستخدمون
		</md-subheader>
		<md-list-item role="listitem" ng-href="#!add-user">
			إضافة مستخدم جديد
		</md-list-item>
		<md-list-item role="listitem" ng-href="#!view-users">
			عرض المستخدمون
		</md-list-item>
	 
   
   
		<md-list-item role="listitem" ng-href="logout">
			تسجيل الخروج
		</md-list-item>
		
	</md-list> 
  </md-content>
</md-sidenav>

<div ng-view></div>
	
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
		
		<script type="text/javascript" src="<?php echo asset('js/dashboard.app.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/dashboard.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/question.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/users.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/answer_set.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/plan.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/view_plan.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/domain.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/questionnaire.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/questionnaire_domain.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/questionnaire_question.js');?>"></script>
        
		<script type="text/javascript" src="<?php echo asset('js/controllers/dialog.js');?>"></script>
		
		
		<script type="text/javascript" src="<?php echo asset('tinymce/tinymce.min.js');?>"></script>
		<script type="text/javascript" src="js/jquery-1.12.4.js"></script>
		<script type="text/javascript" src="js/jquery.nestable.js"></script>
		
		<script type="text/javascript">
				
		</script>
    </body>
</html>
