import React from 'react';

import {
    Typography, Paper
} from '@material-ui/core';

const PaperRent = ({ data, props }) => {
    const selected = props.find(car => car.platNum == data);
    return (
        <Paper elevation={2}>
            <Typography>
                {selected.platNum} - {selected.year} - {selected.passengerNum} passengers - $ {selected.price}
            </Typography>
        </Paper>
    );
}
export default PaperRent;