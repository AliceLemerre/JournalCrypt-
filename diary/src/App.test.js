import { render, screen } from '@testing-library/react';
import App from './App';

test('présence éléments', () => {
  render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();

  const writeArea = screen.getByPlaceholderText('Votre message'); //test si il est vide
  expect(writeArea).toBeInTheDocument();
  //bouton présent

});
//lib userevent pour les actions
//action : remplir textarea
//action : remplie titre
//cliquer sur le bouton :appelle la fonction encryptText
//vérifier que le message affiche ce qu'on a rempli
//est-ce qu'un élément contient le titre
//est-ce qu'un élément contient le message crypté
//est-ce qu'un élément contient l'id
//est-ce que encrypt est appelée pour le texte et le ??




//tester : que ça ne marche pas quand le champ est vide
//que ça marche quand le champ est rempli
//que le message crypté apparait
//que le password entré matche le vrai password
//que le message décrypté apparait quand on remplit le champ mdp
//que le message se supprime quand on le delete
//que le message est modifiable après décryption


/*
function calculate(a) {
  return a + 2;
}

test("calculates 1 + 2 to equal 3", () => {
  expect(calculate(6)).toBe(8);
});*/
