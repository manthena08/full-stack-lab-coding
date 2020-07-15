import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getBlocksByNodeUrl, getBlockDetailsSelector } from '../actions/blocks';
import Block from '../components/Block';

const Blocks = (props) => {
    const dispatch = useDispatch();
    const blocksData = useSelector(state => getBlockDetailsSelector(state.blocks, props.nodeUrl));

    useEffect(() => {
        dispatch(getBlocksByNodeUrl(props.nodeUrl))
    }, [])

    return (
        <Box width="100%">
            {
                blocksData.loading &&
                <Box>
                    loading...
                </Box>
            }
            {
                !blocksData.loading && !blocksData.success &&
                <Box>
                    Failed to get the data. Please try again.
                </Box>
            }
            {
                blocksData.data.map(item => (
                    <Block key={item.key} block={item} />
                ))
            }
        </Box>
    )
}


Blocks.propTypes = {
    nodeUrl: PropTypes.string.isRequired
};

export default Blocks;