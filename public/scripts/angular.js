var app = angular.module('TazApp', ['ngRoute']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $http.get('/record/index').success(function (data) {
      console.log("This is the index data: " + data);
    });
    this.new = function () {
      $http.post('/record/new').success(function(data) {
        console.log("This is the create data: " + data);
      });
    }
}])
