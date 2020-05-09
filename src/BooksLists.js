import React from "react";
import { Link } from "react-router-dom";
import BooksShelf from "./BooksShelf";

function BooksLists({ booksRead, booksReading, booksToRead, onShelfChange }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BooksShelf
            heading="Currently Reading"
            books={booksReading}
            onShelfChange={onShelfChange}
            shelf="currentlyReading"
          />

          <BooksShelf
            heading="Want to read"
            books={booksToRead}
            onShelfChange={onShelfChange}
            shelf="wantToRead"
          />

          <BooksShelf
            heading="Read"
            books={booksRead}
            onShelfChange={onShelfChange}
            shelf="read"
          />
        </div>
      </div>

      <div className="open-search">
        <Link to="/search" className="open-search-link" />
      </div>
    </div>
  );
}

export default BooksLists;
