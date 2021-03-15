from odoo import api, fields, models

class message_of_the_day(models.Model):
    _name = "oepetstore.message"

    # @api.model
    # def my_method(self):
    #     return {"hello": "world"}

    message = fields.Text()
    color = fields.Char()
    text = fields.Text(string="Text")


class product(models.Model):
    _inherit = "product.product"

    max_quantity = fields.Float(string="Maximum Quantity")

class View(models.Model):
    _inherit="ir.ui.view"

    type = fields.Selection(selection_add=[('customform', 'CustomForm')])
