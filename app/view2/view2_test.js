'use strict';

describe('myApp.view2 module', function() {
var view2Ctrl,mockScope = {},$httpBackend,promise;

beforeEach(module('myApp.view2'));

beforeEach(inject(function($injector) {
  // Set up the mock http service responses
  $httpBackend = $injector.get('$httpBackend');
  // backend definition common for all tests
  $httpBackend.when('GET', 'https://itunes.apple.com/search?term=Justin+Bieber&callback=JSON_CALLBACK')
                          .respond({  
"resultCount":2,
"results":[  
    {  
      "wrapperType":"track",
      "kind":"song",
      "artistId":320569549,
      "collectionId":1049605561,
      "trackId":1049605634,
      "artistName":"Justin Bieber",
      "collectionName":"Purpose (Deluxe)",
      "trackName":"Love Yourself",
      "collectionCensoredName":"Purpose (Deluxe)",
      "trackCensoredName":"Love Yourself",
      "artistViewUrl":"https://itunes.apple.com/us/artist/justin-bieber/id320569549?uo=4",
      "collectionViewUrl":"https://itunes.apple.com/us/album/love-yourself/id1049605561?i=1049605634&uo=4",
      "trackViewUrl":"https://itunes.apple.com/us/album/love-yourself/id1049605561?i=1049605634&uo=4",
      "previewUrl":"http://a1268.phobos.apple.com/us/r30/Music69/v4/8d/89/89/8d898987-2771-877f-b06c-27813f13c79f/mzaf_6954744275616470123.plus.aac.p.m4a",
      "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music6/v4/0e/38/b4/0e38b405-ae2c-1da4-5959-866f7abb110e/source/30x30bb.jpg",
      "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music6/v4/0e/38/b4/0e38b405-ae2c-1da4-5959-866f7abb110e/source/60x60bb.jpg",
      "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music6/v4/0e/38/b4/0e38b405-ae2c-1da4-5959-866f7abb110e/source/100x100bb.jpg",
      "collectionPrice":13.99,
      "trackPrice":1.29,
      "releaseDate":"2015-11-09T08:00:00Z",
      "collectionExplicitness":"notExplicit",
      "trackExplicitness":"notExplicit",
      "discCount":1,
      "discNumber":1,
      "trackCount":18,
      "trackNumber":5,
      "trackTimeMillis":233719,
      "country":"USA",
      "currency":"USD",
      "primaryGenreName":"Pop",
      "isStreamable":true
    },
    {  
      "wrapperType":"track",
      "kind":"song",
      "artistId":320569549,
      "collectionId":1049605561,
      "trackId":1049605633,
      "artistName":"Justin Bieber",
      "collectionName":"Purpose (Deluxe)",
      "trackName":"Sorry",
      "collectionCensoredName":"Purpose (Deluxe)",
      "trackCensoredName":"Sorry",
      "artistViewUrl":"https://itunes.apple.com/us/artist/justin-bieber/id320569549?uo=4",
      "collectionViewUrl":"https://itunes.apple.com/us/album/sorry/id1049605561?i=1049605633&uo=4",
      "trackViewUrl":"https://itunes.apple.com/us/album/sorry/id1049605561?i=1049605633&uo=4",
      "previewUrl":"http://a1814.phobos.apple.com/us/r30/Music6/v4/06/34/f8/0634f8ea-ceee-e502-a376-5c967dd6b4a1/mzaf_7987909253469967967.plus.aac.p.m4a",
      "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music6/v4/0e/38/b4/0e38b405-ae2c-1da4-5959-866f7abb110e/source/30x30bb.jpg",
      "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music6/v4/0e/38/b4/0e38b405-ae2c-1da4-5959-866f7abb110e/source/60x60bb.jpg",
      "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music6/v4/0e/38/b4/0e38b405-ae2c-1da4-5959-866f7abb110e/source/100x100bb.jpg",
      "collectionPrice":13.99,
      "trackPrice":1.29,
      "releaseDate":"2015-10-23T07:00:00Z",
      "collectionExplicitness":"notExplicit",
      "trackExplicitness":"notExplicit",
      "discCount":1,
      "discNumber":1,
      "trackCount":18,
      "trackNumber":4,
      "trackTimeMillis":200790,
      "country":"USA",
      "currency":"USD",
      "primaryGenreName":"Pop",
      "isStreamable":true
    }]}
);
  
  // The $controller service is used to create instances of controllers
  var $controller = $injector.get('$controller');

  //spec body
    view2Ctrl = $controller('View2Ctrl',{ '$scope' : mockScope });
}));

describe('view2 controller', function(){

  it('should be defined', inject(function($controller) {
    expect(view2Ctrl).toBeDefined();
  }));

  it('scope should be properly initialized', function() {
    expect(mockScope.songList.length).toBe(0);
    expect(mockScope.error).toBe(false);
    expect(mockScope.errorText).toBe('');
  });

  it('search with special characters', function() {
    mockScope.searchSongs('$$^');
    expect(mockScope.songList.length).toBe(0);
    expect(mockScope.error).toBe(true);
    expect(mockScope.errorText).toBe('Please enter a proper search term');
  });

  it('search with normal string', function() {
      mockScope.searchSongs('Justin Bieber');
      expect(mockScope.songList.length).toBe(0);
      console.log(mockScope.songList);
      expect(mockScope.error).toBe(false);
      expect(mockScope.errorText).toBe('');
      //$httpBackend.flush();
  });

});
});