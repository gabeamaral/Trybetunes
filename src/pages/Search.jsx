import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
// import Loading from './Loading';

class Search extends React.Component {
  state = {
    nomeArtista: '',
    album: [],
    // loading: false,
    nomeAlbum: '',
  };

  handleClick = () => {
    const { nomeArtista } = this.state;
    this.setState({ nomeArtista: '' }, async () => {
      const album = await searchAlbumsAPI(nomeArtista);
      this.setState({
        nomeAlbum: nomeArtista,
        album,
        nomeArtista: '',
        // loading: false,
      });
    });
  };

  render() {
    const { nomeArtista, album, nomeAlbum } = this.state;
    const MIN_LENGTH = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            value={ nomeArtista }
            onChange={ ({ target }) => this.setState({
              nomeArtista: target.value,
            }) }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ nomeArtista.length < MIN_LENGTH }
          >
            Pesquisar
          </button>
          {!album.length ? 'Nenhum álbum foi encontrado' : (
            <div>
              <h3>{`Resultado de álbuns de: ${nomeAlbum}`}</h3>
              {album.map(({
                artistName,
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h2>{ artistName }</h2>
                  <p>{ collectionPrice }</p>
                  <p>{ trackCount }</p>
                  <p>{ releaseDate }</p>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    { collectionName }
                  </Link>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
