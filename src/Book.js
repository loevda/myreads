/**
 * Created by david2099 on 11/07/17.
 */
import React from 'react'
import PropTypes from 'prop-types';

class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {

        const { book } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading" selected={book.shelf === 'currentlyReading' ? 'selected' : ''}>Currently Reading</option>
                            <option value="wantToRead" selected={book.shelf === 'wantToRead' ? 'selected' : ''}>Want to Read</option>
                            <option value="read" selected={book.shelf === 'read' ? 'selected' : ''}>Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    <pre className="no-margin no-padding">{book.authors.join('\n\r')}</pre>
                </div>
            </div>
        )
    }
}

export default Book

