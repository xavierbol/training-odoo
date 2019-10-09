odoo.define('awesome_map.MapView', function (require) {
"use strict";

const AbstractView = require('web.AbstractView');
const core = require('web.core');
const viewRegistry = require('web.view_registry');

const MapController = require('awesome_map.MapController');
const MapModel = require('awesome_map.MapModel');
const MapRenderer = require('awesome_map.MapRenderer');

const _lt = core._lt;

const MapView = AbstractView.extend({
    config: _.extend({}, AbstractView.prototype.config, {
        Controller: MapController,
        Model: MapModel,
        Renderer: MapRenderer,
    }),
    // cssLibs: ['/awesome_map/static/lib/leaflet/leaflet.css'],
    // jsLibs: ['/awesome_map/static/lib/leaflet/leaflet.js'],
    display_name: _lt('Map'),
    icon: 'fa-globe',
    viewType: 'awesome_map',
});

viewRegistry.add('awesome_map', MapView);

});
