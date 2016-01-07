/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/archive-collector-model',
    'models/user-details-collector-model'
], function ($, _, Backbone, JST, ArchiveModel,UserDetailsModel) {
    'use strict';
    var ExtendedArchiveView = Backbone.View.extend({
        el: '#content',
        templateLayout: JST['app/scripts/templates/extended-archive-layout.hbs'],
        templateList: JST['app/scripts/templates/extended-archive-issues.hbs'],
        offset:0,
        limit:16,
        total:null,
        bundle:{},
        user:{},
        events: {
            'click .btn-extendedArchive': 'handleUpdateArchive'
        },
        initialize: function(){
            this.user = new UserDetailsModel();
            var options = {
                    channel:this.user.attributes.region,
                    limit: this.limit,
                    getBundle: true,
                    initial: true
                };
            this.fetchModel(options);
        },
        fetchModel: function(options){
            var archive = new ArchiveModel(options),
                that = this;
            archive.fetch({
                cache: false,
                success:function(model) {
                    that.render(model);
                    that.offset = that.offset + options.limit;
                },
                error:function() {
                    console.log('Error collecting archive');
                }
            });
        },
        render: function(model){
            /* if initial load set up the template */
            if (model.attributes.initial) {
                this.bundle = model.attributes.bundle;
                this.$el.html(this.templateLayout(model.attributes));
                this.total = model.attributes.total;
            }
            /* need to finish this part on the view */
            model.attributes.bundle = this.bundle;
            this.$el.find($('#archivedIssues')).append(this.templateList(model.attributes));
            /* if there were no more issues remove the controls */
            var btnExtendedArchivetemplate = _.template('<a href="#" class="btn-extendedArchive"><%=copy%> ></a>',
                 {copy:this.bundle.magazine.archive.extended.value}
                );
            this.$el.find($('.extendedArchive')).html(btnExtendedArchivetemplate);
            if (!model.attributes.next) {
                this.$el.find($('.btn-extendedArchive')).remove();
            }
            return this;
        },
        handleUpdateArchive: function(){
            var btnExtendedArchiveCopy = this.bundle.magazine.loading.value;
            this.$el.find($('.extendedArchive')).html(btnExtendedArchiveCopy);
            var options = {
                channel:this.user.attributes.region,
                limit:this.limit,
                offset:this.offset,
                getBundle:false,
                total:this.total
            };
            this.fetchModel(options);
            return false;
        }
    });
    return ExtendedArchiveView;
});