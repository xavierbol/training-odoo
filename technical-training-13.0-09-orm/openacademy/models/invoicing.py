from odoo import api, models, fields


class Invoicing(models.Model):
    _name = "openacademy.invoicing"
    _description = "Sessions invoicing for a instructor"
    
    instructor_id = fields.Many2one('res.partner', string="Instructor", required=True, domain=[('instructor', '=', True)])
    session_ids = fields.Many2many('openacademy.session', String="Sessions invoicing")
    