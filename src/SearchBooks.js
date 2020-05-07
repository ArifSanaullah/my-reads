import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BooksShelf from "./BooksShelf";

class SearchBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      books: [],
    };
    this.queryChangeHandler = this.queryChangeHandler.bind(this);
  }

  queryChangeHandler(target) {
    this.setState((prevState) => ({ ...prevState, query: target.value }));

    BooksAPI.search(target.value) &&
      BooksAPI.search(target.value).then((books) => {
        if (books && books.length)
          this.setState((prevState) => ({
            ...prevState,
            books,
          }));
      });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.queryChangeHandler(e.target)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {/* <ol className="books-grid">
            {this.state.books &&
              this.state.books.map((book) => (
                <li key={book.id}>
                  <Book book={book} />
                </li>
              ))}
          </ol> */}
          {this.state.books && this.state.query && (
            <BooksShelf books={this.state.books} />
          )}
        </div>
      </div>
    );
  }
}
export default SearchBooks;
