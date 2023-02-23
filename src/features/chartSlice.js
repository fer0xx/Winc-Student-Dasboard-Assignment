import {createSlice} from "@reduxjs/toolkit";
import data from "../Data";

const extractDistinctStudents = data => [...new Set(data.map(item => item.name))]
    .sort()
    .map(item => ({first_name: item}));

const initialState = {
    loading: true,
    mode: "dark",
    chartData: data,
    students: extractDistinctStudents(data),
    chartType: "bar",
    chartContentTypes: {
        difficulty: true,
        fun: true
    },
    sortType: "assignment-asc",
    studentFilter: [],
};

const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setMode: (state, action) => {
            state.mode = action.payload
        },
        setStudents: (state, action) => {
            state.students = state.students.map((student, index) =>
                ({...student, ...action.payload[index]}))
        },
        setChartType: (state, action) => {
            state.chartType = action.payload
        },
        setChartContentType: (state, action) => {
            const {name, checked} = action.payload;
            state.chartContentTypes = {...state.chartContentTypes, [name]: checked};
        },
        setSortType: (state, action) => {
            state.sortType = action.payload
        },
        setStudentFilter: (state, action) => {
            state.studentFilter = typeof action.payload === "string" ?
                action.payload.split(",") : action.payload;
        },
    },
});

export const {
    setLoading,
    setMode,
    setStudents,
    setChartType,
    setChartContentType,
    setSortType,
    setStudentFilter,
} = chartSlice.actions;

export default chartSlice.reducer;
