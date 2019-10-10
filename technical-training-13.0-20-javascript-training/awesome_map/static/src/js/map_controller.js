odoo.define('awesome_map.MapController', function (require) {
"use strict";

const AbstractController = require('web.AbstractController');
const core = require('web.core');

const qweb = core.qweb;

const MapController = AbstractController.extend({
    custom_events: _.extend({}, AbstractController.prototype.custom_events, {
        'record_clicked': '_onRecordClicked',
    }),
    _onRecordClicked: function (event) {
        this.trigger_up('switch_view', {
            view_type: 'form',
            res_id: event.data.id,
            mode: 'readonly',
            model: this.modelName,
        });
    }
});

return MapController;

});
