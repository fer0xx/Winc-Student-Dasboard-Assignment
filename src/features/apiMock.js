import {createAsyncThunk} from "@reduxjs/toolkit";
import {setStudents} from "./chartSlice";

export const fetchStudents = createAsyncThunk(
    'students/fetch',
    async (_, {dispatch}) => {
        const mockData = window.localStorage.getItem('mockData');
        if (mockData) {
            const students = JSON.parse(mockData);
            console.log('Mock data fetched from local storage', students);
            dispatch(setStudents(students));
        } else {
            fetch('https://my.api.mockaroo.com/students.json?key=41907680&count=100')
                .then(response => response.json())
                .then(students => {
                    if (students.error) {
                        alert(students.error);
                        return;
                    }
                    console.log('Mock data fetched from Mockaroo', students);
                    window.localStorage.setItem('mockData', JSON.stringify(students));
                    dispatch(setStudents(students))
                })
                .catch(error => alert(error))
        }
    }
);