import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const UserMgmtAction = require('../actions/UserMgmtAction.js');
const AppStore = require('../stores/AppStore.js');

// @TODO: AUTO-ASSIGN IDs TO NEW USERS
// @TODO: ERROR HANDLING IF 'userData.json' DOESN'T EXIST OR CURRENTLY HAS NO USERS
// @TODO: LET PEOPLE EDIT ALL THE THINGS (create action button w/ material-ui 'popover' menu [edit, remove])

export class UserList extends React.Component {
    constructor() {
        super();
        const { error:e, numUsers:n, userList:l } = AppStore;
        this.state = { dialogOpen: false, loadError: e, numUsers: n, userList: l };
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogClose() {
        this.setState({ dialogOpen: false });
    }

    componentWillMount() {
        const success = () => {
            const { numUsers:n, userList:l } = AppStore;
            this.setState({ numUsers: n, userList: l });
        };
        const failure = () => {
            const { error:e } = AppStore;
            this.setState({ dialogOpen: true, loadError: e });
        };
        UserMgmtAction.grabUsers(success, failure);
    }

    render() {
        const { numUsers:num, userList:users } = this.state;
        const entries = users.map((user, index) => 
            <div className="entry" key={index}>
                <img className="user-icon" alt="User Icon" src={`public/images/${user.gender}-icon.png`} />
                <table className="user-info">
                    <tbody>
                        <tr>
                            <th colSpan="2">{user.firstName} {user.lastName}</th>
                        </tr>
                        <tr>
                            <td>User Id</td>
                            <td>{user.userId}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

        const actions = [
            <FlatButton label="Close" onClick={this.handleDialogClose} primary={true} />
        ];

        return (
            <div className="user-list container">
                <h2>Current Users</h2>
                <p className="t-heavy">{num} user{num !== 1 ? 's' : ''} found</p>
                <div className="entries">
                    {entries}
                </div>
                <Dialog
                    actions={actions}
                    onRequestClose={this.handleDialogClose}
                    open={this.state.dialogOpen}
                    title={`There was an error grabbing the user list data => ${this.state.loadError}`}
                />
            </div>
        );
    }
}