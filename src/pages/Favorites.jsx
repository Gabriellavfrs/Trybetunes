import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import PropTypes from 'prop-types';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritedSongs: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritedSongs: favoriteSongs,
    });
  }

  // componentDidUpdate(__, prevState) {
  //   console.log(prevState);
  // }

  renderFavoriteSongs = () => {
    const { favoritedSongs } = this.state;
    console.log(favoritedSongs);
    return (
      <section>
        { favoritedSongs.map((favoritedSong) => (<MusicCard
          key={ favoritedSong.trackId }
          song={ favoritedSong }
        />))}
      </section>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        { loading ? <Loading /> : this.renderFavoriteSongs() }
      </div>
    );
  }
}

// Favorites.propTypes = {

// };

export default Favorites;
