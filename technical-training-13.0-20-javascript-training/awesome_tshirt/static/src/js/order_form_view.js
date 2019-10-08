odoo.define('awesome_tshirt.order_form_view', function (require) {
    "use strict";

    const FormView = require('web.FormView');
    const FormRenderer = require('web.FormRenderer');
    const viewRegistry = require('web.view_registry');

    const OrderFormRenderer = FormRenderer.extend({
        _render: function () {
            console.log('render form');
            const {
                image_url, amount
            } = this.state.data;
            
            this.warning = [];

            if (!image_url || image_url === '') {
                this.warning.push('No image');
            }

            if (amount > 50) {
                this.warning.push('Add promotional material');
            }
            return this._super.apply(this, arguments);
        }
    });

    const OrderFormView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
            Renderer: OrderFormRenderer
        }),
    });

    viewRegistry.add('order_form', OrderFormView);

    return OrderFormRenderer;
});
