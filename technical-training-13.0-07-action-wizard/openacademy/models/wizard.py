from odoo import api, models, fields


class Wizard(models.TransientModel):
    _name = "openacademy.wizard"
    _description = "Wizard: Quick registration of Attendees to Sessions"
    
    session_id = fields.Many2one('openacademy.session', string="Session", required=True)
    
    def _default_attendees(self):
        return self.env['res.partner'].browse(self._context.get('active_ids'))
    
    attendee_ids = fields.Many2many('res.partner', string="Attendees", default=_default_attendees)
    
    def subscribe(self):
        self.session_id.attendee_ids |= self.attendee_ids
        return {}
