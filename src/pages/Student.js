import * as React from "react";
import {Link, useParams} from 'react-router-dom';
import Chart from "../components/Chart/Chart";
import {Avatar, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {Cake, Email, Phone} from "@mui/icons-material";
import moment from "moment/moment";
import {useEffect} from "react";
import TablePopup from "../components/Chart/TablePopup";

const Student = () => {
    const {studentFirstName} = useParams();

    const studentData = useSelector(store => store.chart.students)
        .find(student => student.first_name === studentFirstName);

    useEffect(() => {
        document.title = studentFirstName + " - Winc Student Dashboard"
    });

    return (
        <>
            <Grid container spacing={2} sx={{mb: 4}}>
                <Grid item md={4} sm={12} xs={12}>
                    <Paper sx={{p: 3, mr: {md: 2}}}>
                        <Grid
                            justify="space-between"
                            container
                            spacing={4}
                            alignItems="center"
                        >
                            <Grid item flexGrow={1}>
                                <h3>
                                    {studentData.first_name + " " + studentData.last_name}
                                </h3>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    alt={studentData.first_name + " " + studentData.last_name}
                                    src={studentData.photo}
                                    sx={{backgroundColor: '#5c85be', width: 60, height: 60}}
                                />
                            </Grid>
                        </Grid>
                        <Divider sx={{my: 3}}/>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Phone/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Phone"
                                    secondary={studentData.phone_number}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Email/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Email"
                                    secondary={studentData.email}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Cake/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Date of birth"
                                    secondary={
                                        studentData.date_of_birth +
                                        " (age: " + moment().diff(studentData.date_of_birth, "years") + ")"
                                    }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                    <Button
                        variant="outlined"
                        component={Link}
                        to="/"
                        sx={{mt: 3}}
                    >
                        Back to home page
                    </Button>
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                    <Chart student={studentFirstName}/>
                    <TablePopup student={studentFirstName}/>
                </Grid>
            </Grid>
        </>
    );
}

export default Student;