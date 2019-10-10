odoo.define('awesome_map.MapController', function (require) {
"use strict";

const AbstractController = require('web.AbstractController');
const core = require('web.core');

const qweb = core.qweb;

const MapController = AbstractController.extend({
    custom_events: _.extend({}, AbstractController.prototype.custom_events, {
        'record_clicked': '_onRecordClicked',
    }),
    events: _.extend({}, AbstractController.prototype.events, {
        'click button.o_zoom_in': '_onZoomIn',
        'click button.o_zoom_out': '_onZoomOut'
    }),
    renderButtons: function ($node) {
        this.$buttons = $(qweb.render('MapView.Buttons'), { widget: this });
        this.$buttons.appendTo($node);
    },
    _onRecordClicked: function (event) {
        this.trigger_up('switch_view', {
            view_type: 'form',
            res_id: event.data.id,
            mode: 'readonly',
            model: this.modelName,
        });
    },
    _onZoomIn: function (event) {
        this.renderer.zoomIn();
    },
    _onZoomOut: function (event) {
        this.renderer.zoomOut();
    },
});

return MapController;

});
