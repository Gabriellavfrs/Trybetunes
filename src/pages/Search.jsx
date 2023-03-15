import React, { Component } from 'react';
import Header from '../components/Header';
// import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };
  }

  verifyTextLenght = ({ target }) => {
    const MIN_LENGHT = 2;
    const { value } = target;
    if (value.length >= MIN_LENGHT) {
      this.setState({
        disabled: false,
      });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Digite sua pesquisa"
            data-testid="search-artist-input"
            onChange={ this.verifyTextLenght }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

// Search.propTypes = {

// };

export default Search;
