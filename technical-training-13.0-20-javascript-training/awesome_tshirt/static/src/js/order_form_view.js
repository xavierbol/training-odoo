odoo.define('awesome_tshirt.OrderForm', function (require) {
    "use strict";

    const FormView = require('web.FormView');
    const viewRegistry = require('web.view_registry');

    const OrderFormView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
        }),
    });

    viewRegistry.add('order_form', OrderFormView);

    return OrderFormView;
});
