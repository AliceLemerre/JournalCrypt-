import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('présence éléments', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  //If elements exists
  const TitreH1 = screen.getByText('Nouveau message');
  const textarea = screen.getByTestId('textarea');
  const buttonSendMessage = screen.getByTestId('buttonSendMessage');

  expect(TitreH1).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(buttonSendMessage).toBeInTheDocument();

//lib userevent pour les actions
//action : remplir textarea
//action : remplie titre
//cliquer sur le bouton :appelle la fonction encryptText
//vérifier que le message affiche ce qu'on a rempli
//est-ce qu'un élément contient le titre
//est-ce qu'un élément contient le message crypté
//est-ce qu'un élément contient l'id
//est-ce que encrypt est appelée pour le texte et ?
});

test('test1', () => {
  render(<App />);

  //event écrire
  userEvent.type(screen.getByTestId('textarea'), 'Ceci est un message')
  expect(screen.getByTestId('textarea')).toHaveValue('Ceci est un message')
});
