odoo.define('awesome_tshirt.HomeMenu', function (require) {
    "use strict";

    const HomeMenu = require('web_enterprise.HomeMenu');

    HomeMenu.include({
        _render: function () {
            this._super();
            const elem = document.createElement('div');
            elem.className = "alert alert-warning";
            elem.appendChild(document.createTextNode('Bafien Ckinpaers is watching you!'));
            this.$el.prepend(elem);
        }
    })

    return HomeMenu;
});
