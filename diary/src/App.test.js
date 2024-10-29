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

  userEvent.type(inputTitle, 'Titre du message');
  expect(screen.inputTitle).TextContent('Titre du message');

  //event écrire
  const textArea = screen.getByTestId('textarea');

   userEvent.type(screen.textArea, 'Ceci est un message');
   expect(screen.textArea).TextContent('Ceci est un message');

  //pouvoir cliquer sur le bouton envoyer/appelle fonction encrypter
  userEvent.click(screen.getByTestId('btn-send'));

  //le message s'ajoute bien à la liste
  const tableRows = screen.getAllByRole('row');
  expect(tableRows.length).toBe(2);

  // checker le message ajouté
  /*
  const messageRow = tableRows[1];
  expect(messageRow).toHaveTextContent('Titre du message');
  expect(messageRow).toHaveTextContent('0');
  expect(messageRow.children[2]).toHaveTextContent();
  */
});




test('lire un message', () => {

  //pouvoir decrypter (appelle la fonction decryptText avec le texte en paramètre et la clé secrete 'my-secret-key')
  userEvent.click(screen.getByTestId('btn-decrypt'))
  // Vérifier que le popup est affiché
  expect(screen.getByPlaceholderText('Enter Secret key')).toBeInTheDocument();
  // Cliquer sur Cancel mdp
  userEvent.click(screen.getByTestId('btn-cancel'))
  // Vérifier que le popup est fermé
  expect(screen.queryByPlaceholderText('Enter Secret key')).not.toBeInTheDocument();
  //re-cliquer sur décrypter
  userEvent.click(screen.getByTestId('btn-decrypt'))
  // Vérifier que le popup est re-affiché
  expect(screen.getByPlaceholderText('Enter Secret key')).toBeInTheDocument();
  //pouvoir remplir et valider mdp
  userEvent.type(screen.getByTestId('input-password'), 'my-secret-key');
  userEvent.click(screen.getByTestId('btn-validate'))
  // Vérifier que le popup est re-fermé
  expect(screen.queryByPlaceholderText('Enter Secret key')).not.toBeInTheDocument();
  //vérifier que le message original est présent sur le document
  expect(screen.getByTestId('decrypted-message')).toBeInTheDocument();
});


test('modifier et supprimer un message', () => {

  const editableArea = screen.getByTestId('edit-textarea');
  
  //pouvoir clique sur modifier
  userEvent.click(screen.getByTestId('btn-edit'))
  //vérifier que le popup decryt est affiché
  expect(screen.getByPlaceholderText('Enter Secret key')).toBeInTheDocument();
  //vérifier que le popup est fermé
  expect(screen.queryByPlaceholderText('Enter Secret key')).not.toBeInTheDocument();

  //pouvoir modifier le message
  userEvent.type(screen.editableArea, '!!');
    //pouvoir valider la modif
  userEvent.click(screen.getByTestId('btn-validate-edit'))
    //vérifier que le message a bien été modifié
  expect(screen.textArea).toHaveValue('Ceci est un message!!');

  //pouvoir  supprimer
  userEvent.click(screen.getByTestId('btn-delete'))
  messageRows = screen.getAllByRole('row');
  expect(messageRows.length).toBe(1); 

});

  //  expect(screen.getByTestId('btn-cancel')).toBeNull()
