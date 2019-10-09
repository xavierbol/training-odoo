odoo.define('awesome_map.MapRenderer', function (require) {
"use strict";

const AbstractRenderer = require('web.AbstractRenderer');
const QWeb = require('web.QWeb');
const session = require('web.session');
const utils = require('web.utils');

const MapRenderer = AbstractRenderer.extend({
    _render: function () {
        console.log(this)
        this.$el.text('Hello World');
        this._super.apply(this, arguments);
    }
});

return MapRenderer;

});
