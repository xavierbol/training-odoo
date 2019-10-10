odoo.define('awesome_tshirt.MyCounter', function(require) {
    "use strict"

    const Widget = require('web.Widget');
    
    const Counter = Widget.extend({
        template: 'MyCounter',
        events: {
            'click .o_decrement': '_onDecrement',
            'click .o_increment': '_onIncrement',
        },
        init: function () {
            this.count = 0;
            this._super.apply(this, arguments);
        },
        _onDecrement: function () {
            this.count--;
            // this.$('.val').text(this.count);
            this.renderElement();
        },
        _onIncrement: function () {
            this.count++;
            this.renderElement();
        },
    });

    return Counter;
});
