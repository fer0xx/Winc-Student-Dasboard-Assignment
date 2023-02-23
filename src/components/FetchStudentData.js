import * as React from "react";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchStudents} from "../features/apiMock";
import {setLoading} from "../features/chartSlice";

const FetchStudentData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents());
        dispatch(setLoading(false));
    })
};

export default FetchStudentData;