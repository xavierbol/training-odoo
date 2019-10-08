# -*- coding: utf-8 -*-
{
    'name': "Awesome T-Shirt",
    'summary': "Manage your custom t-shirt printing business",
    'description': """
        This app helps you to manage a business of printing customized t-shirts
        for online customers. It offers a public page allowing customers to make
        t-shirt orders.
    """,
    'author': "Odoo",
    'category': 'Extra Tools',
    'version': '2.0',
    'application': True,
    'depends': ['base', 'web', 'base_geolocalize'],
    'data': [
        'assets.xml',
        'security/ir.model.access.csv',
        'views/awesome_tshirt_views.xml',
        'views/templates.xml',
    ],
    'license': 'AGPL-3',
    'qweb': [
        'static/src/xml/awesome_dashboard.xml',
        'static/src/xml/chart_widget.xml',
        'static/src/xml/warning_widget.xml',
        'static/src/xml/my_counter.xml',
    ]
}
