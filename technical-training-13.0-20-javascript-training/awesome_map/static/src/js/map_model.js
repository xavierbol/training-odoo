odoo.define('awesome_map.MapModel', function (require) {
"use strict";

const AbstractModel = require('web.AbstractModel');

const MapModel = AbstractModel.extend({
    init: function (parent) {
        this._super.apply(this, arguments);
        this.data = null;
        this.modelName = '';
        this.fieldNames = [];
    },
    get: function () {
        return this.data;
    },
    /**
     * 
     * @param {Object} params
     */
    load: function (params) {
        this.modelName = params.modelName;
        this.fieldNames = params.fieldNames || [];

        return this._load(params);
    },
    reload: function (_, params) {
        return this._load(params);
    },
    _load: function (params) {
        return this._rpc({
            model: this.modelName,
            method: 'search_read',
            fields: this.fieldNames,
            domain: params.domain
        }).then((results) => {
            console.log(results)
            this.data = results.map(({ id, name, partner_latitude, partner_longitude }) => {
                return {
                    id,
                    name,
                    latitude: partner_latitude,
                    longitude: partner_longitude
                };
            });
        });
    }
});

return MapModel;

});
