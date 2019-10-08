odoo.define('awesome_tshirt.late_widget', function (require) {
    "use strict";

    const FieldBoolean = require('web.basic_fields').FieldBoolean;
    const fieldRegistry = require('web.field_registry');

    const Late = FieldBoolean.extend({
        className: 'o_field_late_boolean',

        init: function () {
            this._super.apply(this, arguments);

            this.late_color = this.nodeOptions.late_color || "green"; 
            this.not_late_color = this.nodeOptions.not_late_color || "red";
        },
        _render: function () {
            const elem = document.createElement('div');

            elem.style.backgroundColor = this.value ? this.late_color : this.not_late_color;

            this.$el.html(elem)
        }
    });

    fieldRegistry.add('late_widget', Late);
    
    return Late;
});
