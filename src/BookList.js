import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookList extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    };

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

    render() {
        let booksByCategory = this.props.books.reduce((acc, book) => {
            if (acc[book.shelf]) {
                acc[book.shelf].push(book);
            }
            else {
                acc[book.shelf] = [book];
            }

            return acc;
        }, []);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.entries(booksByCategory).map((bookCategory) => (
                            <div key={bookCategory[0]} className="bookshelf">
                                <h2 className="bookshelf-title">{this.getShelfName(bookCategory[0])}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookCategory[1].map((book) => (
                                            <li key={book.industryIdentifiers.filter(id => id.type === 'ISBN_13')[0].identifier}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <img className="book-cover" src={book.imageLinks.thumbnail}
                                                             alt={book.title}/>
                                                        <div className="book-shelf-changer">
                                                            <select>
                                                                <option value="none" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors.join(', ')}</div>
                                                </div>
                                            </li>
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