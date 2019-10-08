odoo.define('awesome_tshirt.WarningWidget', function (require) {
    "use strict";

    const Widget = require('web.Widget');
    const widgetRegistry = require('web.widget_registry');
    const core = require('web.core');
    const qweb = core.qweb;

    const WarningWidget = Widget.extend({
        events: {
            
        },
        /**
         * @override
         */
        init: function (parent) {
            this.record = parent.state
            this._super.apply(this, arguments);
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
            this._renderWarning();
            return this._super.apply(this, arguments);
        },
        updateState: function (record) {
            this.record = record;
            this._renderWarning();
        },
        _renderWarning: function () {
            this.$el.empty();
            if (!this.record.data.image_url) {
                this.$el.append(qweb.render('WarningWidget.NoImage'));
            }

            if (this.record.data.amount > 50) {
                this.$el.append(qweb.render('WarningWidget.AddPromo'));
            }
        }
    });

    widgetRegistry.add('warning_widget', WarningWidget);

    return WarningWidget;
});

{/* <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div> */}