import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSessions: [{
        _id: 1,
        progress: 174,
        status: "In Progress",
        bookId: 1,
        userId: 1,
        createdAt: "2023-10-20",
        updatedAt: "2023-10-20",
    }, {
        _id: 2,
        progress: 150,
        status: "In Progress",
        bookId: 2,
        userId: 1,
        createdAt: "2023-10-25",
        updatedAt: "2023-10-25",
    }, {
        _id: 3,
        progress: 50,
        status: "In Progress",
        bookId: 1,
        userId: 1,
        createdAt: "2023-10-25",
        updatedAt: "2023-10-25",
    }, {
        _id: 4,
        progress: 65,
        status: "In Progress",
        bookId: 1,
        userId: 1,
        createdAt: "2023-10-30",
        updatedAt: "2023-10-30",
    }, {
        _id: 4,
        progress: 50,
        status: "In Progress",
        bookId: 2,
        userId: 1,
        createdAt: "2023-10-30",
        updatedAt: "2023-10-30",
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
            state.userSessions.push(action.payload);
        },
        removeSessions: (state, action) => {
            state.userSessions = state.userSessions.filter(session => session.bookId !== action.payload);
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

export const { setReadingSession, addReadingSession, removeSessions, updateReadingSession, clearSessionsData } = sessionSlice.actions;

export default sessionSlice.reducer;