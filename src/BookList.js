import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookEntry from './BookEntry';

class BookList extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    };

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    };

    handleShelfChange = (book, e) => {
        if (this.props.onShelfChange)
            this.props.onShelfChange(book, e.target.value);
    };

    componentDidMount() {
        this.filterBooksByShelves(this.props.books);
    }

    componentWillReceiveProps(nextProps) {
        this.filterBooksByShelves(nextProps.books);
    }

    filterBooksByShelves(books) {
        this.setState({
            currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
            wantToRead: books.filter(book => book.shelf === 'wantToRead'),
            read: books.filter(book => book.shelf === 'read')
        });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            this.state.currentlyReading.length > 0 &&
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.state.currentlyReading.map((book) => (
                                            <BookEntry
                                                key={book.id}
                                                book={book}
                                                onShelfChanged={this.handleShelfChange}/>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        }
                        {
                            this.state.wantToRead.length > 0 &&
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.state.wantToRead.map((book) => (
                                            <BookEntry
                                                key={book.id}
                                                book={book}
                                                onShelfChanged={this.handleShelfChange}/>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        }
                        {
                            this.state.read.length > 0 &&
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.state.read.map((book) => (
                                            <BookEntry
                                                key={book.id}
                                                book={book}
                                                onShelfChanged={this.handleShelfChange}/>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookList;