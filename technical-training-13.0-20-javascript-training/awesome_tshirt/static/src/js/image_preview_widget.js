odoo.define('awesome_tshirt.image_preview', function (require) {
    "use strict";

    const FieldChar = require('web.basic_fields').FieldChar;
    const fieldRegistry = require('web.field_registry');
    const core = require('web.core');

    const _t = core._t;

    const ImagePreview = FieldChar.extend({
        isSet: () => true,
        _renderReadonly: function () {
            if (this.value) {
                const elem = document.createElement('img');
                elem.src = this.value;
                elem.alt = _t("Image Preview");
                elem.className = "o_image_preview"
                this.$el.html(elem)
            } else {
                this.$el.text(_t("MISSING TSHIRT DESIGN"))
                        .addClass('text-danger')
            }
            
        }
    });

    fieldRegistry.add('image_preview', ImagePreview);

    return ImagePreview;
});
