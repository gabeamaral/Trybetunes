import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    musicaFav: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      musicaFav: await getFavoriteSongs(),
    });
  }

  favoritas = () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      const { musicaFav } = this.state;
      this.setState({
        musicaFav: [...musicaFav, this.props],
        loading: false,
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { musicaFav, loading } = this.state;
    const musicasFavoritas = musicaFav.some((song) => trackId === song.trackId);

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="checkBox">
          Curtir
          <input
            id="checkBox"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favoritas }
            checked={ musicasFavoritas }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
