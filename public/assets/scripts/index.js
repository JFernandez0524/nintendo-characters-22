const characterContainer = document.getElementById('characters');
const createCharacterForm = document.getElementById('createCharacterForm');

(async function () {
  const myObj = await fetch('/api/characters');
  const data = await myObj.json();
  console.log(data.characters);
  data.characters.map((character) => {
    console.log(character.name);
    const pEl = document.createElement('p');
    pEl.innerHTML = `${character.name} is from the game ${character.game}`;
    characterContainer.appendChild(pEl);
  });
})();

createCharacterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const characterName = document.querySelector('#name').value;
  const characterGame = document.querySelector('#game').value;

  fetch('/api/characters', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: characterName,
      game: characterGame,
    }),
  });

  alert('Character Added Successfully');
});
