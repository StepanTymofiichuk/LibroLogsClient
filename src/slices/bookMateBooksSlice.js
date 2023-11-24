import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookMatesBooks: [{
        _id: 1,
        title: "S. Lem ⟪Solaris⟫",
        genre: "science fiction",
        pages: 224,
        bookProgress: 224,
        bookType: "paper",
        status: "Completed",
        userId: "123lbsk",
        rating: 4
      }, {
        _id: 2,
        title: "D. Lehein ⟪Shutter Island⟫",
        genre: "thriller",
        pages: 300,
        bookProgress: 68,
        bookType: "e-book",
        status: "In Progress",
        userId: "348lbsk",
        rating: 3
      }]
}

const bookMateBooksSlice = createSlice({
    name: "bookMatesBooks",
    initialState,
    reducers: {
        setBookMatesBooks: (state, action) => {
            state.bookMatesBooks = action.payload;
            localStorage.setItem("bookMatesBooks", JSON.stringify(action.payload));
        },
        clearBookMatesBooksData: (state) => {
            state.bookMatesBooks = null;
            localStorage.removeItem("bookMatesBooks");
        }
    }
});

export const { setBookMatesBooks, clearBookMatesBooksData } = bookMateBooksSlice.actions;

export default bookMateBooksSlice.reducer;