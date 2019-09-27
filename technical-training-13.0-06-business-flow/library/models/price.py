from odoo import models, fields


class Price(models.Model):
    _name = "library.price"
    _description = "Library Prices"

    name = fields.Char()
    duration = fields.Float(string="Duration in days")
    price = fields.Float()
    type = fields.Selection(
        [('time', 'Based on time'), ('one', 'OneShot')], default="time")
