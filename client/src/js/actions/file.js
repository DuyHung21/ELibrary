import { request, BASE_URL } from "../api"
import axios from "axios";
import { isEmpty } from "lodash";

export const uploadFile = uploadFile => {
  return dispatch => {
    return request().post("/api/books", uploadFile)
    .then(res => {
      console.log(res);
    })
  }
}

export const getAllBooks = () => {
  return dispatch => {
    return request().get("/api/books")
    .then(res => {
      dispatch({
        type: "GET_ALL_BOOK",
        payload: res.data
      })
    })
  }
}

export const getCatBooks = (obj) => {
  return dispatch => {
    return request().get("/api/books", {obj})
    .then(res => {
      console.log(res);
    })
  }
}

export const getBookId = id => {
  return dispatch => {
    return request().get(`/api/books/${id}`, {id})
    .then(res => {
      const book = res.data;
      request().get(`/api/books/${id}/viewed`, {id})
      .then(res => {
        dispatch({
          type: "GET_BOOK_ID",
          payload: { ...book, ...res.data } 
        })
      })
    })
  }
}

export const getViewBookId = id => {
  return dispatch => {
    return request().get(`/api/books/${id}/viewed`, {id})
    .then(res => {
      console.log(res.data);
    })
  }
}

export const onDowloadBook = () => {
  return (dispatch, getState) => {
    const state = getState();
    const linkDownload = `${state.books.bookId.BOOK_URL}?bookId=${state.books.bookId.BOOK_ID}`;
    return request().get(linkDownload, {
      responseType: 'blob'
    })
    .then(res => {
      const url = URL.createObjectURL(res.data);
      window.open(url, "_blank");
    })
  }
}

export const getAllBooksByLibrarian = () => {
  return dispatch => {
    return request().get("/api/librarian/books")
    .then(res => {
      dispatch(dispatchGetAllBooksByLibrarian(res.data));
    })
  }
}

export const approveBook = (id) => {
  return dispatch => {
    return request().post(`/api/books/${id}/approve`)
    .then(res => {
      request().get("/api/librarian/books")
      .then(res => {
        dispatch(dispatchGetAllBooksByLibrarian(res.data));
      })
    })
  }
}

export const banBook = id => {
  return dispatch => {
    return request().post(`/api/books/${id}/reject`)
    .then(res => {
      request().get("/api/librarian/books")
      .then(res=> {
        dispatch(dispatchGetAllBooksByLibrarian(res.data));
      })
    })
  }
}

const dispatchGetAllBooksByLibrarian = (data) => {
  return {
    type: "GET_ALL_BOOK_BY_LIBRARIAN",
    payload: data
  }
}

export const getBooksUploaded = () => {
  return (dispatch, getState) => {
    return request().get(`/api/books?userId=${getState().userActive.id}&action=uploaded`)
    .then(res=>{
      dispatch({
        type: "GET_BOOKS_UPLOADED",
        payload: res.data
      })
    })
  }
}

export const getBooksDownloaded = () => {
  return (dispatch, getState) => {
    return request().get(`/api/books?userId=${getState().userActive.id}&action=downloaded`)
    .then(res=>{
      dispatch({
        type: "GET_BOOKS_DOWNLOADED",
        payload: res.data
      })
    })
  }
}

export const getBooksByCategory = (id) => {
  return dispatch => {
    return request().get(`/api/books?categoryId=${id}`)
    .then(res=>{
      dispatch({
        type: "GET_BOOKS_CATEGORY",
        payload: res.data
      })
    })
  }
}
