# -*- coding: utf-8 -*-
from odoo import fields, models, api


class Rentals(models.Model):
    _name = 'library.rental'
    _description = 'Book rental'

    customer_id = fields.Many2one('library.partner', string='Customer')
    book_id = fields.Many2one('library.book', string='Book')

    rental_date = fields.Date()
    return_date = fields.Date()
    
#     @api.onchange('customer_id')
#     def onchange_customer_id(self):
#         self.customer_name = self.customer_id.name
#         self.customer_email = self.customer_id.email
#         self.customer_address = self.customer_id.address
    
#     @api.onchange('book_id')
#     def onchange_book_id(self):
#         self.book_name = self.book_id.name
#         self.book_edition = self.book_id.edition_date
#         self.book_isbn = self.book_id.isbn
        
    # Autre solution en utilisant les related fields
    customer_name = fields.Char(related="customer_id.name")
    customer_email = fields.Char(related="customer_id.email")
    customer_address = fields.Text(related="customer_id.address")
    
    book_name = fields.Char(related="book_id.name")
    book_edition = fields.Date(related="book_id.edition_date")
    book_isbn = fields.Char(related="book_id.isbn")
