<!DOCTYPE html>
<html>
    <head>
        <title>Pivot Demo</title>
        <link rel="stylesheet" href="<?php echo asset('survey/css/pivot/pivot.css');?>"/>
        
        <link rel="stylesheet" href="<?php echo asset('css/angular-material.min.css');?>"/>
        <link rel="stylesheet" href="<?php echo asset('css/research.app.css');?>"/>
        <link rel="stylesheet" href="<?php echo asset('css/fontawesome/css/fontawesome-all.min.css');?>"/>
        <style>
            body {font-family: Verdana;}
        </style>
    </head>
    <body dir="rtl" ng-app="reviewApp" ng-cloak>
    <div ng-controller="reviewMainCtrl" layout="column" style="height: 500px;" ng-cloak>
        <md-toolbar class="md-hue-2">
            <div class="md-toolbar-tools">
                <?php
                $questions = json_decode($questions);
                //print_r($questions);
                
                foreach($questions as $question) {
                    if($question->type == 'radiogroup') {
                        echo $question->name.": <select md-select id='".$question->question_id."' class='filter'>
                            <option value='0' md-option>الكل</option>
                        ";
                            foreach($question->values as $value) {
                                echo "<option value='".$value->id."' md-option>".$value->name."</option>";
                            }
                        echo"</select>";
                    } else {
                        //print_r($question->textAnswers);
                        echo $question->name.": <select id='".$question->question_id."' class='filter'>
                            <option value='0'>الكل</option>
                        ";
                            foreach($question->textAnswers as $value) {
                                echo "<option value='".$value."'>".$value."</option>";
                            }
                        echo"</select> ";
                    }
                }
                
                
                ?>
                <button md-button onclick="loadData()"><i class="fas fa-sync"></i></button>
            </div>
        </md-toolbar>
        <input type="hidden" id="questionnaireId" value="<?=$id?>">
        <div id="output" style="margin: 30px;"></div>

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
        <script type="text/javascript" src="<?php echo asset('survey/js/jquery-ui.min.js');?>"></script>
        <script type="text/javascript" src="<?php echo asset('survey/js/pivot/pivot.js');?>"></script>
        <script type="text/javascript" src="<?php echo asset('survey/js/pivot.js');?>"></script>
    </body>
</html>
