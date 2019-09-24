from odoo import models, fields, api


class Course(models.Model):
    _name = 'openacademy.course'
    _description = "OpenAcademy Courses"

    name = fields.Char(string="Title", required=True)
    description = fields.Text()

    responsible_id = fields.Many2one(
        'openacademy.partner', ondelete='set null', string="Responsible", index=True)
    
    level = fields.Selection(selection=[('1', 'Easy'), ('2', 'Medium'), ('3', 'Hard')], string="Difficulty Level")


class Session(models.Model):
    _name = 'openacademy.session'
    _description = "OpenAcademy Sessions"

    name = fields.Char(required=True)
    start_date = fields.Date()
    duration = fields.Float(digits=(6, 2), help="Duration in days")
    seats = fields.Integer(string="Number of seats")

    instructor_id = fields.Many2one('openacademy.partner', string="Instructor")
    course_id = fields.Many2one(
        'openacademy.course', ondelete='cascade', string="Course", required=True)
    attendee_ids = fields.Many2many('openacademy.partner', string="Attendes")