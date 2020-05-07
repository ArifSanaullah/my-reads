import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import BooksLists from "./BooksLists";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      booksToRead: [],
      booksRead: [],
      booksReading: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => {
        switch (book.shelf) {
          case "wantToRead":
            this.setState((prevState) => ({
              ...prevState,
              booksToRead: [...prevState.booksToRead, book],
            }));
            break;
          case "read":
            this.setState((prevState) => ({
              ...prevState,
              booksRead: [...prevState.booksRead, book],
            }));
            break;
          case "currentlyReading":
            this.setState((prevState) => ({
              ...prevState,
              booksReading: [...prevState.booksReading, book],
            }));
            break;
          default:
            break;
        }
      });
    });
  }

  render() {
    const { booksRead, booksReading, booksToRead } = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={() => <SearchBooks />} />
        <Route
          exact
          path="/"
          render={() => (
            <BooksLists
              booksRead={booksRead}
              booksReading={booksReading}
              booksToRead={booksToRead}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
