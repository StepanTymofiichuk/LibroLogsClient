import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookMates: [{
        _id: "123lbsk",
        name: "Jane Doe",
        email: "janedoe@email.com"
    }, {
        _id: "348lbsk",
        name: "Mary Moe",
        email: "marymoe@email.com"
    }]
}

const bookMateSlice = createSlice({
    name: "bookMates",
    initialState,
    reducers: {
        setBookMates: (state, action) => {
            state.bookMates = action.payload;
            localStorage.setItem("bookMates", JSON.stringify(action.payload));
        },
        clearBookMatesData: (state) => {
            state.bookMates = null;
            localStorage.removeItem("bookMates");
        }
    }
});

export const { setBookMates, clearBookMatesData } = bookMateSlice.actions;

export default bookMateSlice.reducer;