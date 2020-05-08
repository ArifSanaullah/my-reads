import React from "react";
import { Route, withRouter } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import BooksLists from "./BooksLists";

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
      booksToRead: [],
      booksRead: [],
      booksReading: [],
      changedShelf: null,
    };
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  onShelfChange(book, target) {
    const changedShelf = target.value;
    const { booksRead, booksReading, booksToRead } = this.state;
    this.setState({ changedShelf }, () => {
      if (changedShelf) {
        BooksAPI.update(book, changedShelf).then((books) => {
          const prevBooks = [...booksReading, ...booksToRead, ...booksRead];

          const read = prevBooks.filter((book) => books.read.includes(book.id));

          const currentlyReading = prevBooks.filter((book) =>
            books.currentlyReading.includes(book.id)
          );

          const wantToRead = prevBooks.filter((book) =>
            books.wantToRead.includes(book.id)
          );

          this.setState({
            booksRead: read,
            booksReading: currentlyReading,
            booksToRead: wantToRead,
            changedShelf: null,
          });
          this.props.history.push("/");
        });
      }
    });
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
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
        <Route
          exact
          path="/search"
          render={() => <SearchBooks onShelfChange={this.onShelfChange} />}
        />

        <Route
          exact
          path="/"
          render={() => (
            <BooksLists
              booksRead={booksRead}
              booksReading={booksReading}
              booksToRead={booksToRead}
              onShelfChange={this.onShelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(BooksApp);
