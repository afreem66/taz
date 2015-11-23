alert('hello')

var app = angular.module('TazApp', ['ngRoute']);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {
  console.log($scope);
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'record/new.html',
    controller: 'mainController',
    controllerAs: 'main'
  })
}]);
