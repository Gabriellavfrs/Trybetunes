import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsFillHeartFill } from 'react-icons/bs';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorited: false,
    };
  }

  async componentDidMount() {
    const { song } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorited: favoriteSongs.some(({ trackId }) => trackId === song.trackId),
    });
  }

  handleFavoriteSong = async (music) => {
    const { favorited } = this.state;
    this.setState({
      loading: true,
    });
    if (favorited) {
      this.setState({ favorited: false });
      await removeSong(music);
    } else {
      await addSong(music);
      this.setState({ favorited: true });
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, song } = this.props;
    const { loading, favorited } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <div>
            <h3>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ () => this.handleFavoriteSong(song) }
                checked={ favorited }
              />
              <BsFillHeartFill />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
