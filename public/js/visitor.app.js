var app = angular.module('visitorApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngLoadingOverlay', 'md.data.table', 'ui.tinymce']);

app.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
});

app.config(function($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default').primaryPalette('blue');
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/survey/survey.html"
    })
    .when("/new-group", {
        templateUrl : "new_group.html"
    })
    .when("/dashboard", {
        templateUrl : "dashboard.html"
    })
    .when("/add-question", {
        templateUrl : "questions/add.html"
    })
    .when("/view-questions", {
        templateUrl : "questions/view.html"
    })
    .when("/add-user", {
        templateUrl : "users/add-user.html"
    })
    .when("/view-users", {
        templateUrl : "users/view-users.html"
    })
    .when("/new-answer-set", {
        templateUrl : "views/answer_set/new.html"
    })
    .when("/view-answer-sets", {
        templateUrl : "views/answer_set/view.html"
    })
    .when("/new-domain", {
        templateUrl : "views/domain/new.html"
    })
    .when("/view-domains", {
        templateUrl : "views/domain/view.html"
    })
    .when("/new-question", {
        templateUrl : "views/question/new.html"
    })
    .when("/view-questions", {
        templateUrl : "views/question/view.html"
    })
    .when("/new-questionnaire", {
        templateUrl : "views/questionnaire/new.html"
    })
    .when("/view-questionnaires", {
        templateUrl : "views/questionnaire/view.html"
    })
    .when("/logout", {
        templateUrl : "logout.html"
    });
});
