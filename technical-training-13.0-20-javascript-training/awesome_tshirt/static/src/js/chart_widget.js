// const ChartJs = require('../../lib/chart.js');

odoo.define('awesome_tshirt.chart', function (require) {
    "use strict";

    // Import odoo modules
    const Widget = require('web.Widget');

    // Configuration chart.js
    const randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

    // Chart Widget
    const ChartWidget = Widget.extend({
        tagName: 'canvas',
        events: {
            'click #randomizeData': '_onRandomizeData',
            'click #addDataset': '_onAddDataset',
            'click #removeDataset': '_onRemoveDataset',
        },
        jsLibs: [
            '/awesome_tshirt/static/lib/chart.js/Chart.js',
        ],
        /**
         * @override
         */
        init: function (parent, orderBySize) {
            this._super.apply(this, arguments);
            this.sizes = ['s', 'm', 'l', 'xl', 'xl']
            this.orderBySize = orderBySize;
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
            this._renderChart();
            return this._super.apply(this, arguments);
        },
        _renderChart: function () {
            if (!this.ordersBySize) {
                return;
            }
            
            const data = this.sizes.map((s) => this.ordersBySize[s] || 0);
            this.myPie = new Chart(this.el, {
                type: 'pie',
                data: {
                    datasets: [{
                        label: 'Size',
                        data: data,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    onClick: this._onChartClicked.bind(this)
                }
            });
        },
         //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------

        /**
         * @private
         * @param {MouseEvent} ev
         * @param {Object[]} chartElements
         */
        _onChartClicked: function (ev, chartElements) {
            if (chartElements && chartElements.length) {
                this.trigger_up('open_orders', {
                    size: this.sizes[chartElements[0]._index],
                });
            }
        },
    });

    return ChartWidget;
});
