import React from "react";
import Book from "./Book";

function BooksShelf({ heading, books, onShelfChange, shelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{heading}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book) => {
              !book.shelf && (book.shelf = "currentlyReading");
              return (
                <li key={book.id} className="book">
                  <Book
                    book={book}
                    onShelfChange={onShelfChange}
                    shelf={shelf}
                  />
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}

export default BooksShelf;
