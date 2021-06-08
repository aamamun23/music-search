async function searchMusic(){
    const searchText = document.getElementById('searchField').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    const res = await fetch(url);
    const result = await res.json();
    searchResult(result);
}

function searchResult(result){
    const searchResult = result.data;
    searchResult.forEach( singleMusic => {
        const songArtist = singleMusic.artist.name;
        const songTitle = singleMusic.title;
        const songPreview = singleMusic.preview;
        const singleMusicHTML = `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${songTitle}</h3>
                <p class="author lead">Album by <span>${songArtist}</span></p>
                <audio controls>
                    <source src="${songPreview}">
                    <em>Your browser doesn't support audio</em>
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="displayLyrics('${songArtist}' ,'${songTitle}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
        
        `;
        const searchResultContainer = document.getElementById('musicContainer');
        searchResultContainer.innerHTML+=singleMusicHTML;
    });
}

async function displayLyrics(artist, title){
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
    const data = await res.json();
    //console.log(data.lyrics);
        const musicLyrics = document.getElementById('musicLyrics');
        musicLyrics.innerHTML = `
            <pre>${data.lyrics}</pre>
        `;
    }
    catch(error){
        displayError(error);
    }

}

function displayError(error){
    document.getElementById('errorMessage').innerText = error;
}