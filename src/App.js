import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search';
import BookList from './BookList';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    shelfChanged = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(res => {
                let books = this.state.books;
                let bookFound = books.find(bookToFind => bookToFind.id === book.id);
                if (bookFound) {
                    bookFound.shelf = shelf;
                }
                else {
                    book.shelf = shelf;
                    books.push(book);
                }

                this.setState({books});
            })
            .catch(err => {
                alert('Something went wrong while changing book shelf. Error: ' + err)
            });
    };

    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search books={this.state.books}
                            onShelfChange={this.shelfChanged}/>
                )}/>

                <Route exact path="/" render={() => (
                    <BookList books={this.state.books}
                              onShelfChange={this.shelfChanged}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp;
