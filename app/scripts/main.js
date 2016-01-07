/*global require*/
'use strict';
define('jquery-stub', function() {
    return window.$;
});
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars',
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        backbone: '../bower_components/backbone/backbone'
    },
    
    map: {
        '*': {
            'jquery': 'jquery-stub'
        }
    }
    
});

require(['views/extended-archive-view'], function (Archive) {
    new Archive();
});