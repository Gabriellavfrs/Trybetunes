import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      disabled: true,
      inputValue: '',
      result: [],
      searched: false,
    };
  }

  handleTypeInput = ({ target }) => {
    const MIN_LENGHT = 2;
    const { value } = target;
    if (value.length >= MIN_LENGHT) {
      this.setState({
        disabled: false,
        inputValue: value,
      });
    }
  };

  handleClickSearch = async (param) => {
    this.setState({
      loading: true,
    });
    const resultSearch = await searchAlbumsAPI(param);
    this.setState({
      loading: false,
      result: resultSearch,
      searched: true,
    });
  };

  render() {
    const { loading, disabled, inputValue, result, searched } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <input
              type="text"
              placeholder="Digite o nome do artista ou da banda..."
              data-testid="search-artist-input"
              onChange={ this.handleTypeInput }
              // value={ inputValue }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ disabled }
              onClick={ () => this.handleClickSearch(inputValue) }
            >
              Pesquisar
            </button>
          </form>
        )}

        { searched && result.length === 0
          && <span>Nenhum álbum foi encontrado</span>}
        { searched && result.length !== 0 && (
          <h2>
            {`O resultado de álbuns de: ${inputValue}`}
          </h2>

        )}
        { result.map(({ collectionId, artworkUrl100, artistName, collectionName }) => (
          <div key={ collectionId }>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <AlbumCard
                cardImage={ artworkUrl100 }
                collectionName={ collectionName }
                artistName={ artistName }
              />
            </Link>
          </div>))}
        <section />
      </div>
    );
  }
}

// Search.propTypes = {

// };

export default Search;
