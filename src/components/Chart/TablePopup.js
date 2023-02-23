import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DataTable from "./DataTable";
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '65%',
    minWidth: 320,
    maxHeight: '90%',
    overflow: 'auto',
    backgroundColor: '#ECEFF1',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TablePopup = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box display="flex" justifyContent="center" sx={{mt: 2}}>
                <Button variant="outlined" onClick={handleOpen}>Open Table Overview</Button>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <DataTable student={props?.student}/>
                </Box>
            </Modal>
        </>
    );
}

export default TablePopup;