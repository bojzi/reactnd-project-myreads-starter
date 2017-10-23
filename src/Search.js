import * as React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import BookEntry from './BookEntry';

class Search extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    };

    state = {
        error: '',
        searchedBooks: []
    };

    componentWillReceiveProps(nextProps) {
        this.setBookShelves(nextProps.books, this.state.searchedBooks);
    }

    handleShelfChange = (book, e) => {
        if (this.props.onShelfChange)
            this.props.onShelfChange(book, e.target.value);
    };

    handleSearch = (e) => {
        this.setState({error: ''});
        BooksAPI.search(e.target.value, 20)
            .then((data) => {
                if (data.error) {

                }
                else if (data) {
                    this.setBookShelves(this.props.books, data);
                }
            })
            .catch((err) => {
                this.setState({error: err.toString(), searchedBooks: []});
                console.log('There was an error while searching. Error: ' + err);
            });
    };

    setBookShelves(booksInLibrary, searchedBooks) {
        const newBookShelves = searchedBooks.map((book) => {
            let knownBook = booksInLibrary.find(bookInLibrary => bookInLibrary.id === book.id);
            if (knownBook) {
                book.shelf = knownBook.shelf;
            }

            return book;
        });

        this.setState({searchedBooks: newBookShelves});
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.handleSearch} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    { this.state.error && (
                        <p>There was an error: {this.state.error}</p>
                    )}
                    { this.state.searchedBooks.length === 0 && !this.state.error && (
                        <p>There are no results.</p>
                    )}
                    <ol className="books-grid">
                        {this.state.searchedBooks.map((book) => (
                            <BookEntry
                                key={book.id}
                                book={book}
                                onShelfChanged={this.handleShelfChange}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;