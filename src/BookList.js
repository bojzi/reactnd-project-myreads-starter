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
        shelves: {}
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

    getShelfName(shelfId) {
        switch (shelfId) {
            case 'currentlyReading':
                return 'Currently Reading';
            case 'wantToRead':
                return 'Want to Read';
            case 'read':
                return 'Read';
            default:
                return 'Unknown shelf';
        }
    }

    filterBooksByShelves(books) {
        let booksByShelves = books.reduce((acc, book) => {
            if (acc[book.shelf]) {
                acc[book.shelf].push(book);
            }
            else {
                acc[book.shelf] = [book];
            }

            return acc;
        }, []);

        this.setState({
            shelves: booksByShelves
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
                        {Object.entries(this.state.shelves).map((shelf) => (
                            <div key={shelf[0]} className="bookshelf">
                                <h2 className="bookshelf-title">{this.getShelfName(shelf[0])}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {shelf[1].map((book) => (
                                            <BookEntry
                                                key={book.id}
                                                book={book}
                                                onShelfChanged={this.handleShelfChange} />
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}
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