odoo.define('awesome_tshirt.HomeMenu', function (require) {
    "use strict";

    const HomeMenu = require('web_enterprise.HomeMenu');
    const session = require('web.session');

    HomeMenu.include({
        _render: function () {
            this._super();
            const elem = document.createElement('div');
            elem.className = "alert alert-warning";
            elem.appendChild(document.createTextNode(session.home_menu_message));
            this.$el.prepend(elem);
        }
    })

    return HomeMenu;
});
