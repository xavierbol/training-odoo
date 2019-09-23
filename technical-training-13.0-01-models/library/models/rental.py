from odoo import models, fields


class Rental(models.Model):
    _name = "library.rental"
    _description = "Library Rental"
    
    customer_id = fields.Many2one('library.partner', string="Customer")
    book_id = fields.Many2one('library.book', string='Book')
    
    rental_date = fields.Date()
    return_date = fields.Date()