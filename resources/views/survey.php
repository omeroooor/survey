<!DOCTYPE html>
<html>
    <head>
        <title>Single line text - Text question, jQuery Survey Library Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="<?php echo asset('survey/css/survey.css');?>"/>
        <link rel="stylesheet" href="<?php echo asset('survey/css/index.css');?>"/>

    </head>
    <body dir="rtl">
        <input type="hidden" id="questionnaireId" value="<?=$id?>">
        <div id="surveyElement"></div>
        <div id="surveyResult"></div>

        <script type="text/javascript" src="<?php echo asset('survey/js/jquery.js');?>"></script>
        <script type="text/javascript" src="<?php echo asset('survey/js/survey.jquery.js');?>"></script>
        <script type="text/javascript" src="<?php echo asset('survey/js/script.js');?>"></script>
    </body>
</html>