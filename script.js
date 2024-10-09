async function fetchCharacter() {
    const characterName = document.getElementById('character-input').value.trim();
    if (!characterName) {
        console.warn('Ingen karakternavn gitt.');
        return;
    }
 
    console.log(`Fetching character: ${characterName}`);
 
    try {
        const response = await fetch(`https://dattebayo-api.onrender.com/characters?name=${characterName}`);
        if (!response.ok) {
            throw new Error('Nettverksresponsen var ikke ok');
        }
 
        const data = await response.json();
        console.log(data);
 
        const character = data.characters;
 
        if (!Array.isArray(character) || character.length === 0) {
            document.getElementById('character-info').innerHTML = 'Ingen karakter funnet.';
            return;
        }
 
        const char = character[0];
        const imageUrl = char.images && Array.isArray(char.images) && char.images.length > 0 ? char.images[0] : 'default-image-url.jpg';
 
        document.getElementById('character-info').innerHTML = `
<img src="${imageUrl}" alt="${char.name}">
<h2>${char.name}</h2>
<p><strong>Birthdate:</strong> ${char.debut.manga}</p>
<p><strong>Unique Traits:</strong> ${char.jutsu.join(', ')}</p>
        `;
    } catch (error) {
        console.error('Feil ved henting av data:', error);
        document.getElementById('character-info').innerHTML = 'En feil oppstod ved henting av data.';
    }
}