import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userGoals: [{
        _id: 1,
        title: "Read part 1",
        goalDeadline: "2023-10-20",
        isCompleted: true,
        bookId: 1,
        userId: 1
    }, {
        _id: 2,
        title: "Read part 2",
        goalDeadline: "2023-10-25",
        isCompleted: false,
        bookId: 1,
        userId: 1
    }, {
        _id: 3,
        title: "Read part 3",
        goalDeadline: "2023-10-30",
        isCompleted: false,
        bookId: 1,
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
            state.userGoals.goals.push(action.payload);
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
        cleaGoalsData: (state) => {
            state.userGoals = null;
            localStorage.removeItem("userGoals");
        }
    }
});

export const { setGoals, setUserGoals, addGoal, deleteGoal, updateGoal, cleaGoalsData } = goalSlice.actions;

export default goalSlice.reducer;