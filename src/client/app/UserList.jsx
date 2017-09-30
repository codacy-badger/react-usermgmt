import React from 'react';

// @TODO: MAKE 'this.state.users' DYNAMIC PER ACTUAL DATA LIST
// @TODO: CREATE EACH ENTRY DYNAMICALLY BASED ON NUMBER OF USERS IN THE DATASTORE
// @TODO: LET PEOPLE EDIT ALL THE THINGS (create action button w/ material-ui 'popover' menu [edit, remove])

export class UserList extends React.Component {
    constructor() {
        super();
        this.state = { users: 0 };
    }

    render() {
        const { users } = this.state;
        return (
            <div className="user-list container">
                <h2>Current Users</h2>
                <p className="t-heavy">{users} user{users !== 1 ? 's' : ''} found.</p>
                <div className="entries">
                    <div className="entry">
                        <img className="user-icon" alt="User Icon" src="public/images/male-icon.png" />
                        <table className="user-info">
                            <tbody>
                                <tr>
                                    <th colSpan="2">Don Johnson</th>
                                </tr>
                                <tr>
                                    <td>User Id</td>
                                    <td>anon_01</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>112 Salamander Ave, Denver, CO 80203</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>djohnson</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>Male</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* FPO! */}
                    <div className="entry">
                        <img className="user-icon" alt="User Icon" src="public/images/female-icon.png" />
                        <table className="user-info">
                            <tbody>
                                <tr>
                                    <th colSpan="2">Lauren Reynolds</th>
                                </tr>
                                <tr>
                                    <td>User Id</td>
                                    <td>anon_02</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>224 Beech St, Lakewood, CO 80228</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>jdoe</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>Female</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}