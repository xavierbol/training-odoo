from odoo import api, models, fields

                
class SelectBooksToRent(models.TransientModel):
    _name = "select_book.wizard"
    _description = "Wizard to select books to create rental"
    
    customer_id = fields.Many2one('res.partner', string="Customer")
    rental_ids = fields.Many2many('library.rental', string="Rental", required=True)
    return_date = fields.Date()
    
    def _default_books(self):
        return self.env['library.copy'].browse(self._context.get('active_ids'))
    
    copy_ids = fields.Many2many('library.copy', string="Copy books", default=_default_books)
    
    def next_step(self):
        for copy in self.copy_ids:
            copy.rental_ids |= self.env['library.rental'].create({
                'copy_id': copy.id,
                'customer_id': self.customer_id.id,
                'return_date': self.return_date
            })
        return {
            'name': 'Rentals of %s' % (self.customer_id.name),
            'type': 'ir.actions.act_window',
            'res_model': 'library.rental',
            'view_mode': 'tree,form',
            'view_type': 'form',
            'domain': [('state', '=', 'draft'), ('customer_id', '=', self.customer_id.id)],
            'target': 'self'
        }
