import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { cardImage, collectionName, artistName } = this.props;
    return (
      <div>
        <img src={ cardImage } alt={ collectionName } />
        <h3>{ collectionName }</h3>
        <h4>{ artistName}</h4>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  cardImage: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumCard;
