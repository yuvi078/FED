
window.onload = async function() {
    const artistId = '4YRxDV8wJFPHPTeXepOstw';
    const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=10`;

    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + await getToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayAlbums(data.items);
    })
    .catch(error => console.error('Error fetching data:', error));
};


async function getToken() {
    const clientId = '779fc3bb3f3b4715a01e3dd88cb00ed8';
    const clientSecret = 'd8b71117636a49999cee41db32d69c94';
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        if (!response.ok) {
            throw new Error('Failed to access');
        }
        const data = await response.json();
        return data.access_token; // Return the access token
    } catch (error) {
        console.error("Error fetching access token:", error);
        return null;
    }
}
function displayAlbums(albums) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('album');

        const albumImage = document.createElement('img');
        albumImage.src = album.images[0].url;
        albumImage.alt = album.name;

        const albumName = document.createElement('p');
        albumName.textContent = album.name;

        albumDiv.appendChild(albumImage);
        albumDiv.appendChild(albumName);
        content.appendChild(albumDiv);
    });
}
