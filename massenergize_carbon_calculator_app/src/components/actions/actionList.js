import React from 'react';
import ActionItems from './actionItems';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const style = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    }
});


const renderList = (actions) => {
    return actions.map(action => {
        return (
            <React.Fragment ><ActionItems action={action} /></React.Fragment>
            // <div>actionItem</div>
        );
    })
}

const actionList = (props) => {
    if (!props.actions) return <CircularProgress />
    return (
        <React.Fragment>{renderList(props.actions)}</React.Fragment>
    );
}

export default actionList;