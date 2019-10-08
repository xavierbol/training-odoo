odoo.define('awesome_tshirt.CustomerFormView', function (require) {
    "use strict";

    const FormController = require('web.FormController');
    const FormView = require('web.FormView');
    const viewRegistry = require('web.view_registry');
    const { qweb } = require('web.core');

    const CustomerFormController = FormController.extend({
        events: {
            'click .o_geo_localize': '_onGeoLocalize',
        },
        renderButtons: function ($node) {
            $node.append(qweb.render('CustomerFormView.Buttons'));
        },
        _onGeoLocalize: function () {
            return this._rpc({
                model: 'res.partner',
                method: 'geo_localize',
                args: [this.model.get(this.handle, {raw: true}).res_id]
            }).then(() => this.reload());
        }
    });

    const CustomerFormView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
            Controller: CustomerFormController
        }),
    });

    viewRegistry.add('customer_form_view', CustomerFormView);

    return CustomerFormView;
});
