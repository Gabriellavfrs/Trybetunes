import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
// import PropTypes from 'prop-types';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      image: '',
      email: '',
      description: '',

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
      isButtonDisabled: true,
    });
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

  // updateUserInfo = async () => {
  //   const { history } = this.props;
  //   const { name, email, image, description } = this.state;
  //   this.setState({ loading: true });
  //   await updateUser({
  //     name: nameInput,
  //     email: emailInput,
  //     image: imageInput,
  //     description: descriptionInput,
  //   });
  //   this.setState({ loading: false });
  //   history.push('/profile');
  // };

  renderForm = () => {
    const { name, image, email, description, isButtonDisabled } = this.state;
    return (
      <form>
        <img src="" alt="" />
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
        Profile Edit
        { loading ? <Loading /> : this.renderForm() }
      </div>
    );
  }
}

// ProfileEdit.propTypes = {

// };

export default ProfileEdit;
