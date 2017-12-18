import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { UserInfoTable } from './modules/UserInfoTable.jsx';

const UserMgmtAction = require('../actions/UserMgmtAction.js');
const AppStore = require('../stores/AppStore.js');

// @TODO: MOVE DIALOG TO INDEX.JSX AND USE THAT FOR GLOBAL ERROR MESSAGING
// @TODO: AUTO-ASSIGN IDs TO NEW USERS
// @TODO: ERROR HANDLING IF 'userData.json' DOESN'T EXIST OR CURRENTLY HAS NO USERS
// @TODO: LET PEOPLE EDIT ALL THE THINGS (create action button w/ material-ui 'popover' menu [edit, remove])

export class UserList extends React.Component {
    constructor() {
        super();
        this.state = { dialogOpen: false, error: null, numUsers: 0, userList: [] };
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogClose() {
        this.setState({ dialogOpen: false });
    }

    componentWillMount() {
        const failure = () => {
            const { error:e } = AppStore;
            this.setState({ dialogOpen: true, error: e });
        };
        const changeHandler = () => {
            const { error:e, numUsers:n, userList:l } = AppStore;
            this.setState({ dialogOpen: false, error: e, numUsers: n, userList: l });
        };
        AppStore.on('change', changeHandler);
        UserMgmtAction.getUsers(failure);
    }

    render() {
        const { numUsers:num, userList:users } = this.state;
        const entries = users.map((user, index) => <UserInfoTable key={index} user={user} />);
        const actions = [
            <FlatButton label="Close" onClick={this.handleDialogClose} primary={true} />
        ];
        return (
            <div className="user-list container">
                <h2>Current Users</h2>
                <p className="t-heavy">{num} user{num !== 1 ? 's' : ''} found</p>
                <div className="entries">{entries}</div>
                <Dialog
                    actions={actions}
                    onRequestClose={this.handleDialogClose}
                    open={this.state.dialogOpen}
                    title="Whoops..."
                >
                    There was an error grabbing the user list data.
                </Dialog>
            </div>
        );
    }
}