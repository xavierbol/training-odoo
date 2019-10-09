odoo.define('awesome_map.MapModel', function (require) {
"use strict";

const AbstractModel = require('web.AbstractModel');

const MapModel = AbstractModel.extend({
    init: function (parent) {
        this._super.apply(this, arguments);
        this.data = null;
    },
    get: function () {
        return this.data;
    },
    /**
     * 
     * @param {Object} params
     */
    load: function (params) {
        return this._rpc({
            model: params.modelName,
            method: 'search_read',
            fields: params.fieldNames,
            domain: params.domain
        }).then((results) => {
            this.data = results.map(({ id, name, partner_latitude, partner_longitude }) => {
                return {
                    id,
                    name,
                    latitude: partner_latitude,
                    longitude: partner_longitude
                };
            });
        });
    },
    reload: function () {
        return Promise.resolve()
    },
});

return MapModel;

});
