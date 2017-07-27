import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf'
import ListBooks from './ListBooks'
import { uniqBy, intersectionBy, differenceBy, concat } from 'lodash'

class BooksApp extends React.Component {
    state = {
        books: [],
        searchResult: [],
        query: ''
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    updateBooks(book) {
        const books = [...this.state.books]
        const searchResult = [...this.state.searchResult]
        books.forEach((aBook, index) => {
            if (aBook.id === book.id) {
                books.splice(index, 1)
            }
        })
        this.setState({ books: books.concat(book) })
        BooksAPI.update(book, book.shelf)
        searchResult.map((aBook, index) => {
            if (aBook.id === book.id) {
                aBook.shelf = book.shelf
            }
            return aBook
        })
        this.setState({ searchResult: searchResult })
    }

    updateSearch(event) {
        const query = event.target.value
        this.setState({ query })
        if(query) {
            BooksAPI.search(query, 20).then((books) => {
                if (books.error) {
                    this.setState({ searchResult: []})
                    console.log(books.error)
                }else{
                    const uniqueResult = uniqBy(books, 'id')
                    const querySet = concat(intersectionBy(this.state.books, uniqueResult, 'id'),
                        differenceBy(uniqueResult, this.state.books, 'id').map((item) => {
                        item.shelf = 'none'
                        return item
                    }))
                    this.setState({ searchResult: querySet })
                }
            })
        } else {
            this.setState({ searchResult: []})
        }
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
                                    <BookShelf books={this.state.books.filter((book) => book.shelf === 'currentlyReading' )} updateBooks={(book) => this.updateBooks(book)} name="Currently Reading"/>
                                    <BookShelf books={this.state.books.filter((book) => book.shelf === 'wantToRead' )} updateBooks={(book) => this.updateBooks(book)}  name="Want to Read"/>
                                    <BookShelf books={this.state.books.filter((book) => book.shelf === 'read' )} updateBooks={(book) => this.updateBooks(book)}  name="Read"/>
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
                                           <input type="text"
                                                  placeholder="Search by title or author"
                                                  onChange={(event) => this.updateSearch(event)}
                                                  value={this.state.query}
                                           />
                                       </div>
                                   </div>
                                   <div className="search-books-results">
                                       <ListBooks books={this.state.searchResult} updateBooks={(book) => this.updateBooks(book)} />
                                   </div>
                               </div>
                           )} />

                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
