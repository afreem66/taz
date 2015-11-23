alert('hello')

var app = angular.module('TazApp', ['ngRoute']);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {
  console.log($scope);
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});

app.controller('recordController', ['$http', function($http) {
  console.log('records');
  var controller = this;
  // $http.get('records').success(function(data){
  //
  //   console.log("this is index " + data);
  //   // controller.records = data;
  // });

  this.create = function(){
    $http.post('/record/new', {
      bodySystem: this.bodySystem,
      description: this.description,
      treatment: this.treatment
    }).success(function(data){

      console.log("this is create " + data);
      // controller.recorsd = data;
    });
  }
}]);;

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'views/sign_up.html',
    controller: 'mainController'
  })
  .when('/record/new', {
    templateUrl: 'views/record/new.html',
    controller: 'recordController',
    controllerAs: 'recordCtrl'
  })
}]);
