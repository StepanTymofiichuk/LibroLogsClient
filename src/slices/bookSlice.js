import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userBooks: [{
        _id: 1,
        title: "S. Lem ⟪Solaris⟫",
        genre: "science fiction",
        pages: 224,
        bookProgress: 224,
        bookType: "paper",
        status: "Completed",
        rating: 4
      }, {
        _id: 2,
        title: "D. Lehein ⟪Shutter Island⟫",
        genre: "thriller",
        pages: 300,
        bookProgress: 68,
        bookType: "e-book",
        status: "In Progress",
        rating: 3
      }, {
        _id: 3,
        title: "J. Steinback ⟪The Grapes of Wrath⟫",
        genre: "fiction",
        pages: 450,
        bookProgress: 170,
        bookType: "paper",
        status: "In Progress",
        rating: 1
      }],
}

const bookSlice = createSlice({
    name: "userBooks",
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.userBooks = action.payload;
            localStorage.setItem("userBooks", JSON.stringify(action.payload));
        },
        setUserBookRating: (state, action) => {
            state.userBooks[action.payload.bookIndex].rating = action.payload.newRating;
            // localStorage.setItem("userBooks", JSON.stringify(action.payload));
        },
        addBook: (state, action) => {
            state.userBooks.push(action.payload);
        },
        deleteBook: (state, action) => {
            state.userBooks = state.userBooks.filter(book => book._id !== action.payload);
        },
        updateBook: (state, action) => {
            const book = action.payload.bookIndex;
            const bookProgress = action.payload.bookProgress;
            const status = action.payload.status;
            // console.log(book);
            state.userBooks[book].bookProgress = bookProgress;
            state.userBooks[book].status = status;
        },
        clearBooksData: (state) => {
            state.userBooks = null,
            localStorage.removeItem("userBooks");
        }
    }
});

export const { setBooks, setUserBookRating, addBook, deleteBook, updateBook, clearBooksData } = bookSlice.actions;

export default bookSlice.reducer;