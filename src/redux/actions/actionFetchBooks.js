import { 
    FETCH_BOOKS_LOADING, 
    FETCH_BOOKS_SUCCESS, 
    FETCH_BOOKS_ERROR } from "../contants";

import axios from "axios";


export const fetchBooksLoading = () => {
    return {
        type: FETCH_BOOKS_LOADING
    }
}

export const fetchBooksSuccess = data => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: data
    }
}

export const fetchBooksError = error => {
    return {
        type: FETCH_BOOKS_ERROR,
        payload: error
    }
}

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const fetchBooks = title => {
    return dispatch => {
        dispatch(fetchBooksLoading())
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${GOOGLE_API_KEY}&maxResults=20`)
        .then(response => {
            const booksItemsArray = response.data.items;
            dispatch(fetchBooksSuccess(booksItemsArray));
        })
        .catch(error => {
            dispatch(fetchBooksError(error))
        })
    }
}