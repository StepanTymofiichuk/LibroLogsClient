import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSessions: [{
        _id: 1,
        progress: 224,
        status: "Completed",
        bookId: 1,
        userId: 1
    }]
}

const sessionSlice = createSlice({
    name: "userSessions",
    initialState,
    reducers: {
        setReadingSession: (state, action) => {
            state.userSessions = action.payload;
            localStorage.setItem("userSessions", JSON.stringify(action.payload));
        },
        addReadingSession: (state, action) => {
            state.userSessions.sessions.push(action.payload);
        },
        updateReadingSession: (state, action) => {
            console.log(action.payload._id, action.payload.progress);
        },
        clearSessionsData: (state) => {
            state.userSessions = null;
            localStorage.removeItem("userSessions");
        }
    }
});

export const { setReadingSession, addReadingSession, updateReadingSession, clearSessionsData } = sessionSlice.actions;

export default sessionSlice.reducer;