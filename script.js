document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/anime';
    const container = document.getElementById('anime-container');
    const searchInput = document.getElementById('search');
    const toggleButton = document.getElementById('toggleMode');
    let darkMode = false;

    function fetchAnime() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayAnime(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayAnime(animeList) {
        container.innerHTML = animeList.map(anime => `
            <div class="anime-card">
                <img src="${anime.image}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p>${anime.genres.join(', ')}</p>
                <p>Episodes: ${anime.episodes}</p>
            </div>
        `).join('');
    }

    function toggleDarkMode() {
        darkMode = !darkMode;
        document.body.style.backgroundColor = darkMode ? '#333' : '#f4f4f4';
        document.body.style.color = darkMode ? '#fff' : '#000';
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const filteredAnime = data.filter(anime => anime.title.toLowerCase().includes(query));
                displayAnime(filteredAnime);
            });
    });document.getElementById('add-anime-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const genres = document.getElementById('genres').value.split(',').map(genre => genre.trim());
    const episodes = parseInt(document.getElementById('episodes').value);
    const image = document.getElementById('image').value;
    
    const newAnime = { title, genres, episodes, image };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnime),
    })
    .then(response => response.json())
    .then(() => {
        fetchAnime(); // Refresh the list
        document.getElementById('add-anime-form').reset();
    })
    .catch(error => console.error('Error adding anime:', error));
});
document.getElementById('add-anime-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const genres = document.getElementById('genres').value.split(',').map(genre => genre.trim());
    const episodes = parseInt(document.getElementById('episodes').value);
    const image = document.getElementById('image').value;
    
    const newAnime = { title, genres, episodes, image };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnime),
    })
    .then(response => response.json())
    .then(() => {
        fetchAnime(); // Refresh the list
        document.getElementById('add-anime-form').reset();
    })
    .catch(error => console.error('Error adding anime:', error));
});
document.getElementById('update-anime-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = parseInt(document.getElementById('update-id').value);
    const title = document.getElementById('update-title').value;
    const genres = document.getElementById('update-genres').value.split(',').map(genre => genre.trim());
    const episodes = parseInt(document.getElementById('update-episodes').value);
    const image = document.getElementById('update-image').value;

    const updatedAnime = { title, genres, episodes, image };

    fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnime),
    })
    .then(response => response.json())
    .then(() => {
        fetchAnime(); // Refresh the list
        document.getElementById('update-anime-form').reset();
    })
    .catch(error => console.error('Error updating anime:', error));
});
document.getElementById('delete-anime-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = parseInt(document.getElementById('delete-id').value);

    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        fetchAnime(); // Refresh the list
        document.getElementById('delete-anime-form').reset();
    })
    .catch(error => console.error('Error deleting anime:', error));
});
