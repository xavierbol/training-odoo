odoo.define('awesome_map.MapRenderer', function (require) {
"use strict";

const AbstractRenderer = require('web.AbstractRenderer');
const QWeb = require('web.QWeb');
const session = require('web.session');
const utils = require('web.utils');

const MapRenderer = AbstractRenderer.extend({
    className: "o_map_view",
    
    init: function () {
        this._super.apply(this, arguments);
        this.initMap = false;
    },
    on_attach_callback: function () {
        this._initializeMap();
        this._super.apply(this, arguments);
    },
    _initializeMap: function () {
        if (this.initMap) {
            return;
        }

        this.initMap = true;
        const options = {
            zoom: false
        };
        const mymap = L.map(this.el, options).setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
    }
});

return MapRenderer;

});
