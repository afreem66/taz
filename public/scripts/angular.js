var app = angular.module('TazApp', ['ngRoute','vAccordion']);

app.service('userService', function() {
  var controller = this;

  this.setUser = function(user) {
    controller.currentUser = user;
  }

  this.getUser = function() {
    return controller.currentUser;
  }

});

app.controller('mainController', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
  var controller = this;

}]);

app.controller('userController', ['$http', '$location', 'userService', function($http, $location, userService) {
  var controller = this;

  this.docSignUp = function () {
    $http.post('/users/new', {
      email: controller.user.email,
      passwordDigest: controller.user.passwordDigest,
      name: controller.user.name,
      doctor: controller.user.doctor,
      specialty: controller.user.specialty,
      hospital: controller.user.hospital,
      age: controller.user.age,
      gender: controller.user.gender,
      currentMedications: controller.user.currentMedications,
      familyHistory: controller.user.familyHistory,
      height: controller.user.height,
      weight: controller.user.weight,
      bloodPressure: controller.user.bloodPressure
    }).then(function(data) {
      if (!data.data.error) {
        console.log(data.data);
        userService.setUser(data.data)
        $location.path('/users/' + userService.getUser()._id + '/view');
        console.log(data);
      } else {
        console.log(data.data);
      }
    }, function (err) {
      console.log(err);
    });
  }

  this.login = function () {
    $http.post('/users/login', {
      email: controller.user.email,
      passwordDigest: controller.user.passwordDigest
    }).then(function(data) {
      if (!data.data.error) {
        userService.setUser(data.data.user)
        controller.user = userService.getUser()
        console.log(userService.getUser());
        $location.path('/users/' + userService.getUser()._id + '/view')
        console.log(controller);
      } else {
        console.log(data);
      }
    }, function (err) {
      console.log(err);
    })
  }
  console.log(userService.getUser());

}]);
app.controller('recordController', ['$http', '$location', 'userService', function($http, $location, userService) {
  var controller = this;
  var record = {
        complaint: "",
        bodySystem: "",
        description: "",
        treatment: "",
        author: this.userService.getUser().name
      }

  $http.get('/records/all').success(function (data) {
    controller.records = data;
  });

  this.createRecord = function () {
    $http.post('/records/new',
      controller.record
    ).then(function(data){
      console.log(data);
      if (data) {
        $location.path('/records/all');
      } else {
        $('body').append('<h2>Sorry, there was an error posting your record--try again!</h2>');
      }
    }, function(err){
      console.log("there was an error: " + err);
    });
  }


}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'views/login.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/users/login', {
    templateUrl: 'views/login.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/users/:id/view', {
    templateUrl: 'views/user/view.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/users/all', {
    templateUrl: 'views/user/all.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/records/new', {
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
