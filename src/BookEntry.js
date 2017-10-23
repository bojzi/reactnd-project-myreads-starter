import * as React from 'react';
import PropTypes from 'prop-types';

class BookEntry extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    };

    render() {
        const { book, onShelfChanged } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <img className="book-cover" src={book.imageLinks ? book.imageLinks.thumbnail : './icons/book-placeholder.jpg'}
                             alt={book.title}/>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => onShelfChanged(book, e)}
                                    value={book.shelf ? book.shelf : 'none'}>
                                <option value="moveTo" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                </div>
            </li>
        )
    }
}

export default BookEntry;