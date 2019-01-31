<?php
if(session()->has('group_id')) {
	header('location:dashboard');
	exit;
}
?>
<!doctype html>
<html lang="{{ app()->getLocale() }}" dir="rtl">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>منصة البحث العلمي</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
		<link rel="stylesheet" type="text/css" href="css/angular-material.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/md-steppers.css"/>
		<link rel="stylesheet" type="text/css" href="css/research.app.css"/>
		
    </head>
    <body ng-app="researchApp" ng-cloak>

<div ng-controller="loginCtrl"  layout="column" style="height: 500px;" ng-cloak>
	
<div ng-view></div>
	
</div>
		
		<script type="text/javascript" src="<?php echo asset('js/angular.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-animate.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-aria.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-messages.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/route.min.js');?>"></script>
		
		<script type="text/javascript" src="<?php echo asset('js/angular-material.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-loading-overlay.js');?>"></script>
		
		<script type="text/javascript" src="<?php echo asset('js/auth.app.js');?>"></script>
    </body>
</html>
