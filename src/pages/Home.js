import Chart from "../components/Chart/Chart";
import {useEffect} from "react";

import TablePopup from "../components/Chart/TablePopup";

const Home = () => {
    useEffect(() => {
        document.title = "Winc Student Dashboard"
    });

    return (
        <>
            <Chart showStudentFilter/>
            <TablePopup/>
        </>
    );
}

export default Home;