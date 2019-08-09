import React from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './NavBar.scss';

class NavBar extends React.Component {
	constructor() {
		super();

		this.state = {
			anchorEl: null
		};
	}

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	renderDesktop = () => (
		<ul className="desktop-menu">
			<li>
				<NavLink to="/">View All Users</NavLink>
			</li>
			<li>
				<NavLink to="/new-user">New User</NavLink>
			</li>
		</ul>
	);

	renderMobile = () => {
		const { anchorEl } = this.state;

		return (
			<>
				<div className="icon-button-container">
					<IconButton onClick={this.handleClick} color="inherit">
						<MenuIcon />
					</IconButton>
				</div>
				<Menu
					classes={{ paper: 'mobile-menu' }}
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.handleClose} classes={{ root: 'list-item' }}>
						<NavLink to="/">View All Users</NavLink>
					</MenuItem>
					<MenuItem onClick={this.handleClose} classes={{ root: 'list-item' }}>
						<NavLink to="/new-user">New User</NavLink>
					</MenuItem>
				</Menu>
			</>
		);
	};

	render() {
		return (
			<>
				<MediaQuery query="(min-width: 36.251rem)">{this.renderDesktop()}</MediaQuery>
				<MediaQuery query="(max-width: 36.25rem)">{this.renderMobile()}</MediaQuery>
			</>
		);
	}
}

export default NavBar;
