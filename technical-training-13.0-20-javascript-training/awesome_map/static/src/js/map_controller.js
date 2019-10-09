odoo.define('awesome_map.MapController', function (require) {
"use strict";

const AbstractController = require('web.AbstractController');
const core = require('web.core');

const qweb = core.qweb;

const MapController = AbstractController.extend({
    init: function (parent, model, renderer, params) {
        this._super.apply(this, arguments);
        console.log(this)
        console.log(params)
    }
});

return MapController;

});
