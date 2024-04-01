import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from "../contants";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_BOOKS_KEY = "booksData";

const intialState = {
    books: []
}

const helperAddData = action => {
    return {
        id:uuidv4(),
        title: action.payload.title,
        author: action.payload.author
    }
}

const helperRemoveDataById = (state, id) => {
    return state.filter(book => book.id !== id);
}

//reducer
const reducerAddBooks = (state = intialState.books, action) => {

    if(localStorage.getItem(LOCAL_STORAGE_BOOKS_KEY)) {
        state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BOOKS_KEY))
    }
    switch (action.type) {
        case ADD_BOOKS:
            state = [...state, helperAddData(action)];
            localStorage.setItem(LOCAL_STORAGE_BOOKS_KEY, JSON.stringify(state))
            return state;
        
        case DELETE_BOOK:
            state = helperRemoveDataById(state, action.payload)
            localStorage.setItem(LOCAL_STORAGE_BOOKS_KEY, JSON.stringify(state))
            return state;
        
        case DELETE_ALL_BOOKS:
            state = []
            localStorage.setItem(LOCAL_STORAGE_BOOKS_KEY, JSON.stringify(state))
            return state

    
        default:
            return state;
    }
    
}

export default reducerAddBooks