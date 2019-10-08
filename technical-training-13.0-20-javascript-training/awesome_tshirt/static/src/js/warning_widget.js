odoo.define('awesome_tshirt.warning_widget', function (require) {
    "use strict";

    const Widget = require('web.Widget');
    const widgetRegistry = require('web.widget_registry');

    const WarningWidget = Widget.extend({
        // template: 'MyQWebTemplate',
        events: {
            
        },
        /**
         * @override
         */
        init: function (parent) {
            this._super.apply(this, arguments);
            this.warning = parent.warning
        },
        /**
         * @override
         */
        willStart: function () {
            return this._super.apply(this, arguments);
        },
        /**
         * @override
         */
        start: function () {
            return this._super.apply(this, arguments).then(() => {
                this._renderWarning();
            });
        },
        _renderWarning: function () {
            if (this.warning && this.warning.length > 0) {
                const elem = document.createElement('div')
                elem.className = "alert alert-warning";
                elem.setAttribute('role', "alert");
    
                if (this.warning instanceof Array) {
                    this.warning.forEach(warning => {
                        const p = document.createElement('p');
                        p.appendChild(document.createTextNode(warning));
                        elem.appendChild(p);
                    })
                } else {
                    elem.appendChild(document.createTextNode(warning));
                }
    
                this.$el.html(elem);
            }
        }
    });

    widgetRegistry.add('warning_widget', WarningWidget);

    return WarningWidget;
});

{/* <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div> */}