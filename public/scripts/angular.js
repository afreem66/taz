var app = angular.module('TazApp', ['ngRoute']);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {

  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});

app.controller('recordController', ['$http', function($http) {
  var controller = this;

  var record = {
    bodySystem: "",
    description: "",
    treatmetn: ""
  }
  // $http.get('records').success(function(data){
  //
  //   console.log("this is index " + data);
  //   // controller.records = data;
  // });
  console.log(this);
  this.create = function(){
    $http.post('/record/new',
      controller.record
    ).success(function (data) {
      console.log("this is create " + data);
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
  }).otherwise({redirectTo: '/'})
}]);
