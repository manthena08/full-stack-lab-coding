import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
       backgroundColor: '#e0e0e0',
       padding: theme.spacing(1),
       marginBottom: theme.spacing(1)
    },
    orderColor: {
        color: '#8a9aee'
    }

}));
const Block = (props) => {
    const classes = useStyles();
    const getBlockOrders = (order) => {
        if(order > 99){
            return order;
        }else if (order > 9){
            return String(order).padStart(3, '0')
        }else{
            return String(order).padStart(3, '00')
        }
    }
    return (
        <Box className={classes.root}>
            <Typography className={classes.orderColor}>{getBlockOrders(props.block.attributes.index)}</Typography>
            <Typography>{props.block.attributes.data}</Typography>

        </Box>
    )
}

Block.propTypes = {
    block: PropTypes.object.isRequired
};

export default Block;