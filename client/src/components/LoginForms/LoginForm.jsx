import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { userHasAuthenticated, isAuthenticating, getUser } from '../../store/actions';
import LoaderButton from './LoaderButton';

import './Login.css';

const seedData = {
  logInEmail: '',
  logInPassword: '',
};

const LoginForm = ({
  history, userHasAuthenticated, isAuthenticating, getUser,
}) => {
  const [formValues, setFormValues] = useState(seedData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    event.persist();
    setFormValues(values => ({ ...values, [event.target.id]: event.target.value }));
  };

  const validateLogInForm = () => {
    const { logInEmail, logInPassword } = formValues;
    return logInEmail.length > 0 && logInPassword.length > 0;
  };

  const handleLogInSubmit = async (event) => {
    event.preventDefault();
    const { logInEmail, logInPassword } = formValues;
    isAuthenticating(true);
    setIsLoading(true);

    try {
      await Auth.signIn(logInEmail, logInPassword)
        .then(({ username }) => {
          userHasAuthenticated(true);
          getUser({ cognitoID: username });
        });
    } catch (e) {
      // TODO: Use a modal instead of a alert box
      // eslint-disable-next-line no-alert
      alert(e.message);
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogInSubmit}>
      <Form.Group controlId="logInEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          placeholder="Enter email"
          value={formValues.logInEmail}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="logInPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={formValues.logInPassword}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Link to="/login/reset">Forgot password?</Link>
      </Form.Group>
      <LoaderButton
        block
        variant="primary"
        disabled={!validateLogInForm()}
        type="submit"
        isLoading={isLoading}
        text="Login"
        loadingText="Logging in…"
      />
    </Form>
  );
};

export default withRouter(connect(null, {
  userHasAuthenticated,
  isAuthenticating,
  getUser,
})(LoginForm));
