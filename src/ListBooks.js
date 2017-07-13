/**
 * Created by david2099 on 12/07/17.
 */
import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book'


class ListBooks extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render() {

        const { books } = this.props

        return (
            <ol className="books-grid">
                {books.map((book) => (
                        <li key={book.title}>
                            <Book book={book} />
                        </li>
                    )
                )}
            </ol>
        )
    }
}

export default ListBooks