var app = angular.module('reviewApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngLoadingOverlay']);

app.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
});

app.config(function($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default').primaryPalette('blue');
});

/*
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/survey/survey.html"
    })
});
*/
