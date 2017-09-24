'use strict';

angular.module('myApp.view1', ['ngRoute','ui.router'])

.config(['$routeProvider','$stateProvider', '$urlRouterProvider', 
function($routeProvider,$stateProvider, $urlRouterProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

  // $urlRouterProvider.otherwise('/view1');

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
  .state('subcomponent03.nestedComponent01',{
    url:'/subcomponent03/nestedComponent01',
    templateUrl:'./view1/detail-view/sub-views/sub-component-03.html',
    controller: function($scope) {
      $scope.comp_title = "L'Azzurri";
      $scope.items = ['Donatelli', 'Durante', 'Calcavecchia'];
    }
  })
  .state('subcomponent03.nestedComponent02',{
    url:'/subcomponent03/nestedComponent02',
    templateUrl:'./view1/detail-view/sub-views/sub-component-03.html',
    controller: function($scope) {
      $scope.comp_title = "De Yehudenkraft";
      $scope.items = ['Cohen', 'Bernstein', 'Goldmann'];
    }
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
  $scope.comp_title = "Sub Component 03";
  $scope.customForm.sex = $scope.genders[0];
  $scope.onSubmit = function(){
    console.log($scope.customForm);
  }
}]);