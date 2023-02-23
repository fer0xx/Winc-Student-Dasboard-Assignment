import {configureStore} from '@reduxjs/toolkit'
import chartSlice from "../features/chartSlice";

const store = configureStore({
    reducer: {
        chart: chartSlice
    },
});

export default store;