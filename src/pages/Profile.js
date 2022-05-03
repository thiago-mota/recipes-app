import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const emailUser = localStorage.getItem('user'); // o emailUser vai pegar a chave user com a info: email:... . Em seguida é feita a desestruturação dessa chave e o JSON.parse pega a string e transforma em um objeto JS para que a chave email seja acessada e retorne apenas o seu valor.
  const { email } = JSON.parse(emailUser); // estrutura retornada sem o JSON.parse: {"email":"alline_franciely@hotmail.com"}

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{ email }</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
