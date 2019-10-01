from odoo import http


class Session(http.Controller):
    @http.route('/openacademy', auth='public', website="True")
    def openacademy(self):
        return '<h1>Bienvenue dans OpenAcademy</h1>'

    @http.route('/openacademy/sessions', auth="public", website="True")
    def index(self):
        Sessions = http.request.env['openacademy.session']
        return http.request.render('session.index', {
            'sessions': Sessions.search([])
        })
    