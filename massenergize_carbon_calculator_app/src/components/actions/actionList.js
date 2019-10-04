import React from 'react';
import ActionItems from './actionItems';

const renderList = (actions) => {
    return actions.map(action => {
        return (
            <div key={action}><ActionItems action_tag={action} /></div>
        );
    })
}

const actionList = (props) => {
    return (
        <div>{renderList(props.actions)}</div>
    );
}

export default actionList;