import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      image: '',
      email: '',
      description: '',
      isButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
      image: user.image,
      email: user.email,
      description: user.description,
    }, this.validateInputs);
    // console.log(this.state.user);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInputs);
  };

  validateInputs = () => {
    const {
      name,
      image,
      email,
      description,
    } = this.state;

    const validateIsNotEmpty = !!name && !!image
      && !!email && !!description;
    console.log(validateIsNotEmpty);

    if (validateIsNotEmpty) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  updateUserInfo = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ loading: false });
    history.push('/profile');
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  renderForm = () => {
    const { name, image, email, description, isButtonDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <img src={ image } alt={ name } />
        <input
          type="text"
          name="image"
          data-testid="edit-input-image"
          value={ image }
          onChange={ this.handleChange }
        />
        <label>
          Nome
          <input
            type="text"
            name="name"
            data-testid="edit-input-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            data-testid="edit-input-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Descrição
          <input
            type="text"
            name="description"
            data-testid="edit-input-description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ isButtonDisabled }
          onClick={ this.updateUserInfo }
        >
          Salvar
        </button>
      </form>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Profile edit</h1>
        { loading ? <Loading /> : this.renderForm() }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
