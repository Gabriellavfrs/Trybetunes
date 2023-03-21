import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
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
    console.log(user);
    this.setState({
      loading: false,
      user,
    });
  };

  renderUser = () => {
    const { user } = this.state;
    const { name, image, email, description } = user;
    return (
      <div>
        <section>
          <img src={ image } alt={ name } data-testid="profile-image" />
          <Link to="/profile/edit">Editar perfil</Link>
        </section>
        <section>
          <h4>Nome</h4>
          <p>{ name }</p>
          <h4>E-mail</h4>
          <p>{ email }</p>
          <h4>Descrição</h4>
          <p>{ description }</p>
        </section>
      </div>
    );
  };

  // handleClick = () => {
  //   const { history } = this.props;
  //   history.push('/profile/edit');
  // };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : this.renderUser() }
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
