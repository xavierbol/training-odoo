odoo.define('awesome_tshirt.OrderForm', function (require) {
    "use strict";

    const FormController = require('web.FormController');
    const FormView = require('web.FormView');
    const viewRegistry = require('web.view_registry');
    const { qweb, _t } = require('web.core');

    const OrderFormController = FormController.extend({
        events: {
            'click .o_print_label': '_onPrintLabel',
        },
        init: function () {
            this._super.apply(this, arguments);
            this.printing = false;
        },
        renderButtons: function ($node) {
            this._super.apply(this, arguments);
            this.$buttons.addClass('o_order_form_buttons')
                .append(qweb.render('OrderFormView.Buttons'))
        },
        _updateButtons: function () {
            this._super.apply(this, arguments);
            if (this.$buttons) {
                const state = this.model.get(this.handle, { raw: true });
                const disabled = this.mode === 'edit' && !state.res_id;
                const primary = state.data.customer_id && state.data.state === 'printed';
                this.$buttons.find('.o_print_label')
                    .toggleClass('btn-primary', primary)
                    .toggleClass('btn-secondary', !primary)
                    .attr('disabled', disabled);
            }
        },
        _onPrintLabel: function () {
            this.printing = true;
            return this._rpc({
                model: 'awesome_tshirt.order',
                method: 'print_label',
                args: [this.model.get(this.handle, { raw: true }).res_id]
            }).then(result => {
                if (result) {
                    this.do_notify(_t('Success'), _t('The printing is completed with success'))
                } else {
                    this.do_warn(_t('Error'), _t('Impossible to print label'))
                }
                this.printing = false;
                this.reload()
            })
        }
    })

    const OrderFormView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
            Controller: OrderFormController
        }),
    });

    viewRegistry.add('order_form', OrderFormView);

    return OrderFormView;
});
