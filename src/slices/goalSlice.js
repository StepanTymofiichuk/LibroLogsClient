import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userGoals: [{
        _id: 1,
        title: "Read part 1 of ⟪Solaris⟫",
        goalDeadline: "2023-10-20",
        goalDeadlineTime: "10:00",
        isCompleted: true,
        bookId: 1,
        userId: 1
    }, {
        _id: 2,
        title: "Read part 2 of ⟪Solaris⟫",
        goalDeadline: "2023-10-25",
        goalDeadlineTime: "16:30",
        isCompleted: false,
        bookId: 1,
        userId: 1
    }, {
        _id: 3,
        title: "Read part 3 of ⟪Solaris⟫",
        goalDeadline: "2023-10-30",
        goalDeadlineTime: "17:40",
        isCompleted: false,
        bookId: 1,
        userId: 1
    }, {
        _id: 4,
        title: "Read part 1 of ⟪Shutter Island⟫",
        goalDeadline: "2023-10-25",
        goalDeadlineTime: "12:30",
        isCompleted: false,
        bookId: 2,
        userId: 1
    }, {
        _id: 5,
        title: "Read part 2 of ⟪Shutter Island⟫",
        goalDeadline: "2023-10-30",
        goalDeadlineTime: "15:00",
        isCompleted: false,
        bookId: 2,
        userId: 1
    }],
}

const goalSlice = createSlice({
    name: "userGoals",
    initialState,
    reducers: {
        setGoals: (state, action) => {
            state.userGoals = action.payload;
            localStorage.setItem("userGoals", JSON.stringify(action.payload));
        },
        setUserGoals: (state, action) => {
            state.userGoals = action.payload;
        },
        addGoal: (state, action) => {
            state.userGoals.push(action.payload);
        },
        deleteGoal: (state, action) => {
            state.userGoals = state.userGoals.filter(goal => goal._id !== action.payload);
        },
        updateGoal: (state, action) => {
            const goal = action.payload.goalIndex;
            const isCompleted = action.payload.isCompleted;
            // console.log(book);
            state.userGoals[goal].isCompleted = isCompleted;
        },
        updateOldGoal: (state, action) => {
            const goal = action.payload.goalIndex;
            const goalTitle = action.payload.title;
            const goalDeadline = action.payload.goalDeadline;
            const goalDeadlineTime = action.payload.goalDeadlineTime;
            // console.log(book);
            state.userGoals[goal].title = goalTitle;
            state.userGoals[goal].goalDeadline = goalDeadline;
            state.userGoals[goal].goalDeadlineTime = goalDeadlineTime;
        },
        cleaGoalsData: (state) => {
            state.userGoals = null;
            localStorage.removeItem("userGoals");
        }
    }
});

export const { setGoals, setUserGoals, addGoal, deleteGoal, updateGoal, updateOldGoal, cleaGoalsData } = goalSlice.actions;

export default goalSlice.reducer;