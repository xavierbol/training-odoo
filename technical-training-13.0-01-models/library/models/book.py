from odoo import models, fields


class Book(models.Model):
    _name = "library.book"
    _description = "Library Book"
    
    name = fields.Char(string="Title", required=True)
    author_ids = fields.Many2many('library.partner')
    edition_date = fields.Date()
    isbn = fields.Char(string="ISBN", required=True)
    
    publisher_id = fields.Many2one("library.publisher", string="Publisher")
    rental_ids = fields.One2many("library.rental", "book_id", string="Rentals")
    
    