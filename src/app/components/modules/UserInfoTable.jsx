import React from 'react';

export class UserInfoTable extends React.Component {
    render() {
        const { address, firstName, gender, lastName, userId, username } = this.props.user;
        return (
            <div className="entry">
                <img className="user-icon" alt="User Icon" src={`images/${gender}-icon.png`} />
                <table className="user-info">
                    <tbody>
                        <tr>
                            <th colSpan="2">{firstName} {lastName}</th>
                        </tr>
                        <tr>
                            <td>User Id</td>
                            <td>{userId}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{address}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{username}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{gender.charAt(0).toUpperCase() + gender.slice(1)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}