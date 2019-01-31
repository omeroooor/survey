<!DOCTYPE html>
<html>
    <head>
        <title>Single line text - Text question, jQuery Survey Library Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="<?php echo asset('survey/css/style.css');?>"/>
        
        <link rel="stylesheet" href="<?php echo asset('css/angular-material.min.css');?>"/>
        <link rel="stylesheet" href="<?php echo asset('css/research.app.css');?>"/>
        <link rel="stylesheet" href="<?php echo asset('css/fontawesome/css/fontawesome-all.min.css');?>"/>
    </head>
    <body dir="rtl" ng-app="reviewApp" ng-cloak>
    
    <div ng-controller="reviewMainCtrl" layout="column" style="height: 500px;" ng-cloak>

        

        <md-toolbar class="md-hue-2">
            <div class="md-toolbar-tools"></div>
        </md-toolbar>
        
        
        
        <input type="hidden" ng-model="data.questionnaireIds" id="questionnaireIds" ng-value="{{<?=$ids?>}}">
        <center>
            <div class="sheet">
                <div id="reviewResult"></div>
       
                <div id="charts" style="width:100%;" layout="column"></div>
            </div>
        </center>    
    </div>    
        
		
		<script type="text/javascript" src="<?php echo asset('js/angular.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-animate.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-aria.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-messages.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/route.min.js');?>"></script>
		
		<script type="text/javascript" src="<?php echo asset('js/angular-material.min.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/angular-loading-overlay.js');?>"></script>
        
		<script type="text/javascript" src="<?php echo asset('js/review.app.js');?>"></script>
		<script type="text/javascript" src="<?php echo asset('js/controllers/review.js');?>"></script>
        
        <script type="text/javascript" src="<?php echo asset('survey/js/jquery.js');?>"></script>
        <script type="text/javascript" src="<?php echo asset('survey/js/d3.v5.min.js');?>"></script>
        <script type="text/javascript" src="<?php echo asset('survey/js/chart.js');?>"></script>
        <script type="text/javascript" src="<?php echo asset('survey/js/compare.js');?>"></script>

    </body>
</html>