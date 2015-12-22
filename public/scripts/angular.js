var app = angular.module('TazApp', ['ngRoute','vAccordion']);

app.service('userService', function() {
  var service = this;

  this.setUser = function(user) {
    service.currentUser = user;
  }

  this.getUser = function() {
    return service.currentUser;
  }

});

app.controller('navController', function() {
    this.pane = 1;

    this.changePane = function (selectedPane) {
      this.pane = selectedPane;
    }

    this.setPane = function (newPane) {
      return this.pane === newPane
    }
});

app.controller('userController', ['$http', '$location', 'userService', function($http, $location, userService) {
  var controller = this;
  controller.currentUser = userService.getUser()
  console.log(controller.currentUser);

  this.userSignUp = function () {
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
    }).then(function(response) {
      if (!response.data.error) {
        console.log(response.data);
        userService.setUser(response.data.currentUser);
        controller.currentUser = userService.getUser();
        $location.path('/users/' + controller.currentUser._id + '/view');
      } else {
        console.log(response.data);
      }
    }, function (err) {
      console.log(err);
    });
  }

  this.login = function () {
    $http.post('/users/login', {
      email: controller.user.email,
      passwordDigest: controller.user.passwordDigest
    }).then(function(response) {
      if (!response.data.error) {
        userService.setUser(response.data.user);
        controller.currentUser = userService.getUser();
        $location.path('/users/' + controller.currentUser._id + '/view')
      } else {
        console.log(response);
      }
    }, function (err) {
      console.log(err);
    })
  }

  this.findAllUsers = function () {
    $http.get('/users/' + userService.getUser()._id + '/view')
    .success(function (response) {
      var users = response.users
      controller.doctors = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].doctor === true) {
          controller.doctors.push(users[i])
        }
      }
    });
  }

  this.addDoctor = function (index) {
     var newDoc = controller.doctors[index];
     console.log(newDoc);
     console.log(controller.currentUser);
    $http.patch('/users/' + userService.getUser()._id + '/view/' + newDoc._id)
    .then(function (data) {
        controller.currentUser.doctors.push(newDoc);
        controller.doctors.splice(index);
      }, function (err) {
        console.log(err);
      });
  }
  this.docRecord = function() {
    $http.post('/users/:id/view', {
      complaint: controller.record.complaint,
      bodySystem: controller.record.bodySystem,
      description: controller.record.description,
      treatment: controller.record.treatment,
      author: userService.getUser().name,
      date: controller.record.date
    }).then(function(data) {
      if (data.data.record) {
        userService.getUser().patients[index].records.push(data.data.record);
      } else {
        $('body').append('<h2>Sorry, there was an error posting your record--try again!</h2>');
      }
    }, function(err) {
      console.log(err);
    })
  }

}]);

app.controller('recordController', ['$http', '$location', 'userService', function($http, $location, userService) {
  var controller = this;

  // $http.get('/records/all').success(function (data) {
  //   controller.records = data;
  // });

  this.createRecord = function () {
    $http.post('/records/new', {
    complaint: controller.record.complaint,
    bodySystem: controller.record.bodySystem,
    description: controller.record.description,
    treatment: controller.record.treatment,
    author: userService.getUser().name,
    date: controller.record.date
  }).then(function(response){
      if (response) {
        userService.getUser().records.push(response.data.record)
        $location.path('/users/' + userService.getUser()._id + '/view');
      } else {
        $('body').append('<h2>Sorry, there was an error posting your record--try again!</h2>');
      }
    }, function(err){
      console.log(err);
    });
  }

}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'views/user/login.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/users/:id/view', {
    templateUrl: 'views/user/view.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/users/:id/view/:docId', {
    templateUrl: 'views/user/view.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/records/new', {
    templateUrl: 'views/record/new.html',
    controller: 'recordController',
    controllerAs: 'recordCtrl'
  })
  .otherwise({redirectTo: '/'})
}]);
