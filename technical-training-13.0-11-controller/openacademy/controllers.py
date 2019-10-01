from odoo import http


class Session(http.Controller):
    @http.route('/openacademy', auth='public', website=True)
    def openacademy(self):
        return '<h1>Bienvenue dans OpenAcademy</h1>'
    
    @http.route('/openacademy/courses', auth="public", website=True)
    def course_list(self):
        Courses = http.request.env['openacademy.course']
        return http.request.render('openacademy.course_list', {
            'courses': Courses.search([])
        })

    @http.route('/openacademy/sessions', auth="public", website=True)
    def session_list(self):
        Sessions = http.request.env['openacademy.session']
        return http.request.render('openacademy.session_list', {
            'sessions': Sessions.search([])
        })
    
    @http.route('/openacademy/sessions/<model("openacademy.session"):session>/', auth="public", website=True)
    def session(self, session):
        return http.request.render('openacademy.session', {
            'session': session
        })