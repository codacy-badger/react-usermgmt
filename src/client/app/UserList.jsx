import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const axios = require('axios');
const path = require('./common/path.js')['path']();

// @TODO: MAKE 'this.state.users' DYNAMIC PER ACTUAL DATA LIST
// @TODO: CREATE EACH ENTRY DYNAMICALLY BASED ON NUMBER OF USERS IN THE DATASTORE
// @TODO: AUTO-ASSIGN IDs TO NEW USERS
// @TODO: LET PEOPLE EDIT ALL THE THINGS (create action button w/ material-ui 'popover' menu [edit, remove])

export class UserList extends React.Component {
    constructor() {
        super();
        this.state = { dialogOpen: false, loadError: '', numUsers: 0, userList: [] };
        this.getUserData = this.getUserData.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    getUserData() {
        return axios.get(`${path}data/userData.json`);
    }

    // updateUserData() {

    // }

    handleDialogClose() {
        this.setState({ dialogOpen: false });
    }

    componentWillMount() {
        const handleError = err => {
            this.setState({ dialogOpen: true, loadError: err });
        };
        return this.getUserData().then(resp => this.setState({ numUsers: resp.data.users.length, userList: resp.data.users })).catch(err => handleError(err));
    }

    render() {
        const { numUsers:num, userList:users } = this.state;
        const entries = users.map((user, index) => 
            <div className="entry">
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