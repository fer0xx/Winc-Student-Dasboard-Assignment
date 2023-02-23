import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import {createTheme, ThemeProvider} from "@mui/material/styles";

const columns = [
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'assignment', headerName: 'Assignment', flex: 1},
    {field: 'difficulty', headerName: 'Difficulty', flex: 1},
    {field: 'fun', headerName: 'Fun', flex: 1},
];

const theme = createTheme({
    palette: {
        mode: 'light'
    }
});

const filterData = (data, student) => {
    if (!student) {
        return data;
    }

    return data.filter((record) => record.name === student);
};

const DataTable = ({student}) => {
    const [pageSize, setPageSize] = useState(25);
    const data = useSelector((state) => state.chart.chartData);
    const filteredData = filterData(data, student);


    return (
        <div style={{flexGrow: 1}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    autoHeight
                    density="compact"
                    getRowId={(row) => `${row.name}-${row.assignment}`}
                    rows={filteredData}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </ThemeProvider>
        </div>
    );
};

export default DataTable;
