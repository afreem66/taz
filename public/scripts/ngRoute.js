var app = angular.module('TazApp', ['ui.router']);

app.controller('tazController', function () {

});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../views/home.html',
      controller: 'tazController'
    })
    .state('newRecord', {
      url: '/record/new',
      templateUrl: '../views/record/new.html',
      controller: 'tazController'
    })
}])
