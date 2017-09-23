import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search';
import BookList from './BookList';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {};

    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search/>
                )}/>

                <Route exact path="/" render={() => (
                    <BookList/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
