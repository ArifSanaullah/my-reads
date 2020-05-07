import React from "react";
import BooksShelf from "./BooksShelf";
import { Link } from "react-router-dom";

function BooksLists({ booksRead, booksReading, booksToRead }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BooksShelf heading="Currently Reading" books={booksReading} />
          <BooksShelf heading="Want to read" books={booksToRead} />
          <BooksShelf heading="Read" books={booksRead} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="open-search-link" />
      </div>
    </div>
  );
}

export default BooksLists;
