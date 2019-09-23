from odoo import models, fields


class Partner(models.Model):
    _name = "library.partner"
    _description = "Library Partner"
    
    name = fields.Char(string="Partner", required=True)
    address = fields.Char(string="Address")
    email = fields.Char(string="Email")
    
    book_ids = fields.Many2many("library.book")
    rental_ids = fields.One2many("library.rental", "customer_id", string="Rentals")