'use strict';

angular.module('myApp.view1', ['ngRoute','ui.router'])

.config(['$routeProvider','$stateProvider', '$urlRouterProvider', 
function($routeProvider,$stateProvider, $urlRouterProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

  $urlRouterProvider.otherwise('/view1');

  $stateProvider.
  state('subcomponent01',{
    url:'/subcomponent01',
    templateUrl:'./view1/detail-view/sub-views/sub-component-01.html'
  })
  .state('subcomponent02',{
    url:'/subcomponent02',
    templateUrl:'./view1/detail-view/sub-views/sub-component-02.html'
  })
  .state('subcomponent03',{
    url:'/subcomponent03',
    templateUrl:'./view1/detail-view/sub-views/sub-component-03.html'
  })


}])
.component('detailView', {
  transclude: true,
  // require: {
  //   tabsCtrl: '^myTabs'
  // },
  bindings: {
    title:'@',
    desc:'='
  },
  controller: function($scope) {
    var vm = this;
    vm.$onInit = function() {
      vm.desc = 'Hispanicity';      
    };
    
  },
  templateUrl: './view1/detail-view/detail-view.html'
})
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