odoo.define('awesome_tshirt.dashboard', function(require) {
    "use strict"

    // require local widget
    // const MyCounter = require('awesome_tshirt.MyCounter');
    const ChartWidget = require('awesome_tshirt.chart');

    // require module in Odoo
    const AbstractAction = require('web.AbstractAction');
    const core = require('web.core');

    const _t = core._t;
    const _lt = core._lt;
    const QWeb = core.qweb;

    // Creation dashboard widget
    const Dashboard = AbstractAction.extend({
        hasControlPanel: true,
        template: 'AwesomeDashboard',
        events: {
            'click .o_new_orders_btn': '_onOpenNewOrders',
            'click .o_customers_btn': '_onOpenCustomers',
            'click .o_cancelled_orders_btn': '_onOpenCancelledOrders',
        },
        custom_events: {
            'open_orders': '_onOpenOrders'
        },
        text: {
            'nb_new_orders': _lt("Number of new orders in this month :"),
            'total_amount': _lt("total amount of new orders this month :"),
            'average_quantity': _lt("average amount of t-shirt by order this month :"),
            'nb_cancelled_quantity': _lt("number of cancelled orders this month :"),
            'average_time': _lt("average time for an order to go from 'new' to 'sent' or 'cancelled' :")
        },
        willStart: function () {
            return Promise.all([
                this._loadStatistics(),
                this._super.apply(this, arguments)
            ]);
        },
        start: function () {
            return Promise.all([
                this._render(),
                this._super.apply(this, arguments)
            ]).then(() => {
                this._renderButtons();
            })
        },
        do_show: function () {
            return this._reload();
        },
        on_attach_callback: function () {
            this._reloadInterval = setInterval(this._reload.bind(this), 3000);
        },
        on_detach_callback: function () {
            clearInterval(this._reloadInterval);
        },
        _openOrders: function (params) {
            return this.do_action({
                name: params.name,
                res_model: 'awesome_tshirt.order',
                type: 'ir.actions.act_window',
                views: [[false, 'list'], [false, 'form']],
                domain: params.domain,
            });
        },
        _openLastWeekOrders: function (params) {
            const aWeekAgo = moment().subtract(7, 'd').locale('en').format('YYYY-MM-DD HH:mm:ss');

            params.domain = [['create_date', '>=', aWeekAgo]].concat(params.domain || []);

            return this._openOrders(params);
        },
        _onOpenCancelledOrders: function () {
            this._openLastWeekOrders({
                name: _t('Cancelled Orders'),
                domain: [['state', '=', 'cancelled']],
            });
        },
        _onOpenCustomers: function () {
            this.do_action('base.action_partner_customer_form');
        },
        _onOpenNewOrders: function () {
            this._openLastWeekOrders({
                name: _t('New Orders'),
                domain: [['state', '=', 'new']],
            });
        },
        _onOpenOrders: function (ev) {
        },
        _loadStatistics: function () {
            return this._rpc({
                route: '/awesome_tshirt/statistics',
                params: {},
            }).then((stats) => {
                this.stats = stats
            })
        },
        _render: function () {
            this.$('.o_content').html($(QWeb.render('AwesomeDashboard', { widget: this })));
            const chart = new ChartWidget(this, this.stats.orders_by_size)
            
            return chart.appendTo(this.$('o_chart'));
        },
        _reload: function () {
            return this._loadStatistics().then(() => this._render());
        },
        _renderButtons: function () {
            this.$('.o_control_panel').append($(QWeb.render('AwesomeDashboard.Buttons')));
        },
    });

    core.action_registry.add('awesome_tshirt.dashboard', Dashboard);

    return Dashboard;
})