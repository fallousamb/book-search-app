import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerAddBooks from "./reducers/reducerAddBook";
import { thunk } from "redux-thunk";
import reducerFetchedBooks from "./reducers/reducerFetchBooks";

const rootReducer = combineReducers({
    library: reducerAddBooks,
    search: reducerFetchedBooks
})


const store = configureStore({
    reducer: rootReducer,
    middleware: () => [thunk]
})

export default store;