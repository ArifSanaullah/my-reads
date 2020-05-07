import React from "react";
import Book from "./Book";

function BooksShelf({ heading, books }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{heading}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book) => (
              <li key={book.id} className="book">
                <Book book={book} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default BooksShelf;
