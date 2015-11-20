var app = angular.module('TazApp', []);

app.controller('RecordController', ['$http', function($http) {
  var controller = this;
  $http.get('/record/index').success(function (data) {
    console.log("This is the index data: " + data);
  });
  this.new = function () {
    $http.post('/record/new').success(function(data) {
      console.log("This is the create data: " + data);
    });
  }
}])
