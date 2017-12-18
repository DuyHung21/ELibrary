export default (state = [], action) => {
  switch (action.type){
    case "GET_ALL_BOOK": {
      return {
        ...state,
        allBooks: action.payload
      };
    }
    case "GET_BOOK_ID": {
      return {
        ...state,
        bookId: action.payload,
      }
    }

    case "GET_TOP_BOOK": {
      return {
        ...state,
        topBooks: action.payload,
      }
    }

    case "GET_ALL_BOOK_BY_LIBRARIAN": {
      return {
        ...state,
        allBooksForLibrarian: action.payload
      }
    }

    case "GET_BOOKS_UPLOADED": {
      return {
        ...state,
        booksUploaded: action.payload
      }
    }

    case "GET_BOOKS_DOWNLOADED": {
      return {
        ...state,
        booksDownloaded: action.payload
      }
    }

    case "GET_BOOKS_CATEGORY": {
      return {
        ...state,
        booksCategory: action.payload
      }
    }

    case "GET_BOOKS_SEARCHED": {
      return {
        ...state,
        booksSearched: action.payload
      }
    }

    case "SAVE_BOOKMARK": {
      return {
        ...state,
        booksMarked: action.payload 
      }
    }

    default: return state
  }
}