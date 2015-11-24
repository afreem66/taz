var app = angular.module('TazApp', ['ngRoute']);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {

  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});

app.controller('recordController', ['$http', '$location', function($http, $location) {
  var controller = this,
      record = {
        bodySystem: "",
        description: "",
        treatment: ""
      }

  $http.get('records').success(function(data){
    console.log(data);
    controller.records = data;
  });

  this.create = function(){
    $http.post('/records/new',
      controller.record
    ).success(function (data) {
        record = null;
        console.log(data);
        console.log($location);
      })
  }

}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'views/sign_up.html',
    controller: 'mainController'
  })
  .when('/records/new', {
    templateUrl: 'views/record/new.html',
    controller: 'recordController',
    controllerAs: 'recordCtrl'
  }).when('/records/all', {
    templateUrl: 'views/record/all.html',
    controller: 'recordController',
    controllerAs: 'recordCtrl'
  })
  .otherwise({redirectTo: '/'})
}]);
