odoo.define('awesome_tshirt.image_preview', function (require) {
    "use strict";

    const FieldChar = require('web.basic_fields').FieldChar;
    const fieldRegistry = require('web.field_registry');
    const core = require('web.core');

    const _t = core._t;

    const ImagePreview = FieldChar.extend({
        _renderReadonly: function () {
            let img = document.createElement('img');
            img.src = this.value;
            img.alt = _t("Image Preview");
            img.className = "o_image_preview"
            this.$el.html(img)
        }
    });

    fieldRegistry.add('image_preview', ImagePreview);

    return ImagePreview;
});
