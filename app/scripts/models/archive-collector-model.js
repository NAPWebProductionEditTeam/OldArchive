/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';
    var ArchiveCollectorModel = Backbone.Model.extend({
        defaults: {
            channel:'intl',
            sort: 'desc',
            limit:8,
            total:null,
            getBundle:false,
            offset:0,
            apiController:'magazineArchive.nap'
        },
        url: function() {
            var apiTemplate = _.template('/<%=channel%>/<%=apiController%>?sort=<%=sort%>&limit=<%=limit%>&getBundle=<%=getBundle%>&offset=<%=offset%>&total=<%=total%>&exclude=true',
                {
                    channel:this.get('channel'),
                    sort:this.get('sort'),
                    limit:this.get('limit'),
                    total:this.get('total'),
                    getBundle:this.get('getBundle'),
                    offset:this.get('offset'),
                    apiController:this.get('apiController')
                });
            return apiTemplate;
        },
        parse: function (response) {
            return response;
        }
    });
    return ArchiveCollectorModel;
});


