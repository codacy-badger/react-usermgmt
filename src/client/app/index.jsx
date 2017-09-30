import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { UserList } from './UserList.jsx';
import { AddUser } from './AddUser.jsx';

const path = require('./common/path.js')['path']();

class UserMgmt extends React.Component {
    constructor() {
        super();
        // this.state = { whenWhereView: true, faqView: false };
    }

    render() {
        return (
            <BrowserRouter basename={path}>
                <main className="content">
                    <header className="header">
                        <h1>AnonCorp User Management</h1>
                        <ul className="menu">
                            <li><Link to="/">View All Users</Link></li>
                            <li><Link to="/add">Add New User</Link></li>
                        </ul>
                    </header>
                    <Switch>
                        <Route exact path="/" component={UserList} />
                        <Route path="/add" component={AddUser} />
                    </Switch>
                    <footer className="footer">
                        <p className="t-copyright">Copyright &copy; AnonCorp {new Date().getFullYear()}</p>
                    </footer>
                </main>
            </BrowserRouter>
        );
    }
}

const userMgmtTheme = {
    fontFamily: 'Droid Sans, sans-serif',
    // palette: {
    //     accent1Color: '#fff',
    //     primary1Color: '#007bff'
    // }
};

const App = () => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(userMgmtTheme)}>
            <UserMgmt />
        </MuiThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);