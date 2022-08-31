import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musica: [],
  };

  componentDidMount() {
    this.musicas();
  }

  musicas = async () => {
    const { match: { params: { id } } } = this.props;
    const song = await getMusics(id);
    this.setState({ musica: song });
  };

  render() {
    const { musica } = this.state;
    return (
      <main data-testid="page-album">
        Album
        <Header />
        {musica.length > 0 && (
          <section>
            <h5 data-testid="artist-name">
              {musica[0].artistName}
            </h5>
            <h6 data-testid="album-name">
              {musica[0].collectionName}
            </h6>
          </section>
        )}
        {
          musica.length > 0 && (
            musica.map((e, i) => (
              i > 0 && (
                <MusicCard
                  trackId={ e.trackId }
                  trackName={ e.trackName }
                  previewUrl={ e.previewUrl }
                />
              )
            ))
          )
        }
      </main>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
