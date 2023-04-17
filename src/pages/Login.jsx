import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      nameUser: '',
    };
  }

  verifyTextLenght = ({ target }) => {
    const MIN_LENGHT = 3;
    const { value } = target;
    if (value.length >= MIN_LENGHT) {
      this.setState({
        disabled: false,
        nameUser: value,
        loading: false,
      });
    }
  };

  handleClickLogin = async () => {
    const { nameUser } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: nameUser });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  render() {
    const { disabled, loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <div data-testid="page-login">
            <input
              data-testid="login-name-input"
              type="text"
              name=""
              placeholder="Qual é o seu nome?"
              onChange={ this.verifyTextLenght }
            />
            <button
              data-testid="login-submit-button"
              disabled={ disabled }
              onClick={ this.handleClickLogin }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
