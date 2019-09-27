from odoo import api, models, fields


class Wizard(models.TransientModel):
    _name = "openacademy.wizard"
    _description = "Wizard: Quick registration of Attendees to Sessions"
    
    session_id = fields.Many2one('openacademy.session', string="Session", required=True, default="_default_session")
    attendee_ids = fields.Many2many('res.partner', string="Attendees")
    
    def _default_session(self):
        return self.env['openacademy.session'].browse(self._context.get('active_id'))
    
    def subscribe(self):
        self.session_id.atendee_ids |= self.attendee_ids
        return {}
