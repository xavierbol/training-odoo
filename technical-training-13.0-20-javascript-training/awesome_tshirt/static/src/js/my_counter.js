odoo.define('awesome_tshirt.MyCounter', function(require) {
    "use strict"

    console.log("create MyCounter widget");

    const Widget = require('web.Widget');
    
    const Counter = Widget.extend({
        template: 'MyCounter',
        xmlDependencies: ['/awesome_tshirt/static/src/xml/my_counter.xml'],
        events: {
            'click .o_decrement': '_onDecrement',
            'click .o_increment': '_onIncrement',
        },
        init: function (parent) {
            this._super(parent)
            this.count = 0;
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
