import React, { Component } from 'react';
import {
  Navbar, Nav, NavDropdown, Image,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { userHasAuthenticated } from '../store/actions';
import './Header.css';

import Logo from '../images/hmgLogo.png';

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  isAuthenticating: state.isAuthenticating,
  firstName: state.user.firstName,
});

const mapDispatchToProps = dispatch => ({
  userAuthenticated: auth => dispatch(userHasAuthenticated(auth)),
});

const textColor = {
  color: '#ffc107',
  fontWeight: '600',
  fontSize: '1.25rem',
  textDecoration: 'none',
};

const imagePadding = {
  marginRight: '5px',
};

class Header extends Component {
  handleLogout = (event) => {
    this.props.userAuthenticated(false);
    this.props.history.push('/');
  }

  loading = () => (
    <span style={textColor}>Logging in ...</span>
  )

  userState = () => (this.props.isAuthenticated
    ? (
      <NavDropdown
        style={textColor}
        title={`Hello ${this.props.firstName}`}
        id="basic-nav-dropdown"
        className="justify-content-right"
      >
        <LinkContainer style={textColor} to="/account">
          <NavDropdown.Item>User Details</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <NavDropdown.Item style={textColor} onClick={this.handleLogout}>Log Out</NavDropdown.Item>
      </NavDropdown>
    ) : (
      <LinkContainer className="justify-content-right" style={textColor} to="/login">
        <Nav.Link>Sign In/Sign Up</Nav.Link>
      </LinkContainer>
    ));

  render() {
    return (
      <Navbar
        fixed="top"
        style={{ position: 'relative', backgroundImage: 'linear-gradient(#01004d 85%, #01004d96)' }}
        expand="md"
        collapseOnSelect="true"
      >
        <Navbar.Brand>
          <Link className="mr-auto" style={textColor} to="/">
            <Image src={Logo} style={imagePadding} alt="Half Monster Games" width="50" height="50" />
            Half Monster Games
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="custom-toggler" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="justify-content-center m-auto"
            defaultActiveKey="#home"
          >
            <LinkContainer style={textColor} to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer style={textColor} to="/lore">
              <Nav.Link>Lore</Nav.Link>
            </LinkContainer>
            <LinkContainer style={textColor} to="/gamerules">
              <Nav.Link>Game Rules</Nav.Link>
            </LinkContainer>
            <LinkContainer style={textColor} to="/factions">
              <Nav.Link>Factions</Nav.Link>
            </LinkContainer>
            <LinkContainer style={textColor} to="/bestiary">
              <Nav.Link>Bestiary</Nav.Link>
            </LinkContainer>
          </Nav>
          {this.props.isAuthenticating ? this.loading() : this.userState()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
