import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  state = {
    nomeUsuario: '',
    loading: false,
  };

  componentDidMount() {
    this.handleChange();
  }

  handleChange = () => {
    this.setState({ loading: true }, async () => {
      const repete = await getUser();
      this.setState({ loading: false, nomeUsuario: repete });
    });
  };

  render() {
    const { nomeUsuario, loading } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { loading ? <Loading /> : `Bem vindo ${nomeUsuario.name}` }
        </p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}
