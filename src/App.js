import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">

                    <Route exact path="/" render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    <BookShelf books={this.state.books.filter((book) => book.shelf === 'currentlyReading' )} name="Currently Reading"/>
                                    <BookShelf books={this.state.books.filter((book) => book.shelf === 'wantToRead' )} name="Want to Read"/>
                                    <BookShelf books={this.state.books.filter((book) => book.shelf === 'read' )} name="Read"/>
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search">
                                    Add a book
                                </Link>
                            </div>
                        </div>
                    )} />


                    <Route path="/search"
                           render={() => (
                               <div className="search-books">
                                   <div className="search-books-bar">

                                       <Link to="/" className="close-search">
                                           Close
                                       </Link>

                                       <div className="search-books-input-wrapper">
                                           <input type="text" placeholder="Search by title or author"/>
                                       </div>
                                   </div>
                                   <div className="search-books-results">
                                       <ol className="books-grid"></ol>
                                   </div>
                               </div>
                           )} />

                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
