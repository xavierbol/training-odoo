odoo.define('awesome_tshirt.QuickOrderNavigation', function (require) {
    "use strict";

    const SystrayMenu = require('web.SystrayMenu');
    const Widget = require('web.Widget');
    const { _t } = require('web.core');

    const QuickOrderNavigation = Widget.extend({
        template: 'QuickOrderNavigation',
        events: {
            'keydown .o_input': '_onInputKeydown',
        },
        _onInputKeydown: function (event) {
            if (event.keyCode === 13) {
                const id = parseInt(this.$el.find('.o_input').val())

                if (!_.isNaN(id)) {
                    this.do_action({
                        res_id: id, 
                        type: 'ir.actions.act_window',
                        res_model: 'awesome_tshirt.order',
                        views: [[false, 'form']],
                        search_view_id: [false],
                        target: 'new'
                    });
                }
            }
        }
    });

    SystrayMenu.Items.push(QuickOrderNavigation);

    return QuickOrderNavigation;
});
