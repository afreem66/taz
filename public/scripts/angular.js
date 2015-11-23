var app = angular.module('TazApp', ['ngRoute']);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {

});

app.controller('userController', function ($scope, $routeParams) {

});

app.controller('recordController', function ($scope, $routeParams) {

});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/Book/:bookId', {
    templateUrl: 'book.html',
    controller: 'BookController'
  });


//   $http.get('/record/index').success(function (data) {
//       console.log("This is the index data: " + data);
//     });
//     this.new = function () {
//       $http.post('/record/new').success(function(data) {
//         console.log("This is the create data: " + data);
//       });
//     }
// }])
