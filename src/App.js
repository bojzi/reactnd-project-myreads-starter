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
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                book.shelf = shelf;

                this.setState(state => ({
                    books: state.books.filter(b => b.id !== book.id).concat([book])
                }));
            })
            .catch(err => {
                console.log('Something went wrong while changing book shelf. Error: ' + err)
            });
        }
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
