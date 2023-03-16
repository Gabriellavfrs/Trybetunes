import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      artImage: '',
      songsList: [],
    };
  }

  componentDidMount() {
    this.getMusicsList();
  }

  getMusicsList = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicListArray = await getMusics(id);
    this.setState({
      artistName: musicListArray[0].artistName,
      collectionName: musicListArray[0].collectionName,
      artImage: musicListArray[0].artworkUrl100,
      songsList: musicListArray.filter(({ kind }) => kind),
    });
    // console.log(musicListArray);
    // console.log(this.state.songsList);
  };

  render() {
    const { artistName, collectionName, artImage, songsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img src={ artImage } alt={ collectionName } />
          <h2 data-testid="album-name">{ collectionName }</h2>
          <h4 data-testid="artist-name">{ artistName }</h4>
        </section>
        <section>
          {songsList.map(({ trackId, trackName, previewUrl }) => (<MusicCard
            key={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
          />))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
