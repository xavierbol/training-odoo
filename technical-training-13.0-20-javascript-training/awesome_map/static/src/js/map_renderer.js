odoo.define('awesome_map.MapRenderer', function (require) {
"use strict";

const AbstractRenderer = require('web.AbstractRenderer');
const QWeb = require('web.QWeb');
const session = require('web.session');
const utils = require('web.utils');

const MapRenderer = AbstractRenderer.extend({
    className: "o_map_view",

    init: function (parent, state, params) {
        this._super.apply(this, arguments);
        this.initMap = false;
        this.isInDOM = false;
        this.markers = [];
        this.qweb = new QWeb(session.debug, {_s: session.origin}, false);
        this.qweb.add_template(utils.json_node_to_xml(params.template));
    },
    on_attach_callback: function () {
        this.isInDOM = true;
        this._initializeMap();
        this._renderDataPoints();
        this._super.apply(this, arguments);
    },
    on_detach_callback: function () {
        this.isInDOM = false;
    },
    zoomIn: function () {
        this.leafletMap.zoomIn();
    },
    zoomOut: function () {
        this.leafletMap.zoomOut();
    },
    _initializeMap: function () {
        if (this.initMap) {
            return;
        }

        this.initMap = true;

        const defaultLatitude = this.state[0].latitude || 51.505;
        const defaultLongitude = this.state[0].longitude || -0.09;

        this.leafletMap = L.map(this.el).setView([defaultLatitude, defaultLongitude], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.leafletMap);
    },
    _render: function () {
        if (this.isInDOM) {
            this._renderDataPoints();
        }
        return this._super.apply(this, arguments);
    },
    _renderDataPoints: function () {
        _.invoke(this.markers, 'remove');
        this.state.forEach((point) => {
            const maker = L.marker([point.latitude, point.longitude]).addTo(this.leafletMap)
                .bindPopup(this.qweb.render('map-popup', {record: point}))
                .openPopup();
            maker.on('click', () => {
                console.log('click')
                this.trigger_up('record_clicked', { id: point.id });
            })
            this.markers.push(maker);
        });
    }
});

return MapRenderer;

});
