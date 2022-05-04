import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Explore from '../pages/Explore';

const SEARCH_TOP_BTN_TESTID = 'search-top-btn';

describe('Testa explore', () => {
  it('Contém o header com o texto Recipes App', () => {
    renderWithRouter(<Explore />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');

    expect(profileTopBtn).toBeInTheDocument();

    const title = screen.getByTestId('page-title');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explore');
  });

  it('O botão search não deve estar na tela', () => {
    renderWithRouter(<Explore />);

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN_TESTID);
    expect(searchTopBtn).not.toBeInTheDocument();
  });
});
