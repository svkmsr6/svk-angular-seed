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
    var _callbackSuffix = '&limit=6&callback=JSON_CALLBACK';

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
          defer.reject('An error occurred! Please check your search term or your network');
        });
        return defer.promise;
    }
}])

.directive('songTile', function () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: '<div class="card-block">'+
                '<div ng-transclude></div>'+
                '<div class="card-title ellipsis-active">{{song.trackName}}</div>'+
                '<h5 class="card-title">{{song.artistName}}</h5>'+
                '<p class="card-text">Track Price {{ song.trackPrice | currency}}</p>'+
                '<audio src="{{song.previewUrl}}" controls>'+
                'Your browser does not support the <code>audio</code> element.</audio>'+
                '</div>',
      link: function (scope, element, attrs) {
        // DOM manipulation/events here!
      }
    };
})

.controller('View2Ctrl', ['$scope','$itunesServiceProvider',function($scope,$itunesServiceProvider) {
      $scope.songList = [];
      $scope.error = false;
      $scope.errorText = '';
      $scope.searchSongs = function(name){
        var specialCharacterPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]\W/;
        if(!name || name.length==0 || specialCharacterPattern.test(name) ){
             $scope.errorText = 'Please enter a proper search term';
             $scope.error = true;
             $scope.songList = [];
        }
        else{
        $itunesServiceProvider.searchSongs(name).
          then(function(data){
              //console.log(data.results[0]);
              if(data.results.length>0){
                $scope.songList = data.results;
                $scope.error = false;
              }
              else{
                $scope.errorText = 'No results available!';
                $scope.error = true;
              }             
          },function(data){
              $scope.errorText = data;
              $scope.error = true;
              $scope.songList = [];
          });
        }
       
      }
}]);