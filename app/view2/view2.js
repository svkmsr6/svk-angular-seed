'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.service('$itunesServiceProvider',['$http','$q',function($http,$q){
    var _baseUrl = 'https://itunes.apple.com/search?term=';
    var _callbackSuffix = '&callback=JSON_CALLBACK';

    var _generateUrl = function(query){
       return _baseUrl+query.split(' ').join('+')+_callbackSuffix;
    }

    this.searchSongs = function(query){
        var _url = _generateUrl(query);
        var defer = $q.defer();
        $http({
          method: 'JSONP',
          url: _url
        }).success(function(data){
          defer.resolve(data);
        }).error(function(){
          defer.reject('An error occurred!');
        });
        return defer.promise;
    }
}])

.controller('View2Ctrl', ['$scope','$itunesServiceProvider',function($scope,$itunesServiceProvider) {
      $scope.songList = [];
      $scope.error = false;
      $scope.errorText = '';
      $scope.searchSongs = function(name){
        if(!name || name.length==0){
             $scope.errorText = 'Please enter a search term';
             $scope.error = true;
             $scope.songList = [];
        }
        else{
        $itunesServiceProvider.searchSongs(name).
          then(function(data){
              console.log(data.results[0]);
              $scope.songList = data.results;
              $scope.error = false;
          },function(data){
              $scope.errorText = data;
              $scope.error = true;
              $scope.songList = [];
          });
        }
       
      }
}]);