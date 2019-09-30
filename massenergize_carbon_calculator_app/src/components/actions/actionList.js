import React from 'react';
import { connect } from 'react-redux';
import { fetchActions } from '../../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import ActionItems from './actionItems';

class actionList extends React.Component {
    componentDidMount() {
        this.props.fetchActions();
    }

    renderList() {
        let actions = Object.values(this.props.actions);
        return actions.map(action => {
            return (
                <ActionItems action={action} key={action.name} />
            );
        })
    }


    render() {
        if (this.props.actions === null || (Object.entries(this.props.actions).length === 0 && this.props.actions.constructor === Object)) {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        }
        return (
            <div>{this.renderList()}</div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        actions: state.actions
    }
}
export default connect(mapStateToProps, { fetchActions })(actionList);