import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nameUser: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({
      loading: true,
    });
    const nameUser = await getUser();
    this.setState({
      loading: false,
      nameUser: nameUser.name,
    });
  };

  render() {
    const { loading, nameUser } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Cabeçalho</h1>
        { loading ? <Loading />
          : <h2 data-testid="header-user-name">{ nameUser }</h2> }
      </header>
    );
  }
}

export default Header;
