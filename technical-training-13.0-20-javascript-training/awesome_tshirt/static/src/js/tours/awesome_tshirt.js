odoo.define('awesome_tshirt.tour', function (require) {
"use strict";

    const { _t } = require('web.core');
    const tour = require('web_tour.tour');

    tour.register('awesome_tshirt_tour', {
        url: '/web',
    }, [{
        trigger: '.o_app[data-menu-xmlid="awesome_tshirt.menu_root"]',
        content: _t('Dashboard of Awesome T-Shirt module'),
    }, {
        trigger: 'button.btn.btn-primary.o_customers_btn',
        content: _t('Go to customer list view in Awesome T-Shirt module'),
    }, {
        trigger: 'a.fa.o_menu_toggle.fa-th[title="Applications"]',
        content: _t('Return to main menu'),
    }, {
        trigger: 'a[data-menu-xmlid="awesome_tshirt.order"]',
        content: _t('Go to tshirt order kanban view'),
    }]);
});
