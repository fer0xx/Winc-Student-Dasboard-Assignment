import React from "react";
import {
    alpha, Box, Checkbox,
    FormControl, FormControlLabel, FormGroup, Grid,
    InputLabel, ListItemText,
    MenuItem,
    Select,
    styled, Switch,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import {useDispatch, useSelector} from "react-redux";
import {
    setChartContentType,
    setChartType,
    setSortType,
    setStudentFilter
} from "../../features/chartSlice";

const getStyledSwitch = (theme, color) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: color,
        '&:hover': {
            backgroundColor: alpha(color, theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: color,
    },
});

const DifficultySwitch = styled(Switch)(({theme}) => {
    return getStyledSwitch(theme, '#4f8bc9');
});

const FunSwitch = styled(Switch)(({theme}) => {
    return getStyledSwitch(theme, '#ffb212');
});

const Filters = (props) => {
    // State
    const {
        students,
        chartType,
        chartContentTypes,
        sortType,
        studentFilter,
    } = useSelector(state => state.chart);
    const dispatch = useDispatch();

    // State handlers
    const handleChartTypeChange = (_, newChartType) => {
        if (!newChartType) {
            return;
        }
        dispatch(setChartType(newChartType));
    };
    const handleChartContentTypesChange = ({target: {name, checked}}) => {
        dispatch(setChartContentType({name, checked}));
    };
    const handleSortTypeChange = ({target: {value}}) => {
        dispatch(setSortType(value));
    };
    const handleStudentFilterChange = ({target: {value}}) => {
        dispatch(setStudentFilter(value));
    };

    const chartTypeSelection =
        <div style={{display: "flex", alignItems: "center"}}>
            <Box sx={{mr: 1, display: {xs: "none", sm: "block"}}}>Chart type:</Box>
            <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={handleChartTypeChange}
                aria-label="Platform"
            >
                <ToggleButton value="bar">
                    <BarChartIcon/>
                </ToggleButton>
                <ToggleButton value="line">
                    <SsidChartIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>;

    const chartContentSwitches =
        <FormGroup
            style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}
            sx={{mt: 1}}
        >
            <FormControlLabel
                control={
                    <DifficultySwitch
                        name="difficulty"
                        onChange={handleChartContentTypesChange}
                        checked={chartContentTypes.difficulty}
                    />
                }
                label="Difficulty"
            />
            <FormControlLabel
                control={
                    <FunSwitch
                        name="fun"
                        onChange={handleChartContentTypesChange}
                        checked={chartContentTypes.fun}
                    />
                }
                label="Fun"
            />
        </FormGroup>;

    const chartSortTypeSelection = <>
        <FormControl fullWidth>
            <InputLabel id="chart-sort-type-selection">Sort by</InputLabel>
            <Select
                labelId="chart-sort-type-selection"
                label="Sort by"
                id="chart-sort-type"
                value={sortType}
                onChange={handleSortTypeChange}
            >
                <MenuItem value="assignment-asc">Assignment (A-Z)</MenuItem>
                <MenuItem value="assignment-desc">Assignment (Z-A)</MenuItem>
                <MenuItem value="difficulty-asc">Difficulty (1-5)</MenuItem>
                <MenuItem value="difficulty-desc">Difficulty (5-1)</MenuItem>
                <MenuItem value="fun-asc">Fun (1-5)</MenuItem>
                <MenuItem value="fun-desc">Fun (5-1)</MenuItem>
            </Select>
        </FormControl>
    </>;

    let chartStudentSelection;
    if (props.showStudentFilter) {
        chartStudentSelection = <FormControl fullWidth>
            <InputLabel id="chart-student-selection">Filter by student</InputLabel>
            <Select
                labelId="chart-student-selection"
                label="Filter by student"
                id="chart-students"
                multiple
                displayEmpty
                value={studentFilter}
                onChange={handleStudentFilterChange}
                renderValue={(selected) => {
                    return selected.join(', ');
                }}
            >
                {
                    students.map((student) => (
                        <MenuItem key={student.first_name} value={student.first_name}>
                            <Checkbox checked={studentFilter.indexOf(student.first_name) > -1}/>
                            <ListItemText primary={student.first_name}/>
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    }

    const xsGridSize = 12;
    const smGridSize = 6;
    const mdGridSize = props.showStudentFilter ? 3 : 4;

    return (
        <>
            <Grid container spacing={{sm: 5, xs: 2}} sx={{mb: 2}}>
                <Grid item xs="auto" sm={smGridSize} md={mdGridSize}>
                    {chartTypeSelection}
                </Grid>
                <Grid item xs="auto" sm={smGridSize} md={mdGridSize}>
                    {chartContentSwitches}
                </Grid>
                <Grid item xs={xsGridSize} sm={props.showStudentFilter ? smGridSize : 12} md={mdGridSize}>
                    {chartSortTypeSelection}
                </Grid>
                {
                    props.showStudentFilter &&
                    <Grid item xs={xsGridSize} sm={smGridSize} md={mdGridSize}>
                        {chartStudentSelection}
                    </Grid>
                }
            </Grid>
        </>
    );
}

export default Filters;