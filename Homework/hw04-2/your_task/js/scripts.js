const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/879c7106422b0b53852209da6a63210be7e09b01?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

//             ARTISTS           //

const getArtist = (term) => {
    document.querySelector('#artist').innerHTML = " ";
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);
    console.log("start fetch")
    fetch(baseURL + "?type=artist&q=" + term)
    .then(response => response.json())
    .then(artists => {
        console.log(artists);

        if (artists.length == 0){
            document.querySelector('#artist').innerHTML = `<p>No artists found for "${term}"</p>`;
        }

        counter = 0
        for (const artist of artists){
            document.querySelector('#artist').innerHTML += `
            <section class="artist-card" id="${artist.id}">
            <div>
                <img src="${artist.image_url}" alt="${artist.name}">
                <h2>${artist.name}</h2>
                <div class="footer">
                    <a href="${artist.spotify_url}" target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>
            `;
        
            console.log(`<p>$(artist.name)</p>`);
            counter += 1;
            if (counter >=1){
                break;
            }

        }
    })
};


//             TRACKS          //

const getTracks = (term) => {
    document.querySelector('#tracks').innerHTML = " ";
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
    console.log("start fetch")
    fetch(baseURL + "?type=track&q=" + term)
    .then(response => response.json())
    .then(tracks => {
        console.log(tracks);

        if (tracks.length == 0){
            document.querySelector('#tracks').innerHTML = `<p>No tracks found for "${term}"</p>`;
        }

        counter = 0
        for (const track of tracks){
            document.querySelector('#tracks').innerHTML += `
            <button class="track-item preview" data-preview-track="${track.preview_url}" onclick="handleTrackClick(event);">
            <img src="${track.album.image_url}" alt="${track.name}">
            <i class="fas play-track fa-play" aria-hidden="true"></i>
            <div class="label">
                <h2> ${track.name} </h2>
                <p>
                    ${track.artist.name}
                </p>
            </div>
        </button>
            `;
        
            console.log(`<p>$(track.name)</p>`);
            counter += 1;
            if (counter >=5){
                break;
            }

        }
    })
};

//             ALBUMS          //

const getAlbums = (term) => {
    document.querySelector('#albums').innerHTML = "";
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
    console.log("start fetch");
    fetch("https://www.apitutor.org/spotify/simple/v1/search?type=album&q=" + term)
    .then(response => response.json())
    .then(albums => {
        console.log(albums);
        if (albums.length == 0){
            document.querySelector('#albums').innerHTML = `<p>No albums found for "${term}"</p>`;
        }
        counter = 0;
        for (const album of albums){
            document.querySelector('#albums').innerHTML += `
                <section class = "album-card" id = "${album.id}">
                <div>
                    <img src = "${album.image_url}" alt="${album.name}">
                    <h2> ${album.name} </h2>
                    <div class = "footer">
                        <a href="${album.spotify_url}" target ="_blank">
                        view on spotify
                        </a>
                    </div>
                </div>
            </section>
            `;
            console.log(`<p>${album.name}</p>`);
            counter += 1;
            if (counter >= 10){
                break;
            }
        }
    })
};


const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();
    const track_preview = ev.currentTarget.innerHTML;
    document.querySelector("#current-track").innerHTML = track_preview;
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};