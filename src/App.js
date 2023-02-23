import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Container} from "@mui/material";
import {useSelector} from "react-redux";
import FetchStudentData from "./components/FetchStudentData";
import * as React from "react";
import Loading from "./components/Loading";
import TopMenu from "./components/TopMenu";
import {useMemo} from "react";

function App() {
    const loading = useSelector(state => state.chart.loading);
    const mode = useSelector(state => state.chart.mode);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode
                }
            }),
        [mode]
    );

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <FetchStudentData/>
                <Container maxWidth="lg" sx={{my: 4, minWidth: 320}}>
                    {
                        loading ?
                            <Loading/> :
                            <>
                                <TopMenu/>
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/:studentFirstName" element={<Student/>}/>
                                </Routes>
                            </>
                    }
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
