import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    nomeArtista: '',
    // botao: false,
  };

  render() {
    const { nomeArtista } = this.state;
    const MIN_LENGTH = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ ({ target }) => this.setState({ nomeArtista: target.value }) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ nomeArtista.length < MIN_LENGTH }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
