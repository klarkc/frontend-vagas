/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Sets app default base URL
  app.baseUrl = '/';

  if (window.location.port === '') { // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Listen for route changes and redirect
  app.properties.route = {
    type: String,
    observer: '_routeChanged'
  };

  app._routeChanged = function(newValue, oldValue) {
    if (newValue !== oldValue) {
      window.location = '#!' + newValue;
    }
  };

  // Youtube API
  app.ytApi = null;
  app.ytConf = {
    channel: 'VAGAStecnologia',
    apiKey: 'AIzaSyBGd3BHJvZTHAD4WX4BAiQquIhhbytCnfU'
  };

  app.ytApiLoaded = function(event) {
    console.log('Youtube API loaded, setting key and notifying other elements');
    //event.target.api.setApiKey(app.ytConf.apiKey); We do not need this for while
    //console.log(event.target.api);
    this.youtube = event.target.api;
    this.notifyPath('youtube', event.target.api);
  };

  // API Error
  app.apiError = function(event) {
    console.log('Error loading API', event);
  };

  // Search
  app.properties.searchString = {
    type: String,
    observer: 'doSearch'
  };
  app.showSearch = function() {
    var searchField = app.$.search;
    if (searchField.style.visibility === 'hidden') {
      searchField.style.visibility = 'visible';
      searchField.focus();
    } else {
      searchField.style.visibility = 'hidden';
    }
  };
  app.doSearch = function() {
    app.route = 'busca';
  };

  app.goHome = function() {
    app.route = '/';
  };

})(document);
