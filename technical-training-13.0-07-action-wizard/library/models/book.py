# -*- coding: utf-8 -*-
from odoo import fields, models, api


class Books(models.Model):
    _inherit = 'product.product'

    author_ids = fields.Many2many("res.partner", string="Authors", domain=[('is_author', '=', True)])
    edition_date = fields.Date()
    isbn = fields.Char(string='ISBN', unique=True)
    publisher_id = fields.Many2one('res.partner', string='Publisher', domain=[('is_publisher', '=', True)])

    copy_ids = fields.One2many('library.copy', 'book_id', string="Book Copies")
    is_book = fields.Boolean(string='Is a Book', default=False)
    
    rental_count = fields.Integer(compute="_compute_rental_count")
    
    @api.depends('copy_ids')
    def _compute_rental_count(self):
        for book in self:
            book.rental_count = len(book.mapped('copy_ids.rental_ids'))
    
    def open_rentals(self):
        self.ensure_one()
        rental_ids = self.copy_ids.mapped('rental_ids')
        return {
            'name': 'Rentals of %s' % (self.name),
            'type': 'ir.actions.act_window',
            'res_model': 'library.rental',
            'view_mode': 'tree,form',
            'view_type': 'form',
            'domain': [('id', 'in', rental_ids.ids)],
        }


class BookCopy(models.Model):
    _name = 'library.copy'
    _description = 'Book Copy'
    _rec_name = 'reference'

    book_id = fields.Many2one('product.product', string="Book", domain=[('is_book', "=", True)], required=True, ondelete="cascade", delegate=True)
    reference = fields.Char(required=True, string="Ref")

    rental_ids = fields.One2many('library.rental', 'copy_id', string='Rentals')
    book_state = fields.Selection([('available', 'Available'), ('rented', 'Rented'), ('lost', 'Lost')], default="available")
