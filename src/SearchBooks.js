import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BooksShelf from "./BooksShelf";

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.queryChangeHandler(e.target)}
            />
          </div>
        </div>

        <div className="search-books-results">
          {this.state.books && this.state.query && (
            <BooksShelf
              books={this.state.books}
              onShelfChange={this.props.onShelfChange}
              shelf="none"
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
