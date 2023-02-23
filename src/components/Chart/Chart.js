import React from "react";
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTooltip,
    VictoryLine,
    VictoryGroup,
    VictoryContainer, VictoryLegend
} from "victory";
import Theme from "./Theme";
import {
    Alert, Paper,
} from "@mui/material";
import {useSelector} from "react-redux"
import Filters from "./Filters";

const calculateAssignmentAverage = (data, assignment, students, type) => {
    const assignmentData = data.filter(item =>
        (students.length === 0 || students?.includes(item.name)) && item.assignment === assignment
    );

    return assignmentData.length ? assignmentData.reduce((total, item) => item[type] + total, 0)
        / assignmentData.length : 0;
};

const Chart = (props) => {
    // State
    const {
        chartData,
        chartType,
        chartContentTypes,
        sortType,
        studentFilter,
    } = useSelector(state => state.chart);

    let assignments = [...new Set(chartData.map(item => item.assignment))];

    // Build/filter chart data
    const students = props.showStudentFilter ? studentFilter : [props?.student];
    const viewChartData = assignments.map(assignment => {
        const calculateAverage = (property) => calculateAssignmentAverage(chartData, assignment, students, property);
        const [difficulty, fun] = ['difficulty', 'fun'].map(calculateAverage);

        return {
            assignment: assignment.split(' ')[0],
            difficulty,
            fun,
            label: `${assignment}
            Difficulty: ${difficulty}
            Fun: ${fun}`
        };
    });

    // Sort chart data
    const [sortTypeKey, sortTypeOrder] = sortType.split('-');
    viewChartData.sort((a, b) => {
        const aValue = a[sortTypeKey];
        const bValue = b[sortTypeKey];
        if (sortTypeKey === 'assignment') {
            return aValue.localeCompare(bValue);
        }

        return aValue - bValue;
    });
    if (sortTypeOrder === 'desc') {
        viewChartData.reverse();
    }

    // Render the chart types
    let chartContent, chartError;
    if (Object.values(chartContentTypes).filter(Boolean).length > 0) {
        switch (chartType) {
            case 'bar':
                chartContent = <VictoryGroup offset={10}>
                    {
                        chartContentTypes.difficulty &&
                        <VictoryBar
                            labelComponent={<VictoryTooltip/>}
                            data={viewChartData}
                            style={{data: {fill: "#4f8bc9"}}}
                            x="assignment"
                            y="difficulty"
                        />
                    }
                    {
                        chartContentTypes.fun &&
                        <VictoryBar
                            labelComponent={<VictoryTooltip/>}
                            data={viewChartData}
                            style={{data: {fill: "#ffb212"}}}
                            x="assignment"
                            y="fun"
                        />
                    }
                </VictoryGroup>;
                break;
            case 'line':
                chartContent = <VictoryGroup>
                    {
                        chartContentTypes.difficulty &&
                        <VictoryLine
                            labelComponent={<VictoryTooltip/>}
                            data={viewChartData}
                            style={{data: {stroke: "#4f8bc9"}}}
                            x="assignment"
                            y="difficulty"
                        />
                    }
                    {
                        chartContentTypes.fun &&
                        <VictoryLine
                            labelComponent={<VictoryTooltip/>}
                            data={viewChartData}
                            style={{data: {stroke: "#ffb212"}}}
                            x="assignment"
                            y="fun"
                        />
                    }
                </VictoryGroup>;
                break;
            default:
                chartError = <Alert severity="error">Invalid chart type: {chartType}</Alert>;
                break;
        }
    } else {
        chartError = <Alert severity="warning">No chart content types selected.</Alert>
    }
    return (
        <>
            <Filters {...props}/>
            {chartContent ? (
                <Paper
                    elevation={1}
                    style={{backgroundColor: "#FFFFFF", overflow: "auto", padding: 10}}
                >
                    <VictoryChart
                        domainPadding={20}
                        theme={Theme}
                        width={1800}
                        containerComponent={<VictoryContainer responsive={false}/>}
                    >
                        {chartContent}
                        <VictoryAxis
                            tickFormat={viewChartData.map(
                                item => item.assignment
                            )}
                            style={{tickLabels: {angle: -90}}}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickValues={[1, 2, 3, 4, 5]}
                        />
                        <VictoryLegend
                            centerTitle
                            gutter={20}
                            x={60}
                            y={40}
                            style={{border: {stroke: "black"}, title: {fontSize: 15}}}
                            data={
                                [
                                    {
                                        name: 'Difficulty'
                                    },
                                    {
                                        name: 'Fun'
                                    }
                                ]
                            }
                        />
                    </VictoryChart>
                </Paper>
            ) : chartError}
        </>
    );
}

export default Chart;