import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import { MyProvider } from './context/MyContext';
import CryptoJS from 'crypto-js';

test('présence éléments', () => {
  render(<App />);

  //If elements exists
  const TitreH1 = screen.getByTestId('input-title');
  const textarea = screen.getByTestId('textarea');
  const buttonSendMessage = screen.getByTestId('btn-send');

  expect(TitreH1).toBeInTheDocument();
  expect(textarea).toBeInTheDocument();
  expect(buttonSendMessage).toBeInTheDocument();
//est-ce qu'un élément contient le titre
//est-ce qu'un élément contient le message crypté
//est-ce qu'un élément contient l'id
//est-ce que encrypt est appelée pour le texte et ?
});

//USER ACTIONS

test('ajouter un message', async () => {
  // const user = userEvent.setup();
  render(<App />)

  //pouvoir remplir le titre
  const inputTitle = screen.getByTestId('input-title');
  userEvent.type(screen.getByTestId('input-title'), 'Titre du message');
  expect(inputTitle).toHaveValue('Titre du message');

   //event écrire
    const textArea = screen.getByTestId('textarea');
   userEvent.type(textArea, 'Ceci est un message');
   expect(textArea).toHaveValue('Ceci est un message');

  //pouvoir cliquer sur le bouton envoyer/appelle fonction encrypter
  userEvent.click(screen.getByTestId('btn-send'));
  //RAF voir si la fonction encrypt a été appelée
  
  //le titre s'ajoute bien à la liste
  const newMessageTitle = await screen.findByText('Titre du message');
  expect(newMessageTitle).toBeInTheDocument();

  const tbody = screen.getByTestId('tbody');
  // eslint-disable-next-line testing-library/no-node-access
  expect(tbody.querySelectorAll('tr').length).toBe(1);
});


/*

test('lire un message', () => {

  //pouvoir decrypter (appelle la fonction decryptText)
  userEvent.click(screen.getByTestId('btn-decrypt'))

  //pouvoir cancel mdp
  userEvent.click(screen.getByTestId('btn-cancel'))
  expect(screen.getByTestId('btn-cancel')).toBeNull()

  //pouvoir valider mdp
  userEvent.click(screen.getByTestId('btn-validate'))
  

  //pouvoir modifier et valider la modif
  userEvent.click(screen.getByTestId('btn-edit'))


  //pouvoir  supprimer
  userEvent.click(screen.getByTestId('btn-delete'))



  

});
*/

