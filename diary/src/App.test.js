import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

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

test('ajouter un message', () => {
  const user = userEvent.setup();
  render(<App />);

  //pouvoir remplir le titre
  const inputTitle = screen.getByTestId('input-title');

  userEvent.type(screen.getByTestId('input-title'), 'Titre du message');
  expect(screen.inputTitle).toHaveValue('Titre du message');

   //event écrire
    const textArea = screen.getByTestId('textarea');

   userEvent.type(screen.textArea, 'Ceci est un message');
   expect(screen.textArea).toHaveValue('Ceci est un message');

  //pouvoir cliquer sur le bouton envoyer/appelle fonction encrypter
  userEvent.click(screen.getByTestId('btn-send'));

  //le message s'ajoute bien à la liste
  const tableRows = screen.getAllByRole('row');
  expect(tableRows.length).toBe(2);

  // checker le message ajouté
  const messageRow = tableRows[1];
  expect(messageRow).toHaveTextContent('Titre du message');
  expect(messageRow).toHaveTextContent('0');
  expect(messageRow.children[2]).toHaveTextContent();

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

