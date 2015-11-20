var app = angular.module('TazApp', []);

app.controller('RecordController', ['$http', function($http) {
  var controller = this;
  $http.get('/record/index').success(function (data) {
    console.log("This is the index data: " + data);
  });
  // this.new = function () {
  //   $http.post('/record/new', {
  //     todo_value: this.value
  //   }).success(function(data) {
  //     console.log(data);
  //     controller.todos = data;
  //   })
  // }
}])

app.controller()
