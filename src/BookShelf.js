/**
 * Created by david2099 on 11/07/17.
 */
import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book'

class BookShelf extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired
    }

    render() {

        const { books, name } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                                <li>
                                    <Book title={book.title} />
                                </li>
                            )
                        )}
                    </ol>
                </div>
            </div>
        )
    }

}

export default BookShelf