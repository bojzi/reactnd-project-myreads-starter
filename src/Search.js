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
        searchedBooks: []
    };

    componentWillReceiveProps(nextProps) {
        this.setBooksAlreadyInShelves(nextProps.books, this.state.searchedBooks);
    }

    handleShelfChange = (book, e) => {
        if (this.props.onShelfChange)
            this.props.onShelfChange(book, e.target.value);
    };

    handleSearch = (e) => {
        BooksAPI.search(e.target.value, 20)
            .then((data) => {
                this.setBooksAlreadyInShelves(this.props.books, data);
                let knownBookIds = this.props.books.map(book => book.id);
                let unknownBooks = data.filter(book => !knownBookIds.includes(book.id));
                this.setState({searchedBooks: unknownBooks});
            })
            .catch((err) => {
                alert('There was an error while searching. Error: ' + err);
            });
    };

    setBooksAlreadyInShelves(knownBooks, searchedbooks) {
        let knownBookIds = knownBooks.map(book => book.id);
        let unknownBooks = searchedbooks.filter(book => !knownBookIds.includes(book.id));
        this.setState({searchedBooks: unknownBooks});
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