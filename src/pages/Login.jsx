import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nome: '',
    botao: false,
    loading: false,
  };

  handleChange = () => {
    this.setState({ botao: true });
    const { nome } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: nome });
      this.setState({ loading: false });
    });
  };

  render() {
    const { nome, botao, loading } = this.state;
    const MIN_LENGTH = 3;
    return (
      <div data-testid="page-login">
        Login
        <form>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            data-testid="login-name-input"
            onChange={ ({ target }) => this.setState({ nome: target.value }) }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleChange }
            disabled={ nome.length < MIN_LENGTH }
          >
            Entrar
          </button>
        </form>
        {
          loading === true && (
            <Loading />
          )
        }
        {
          (!loading && botao) && (<Redirect to="/search" />)
        }
      </div>
    );
  }
}

export default Login;
