'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope',function($scope) {
  $scope.customForm = {};
  $scope.locations = ['Bengaluru','Kolkata','Mumbai','New Delhi'];
  $scope.customForm.location = $scope.locations[0];
  $scope.genders = ['Male','Female'];
  $scope.customForm.sex = $scope.genders[0];
  $scope.onSubmit = function(){
    console.log($scope.customForm);
  }
}]);