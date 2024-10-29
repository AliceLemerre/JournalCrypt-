import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

describe('App Component Tests', () => {
  test('présence éléments', () => {
    render(<App />);
    
    expect(screen.getByText('Journal Intime')).toBeInTheDocument();
    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getByTestId('btn-send')).toBeInTheDocument();
  });

  test('ajouter un message', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Remplir le titre
    const inputTitle = screen.getByTestId('input-title');
    await user.type(inputTitle, 'Titre du message');
    expect(inputTitle).toHaveValue('Titre du message');

    // Remplir le message
    const textarea = screen.getByTestId('textarea');
    await user.type(textarea, 'Ceci est un message');
    expect(textarea).toHaveValue('Ceci est un message');

    // Cliquer sur envoyer
    const btnSend = screen.getByTestId('btn-send');
    await user.click(btnSend);

    // Vérifier que le message est ajouté dans le tableau
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(2); // Header + 1 message

    // Vérifier le contenu du message ajouté
    const messageRow = tableRows[1];
    expect(messageRow).toHaveTextContent('Titre du message');
    expect(messageRow).toHaveTextContent('0'); // ID check
    expect(messageRow.children[2]).toHaveTextContent(); // Encrypted message exists
  });

  test('lire un message', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Ajouter d'abord un message
    await user.type(screen.getByTestId('input-title'), 'Test Title');
    await user.type(screen.getByTestId('textarea'), 'Test Message');
    await user.click(screen.getByTestId('btn-send'));

    // Décrypter le message
    const messageRows = screen.getAllByRole('row');
    const encryptedCell = messageRows[1].children[2];
    await user.click(encryptedCell);

    // Vérifier que le popup est affiché
    const secretKeyInput = screen.getByPlaceholderText('Enter secret key');
    expect(secretKeyInput).toBeInTheDocument();

    // Entrer la clé et décrypter
    await user.type(secretKeyInput, 'my-secret-key');
    await user.click(screen.getByText('Decrypt'));

    // Vérifier le message décrypté
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  test('modifier un message', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Ajouter un message
    await user.type(screen.getByTestId('input-title'), 'Test Title');
    await user.type(screen.getByTestId('textarea'), 'Initial Message');
    await user.click(screen.getByTestId('btn-send'));

    // Cliquer sur modifier
    await user.click(screen.getByText('Modifier'));

    // Entrer la clé pour décrypter
    const secretKeyInput = screen.getByPlaceholderText('Enter secret key');
    await user.type(secretKeyInput, 'my-secret-key');
    await user.click(screen.getByText('Decrypt'));

    // Modifier le message
    const editTextarea = screen.getByClassName('edit-textarea');
    await user.clear(editTextarea);
    await user.type(editTextarea, 'Modified Message');
    
    // Valider la modification
    await user.click(screen.getByText('Valider'));

    // Vérifier que le message a été modifié (en le décryptant à nouveau)
    const messageRows = screen.getAllByRole('row');
    await user.click(messageRows[1].children[2]);
    await user.type(screen.getByPlaceholderText('Enter secret key'), 'my-secret-key');
    await user.click(screen.getByText('Decrypt'));
    
    expect(screen.getByText('Modified Message')).toBeInTheDocument();
  });

  test('supprimer un message', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Ajouter un message
    await user.type(screen.getByTestId('input-title'), 'Test Title');
    await user.type(screen.getByTestId('textarea'), 'Test Message');
    await user.click(screen.getByTestId('btn-send'));

    // Vérifier présence initiale
    let messageRows = screen.getAllByRole('row');
    expect(messageRows.length).toBe(2); // Header + 1 message

    // Supprimer le message
    await user.click(screen.getByText('Delete'));

    // Vérifier que le message est supprimé
    messageRows = screen.getAllByRole('row');
    expect(messageRows.length).toBe(1); // Only header remains
  });

  test('annuler le décryptage', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Ajouter un message
    await user.type(screen.getByTestId('input-title'), 'Test Title');
    await user.type(screen.getByTestId('textarea'), 'Test Message');
    await user.click(screen.getByTestId('btn-send'));

    // Ouvrir le popup de décryptage
    const messageRows = screen.getAllByRole('row');
    await user.click(messageRows[1].children[2]);

    // Vérifier que le popup est affiché
    expect(screen.getByPlaceholderText('Enter secret key')).toBeInTheDocument();

    // Cliquer sur Cancel
    await user.click(screen.getByText('Cancel'));

    // Vérifier que le popup est fermé
    expect(screen.queryByPlaceholderText('Enter secret key')).not.toBeInTheDocument();
  });
});