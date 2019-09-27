# -*- coding: utf-8 -*-
from odoo import fields, models, api


class Partner(models.Model):
    _inherit = 'res.partner'

    is_author = fields.Boolean(string="Is an Author", default=False)
    is_publisher = fields.Boolean(string="Is a Publisher", default=False)

    current_rental_ids = fields.One2many('library.rental', 'customer_id', string='Current Rentals', domain=[('state', '=', 'rented')])
    old_rental_ids = fields.One2many('library.rental', 'customer_id', string='Old Rentals', domain=[('state', '=', 'returned')])
    lost_rental_ids = fields.One2many('library.rental', 'customer_id', string='Lost Rentals', domain=[('state', '=', 'lost')])
    
    book_ids = fields.Many2many('product.product', string="Books", domain=[('is_book', '=', True)])
    copy_ids = fields.Many2many('library.copy', string="Book Copies")
    
    qty_lost_book = fields.Integer(string="Number of book losts", compute="_get_lost_books_qty")
    payment_ids = fields.One2many('library.payment', 'customer_id', string="Payments")
    amount_owed = fields.Float(compute="_amount_owed", store=True)
    
    @api.multi
    def _get_lost_books_qty(self):
        for record in self:
            record.qty_lost_book = len(record.lost_rental_ids)
            
    @api.multi
    @api.depends('payment_ids.amount')
    def _amount_owed(self):
        for record in self:
            record.amount_owed = - sum(record.payment_ids.mapped('amount'))


class Payment(models.Model):
    _name = 'library.payment'
    _description = "Payment"
    
    date = fields.Date(required=True, default=fields.Date.context_today)
    amount = fields.Float()
    customer_id = fields.Many2one('res.partner', string="Customer", domain=[('customer', '=', True)])