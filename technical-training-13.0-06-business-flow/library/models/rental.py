# -*- coding: utf-8 -*-
from odoo import api, fields, models


class Rentals(models.Model):
    _name = 'library.rental'
    _description = 'Book rental'

    customer_id = fields.Many2one('res.partner', string='Customer')
    copy_id = fields.Many2one('library.copy', string="Book Copy")
    book_id = fields.Many2one(
        'product.product', string='Book', related='copy_id.book_id', readonly=True)

    rental_date = fields.Date(default=fields.Date.context_today)
    return_date = fields.Date()

    customer_address = fields.Text(compute='_compute_customer_address')
    customer_email = fields.Char(related='customer_id.email')

    book_authors = fields.Many2many(related='copy_id.author_ids')
    book_edition_date = fields.Date(related='copy_id.edition_date')
    book_publisher = fields.Many2one(related='copy_id.publisher_id')

    state = fields.Selection(
        [("draft", "Draft"), ("rented", "Rented"), ("returned", "Returned"), ("lost", "Lost")], default="draft")

    @api.depends('customer_id')
    def _compute_customer_address(self):
        self.customer_address = self.customer_id.contact_address

    @api.multi
    def action_confirm(self):
        for record in self:
            record.state = 'rented'
            record.copy_id.book_state = 'rented'
            record.add_fee('time')

    @api.multi
    def add_fee(self, type):
        for rec in self:
            if type == 'time':
                price_id = self.env.ref('library.price_rent')
                delta_dates = fields.Date.from_string(
                    rec.return_date) - fields.Date.from_string(rec.rental_date)
                amount = delta_dates.days * price_id.price / price_id.duration
            elif type == 'loss':
                price_id = self.env.ref('library.price_loss')
                amount = price_id.price
            else:
                return

            self.env['library.payment'].create({
                'customer_id': rec.customer_id.id,
                'date':        rec.rental_date,
                'amount': - amount,
            })

    @api.multi
    def action_return(self):
        for record in self:
            record.state = 'returned'
            record.copy_id.book_state = 'available'

    @api.multi
    def action_lost(self):
        for record in self:
            record.state = 'lost'
            record.copy_id.book_state = 'lost'
            record.add_fee('loss')

    @api.model
    def _cron_check_date(self):
        late_rentals = self.search([('state', '=', 'rented'), ('return_date', '<', fields.Date.today())])
        template_id = self.env.ref('library.mail_template_book_return')
        for rec in late_rentals:
            mail_id = template_id.send_mail(rec.id)
