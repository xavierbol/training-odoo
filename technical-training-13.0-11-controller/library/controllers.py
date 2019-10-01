from odoo.http import Controller, route, request


class Library(Controller):
    @route('/library/<name>/books', auth="public", website=True)
    def book_list(self, name):
        CopyBooks = request.env['library.copy']
        return request.render('library.book_list', {
            'books': CopyBooks.search([['book_state', '=', 'available']])
        })
    
    @route('/library/<name>/books/<model("library.copy"):book/', auth="public", website=True)
    def book(self, name, book):
        return request.render('library.book', {
            'book': book
        })
        
    @route('/library/<name>/rent/<model("library.copy"):book/rent', auth="public", website=True)
    def rent_book(self, name, book):
        ...