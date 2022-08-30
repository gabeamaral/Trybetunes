import React from 'react';
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
      <div data-testid="header-component">
        {loading
          ? (
            <Loading />
          ) : (
            <p data-testid="header-user-name">
              Bem vindo
              { nomeUsuario.name }
            </p>
          )}
      </div>
    );
  }
}
