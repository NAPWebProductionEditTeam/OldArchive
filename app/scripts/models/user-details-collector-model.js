/*global define*/

define([
    'underscore',
    'backbone',
    'jquery'
], function (_, Backbone, $) {
    'use strict';
    var UserDetailsCollectorModel = Backbone.Model.extend({
		initialize: function(){
			var userSettings = ['region','language','country'],
				that = this;
			_.each(userSettings, function(num){
				if (that.checkDataTag(num)) {
					var userDetails = that.checkDataTag(num);
					that.set(userDetails.key,userDetails.value);
				}
			});
		},
		defaults: {
			region:'intl',
			language:'en',
			website:'nap',
			environment:'www',
			country:'GB',
			currency:'GBP'
		},
		checkDataTag: function(key){
			if ($('body').data(key)) {
				return {key:key, value: $('body').data(key)};
			}
		}
    });
    return UserDetailsCollectorModel;
});