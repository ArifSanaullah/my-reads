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
      changedShelf: null,
      read: [],
      wantToRead: [],
      currentlyReading: [],
      route: "/",
    };

    this.onShelfChange = this.onShelfChange.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
  }

  onShelfChange(book, target) {
    const changedShelf = target.value;

    if (changedShelf) {
      BooksAPI.update(book, changedShelf).then((books) => {
        this.setState((prevState) => {
          const { wantToRead, currentlyReading, read } = prevState;
          const prevBooks = [...wantToRead, ...currentlyReading, ...read];

          const booksRead = prevBooks.filter((book) =>
            books.read.includes(book.id)
          );

          const booksWantToRead = prevBooks.filter((book) =>
            books.wantToRead.includes(book.id)
          );

          const booksCurrentlyReading = prevBooks.filter((book) =>
            books.currentlyReading.includes(book.id)
          );

          return {
            ...prevState,
            read: booksRead,
            wantToRead: booksWantToRead,
            currentlyReading: booksCurrentlyReading,
          };
        });
      });
      if (this.state.route !== "/") {
        this.props.history.push("/");
      }
    }
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => {
        !book.shelf && (book.shelf = "currentlyReading");
        switch (book.shelf) {
          case "currentlyReading":
            this.setState((prevState) => ({
              ...prevState,
              currentlyReading: [...prevState.currentlyReading, book],
            }));
            break;
          case "read":
            this.setState((prevState) => ({
              ...prevState,
              read: [...prevState.read, book],
            }));
            break;
          case "wantToRead":
            this.setState((prevState) => ({
              ...prevState,
              wantToRead: [...prevState.wantToRead, book],
            }));
            break;
          default:
            break;
        }
      });
    });
  }

  render() {
    const { currentlyReading, read, wantToRead } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={(props) => (
            <SearchBooks
              {...props}
              onShelfChange={this.onShelfChange}
              onChangeRoute={this.onChangeRoute}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <BooksLists
              booksRead={read}
              booksReading={currentlyReading}
              booksToRead={wantToRead}
              onShelfChange={this.onShelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(BooksApp);
