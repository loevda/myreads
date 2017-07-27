/**
 * Created by david2099 on 11/07/17.
 */
import React from 'react'
import PropTypes from 'prop-types';

class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateBooks: PropTypes.func.isRequired
    }

    handleShelfChange(event) {
        const value = event.target.value
        const book = {...this.props.book}
        book.shelf = value
        this.props.updateBooks(book)
    }

    getThumbnail() {
        return this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''
    }

    getAuthors() {
        return this.props.book.authors ? this.props.book.authors.join('\n\r') : ''
    }

    render() {

        const { book } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.getThumbnail()}` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={book.shelf} onChange={(event) => this.handleShelfChange(event)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    <pre className="no-margin no-padding">{this.getAuthors()}</pre>
                </div>
            </div>
        )
    }
}

export default Book

