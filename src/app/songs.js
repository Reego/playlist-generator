import {
    loadSongs,
} from "./ducks/actions";

function saveSongsToLocalStorage(songs) {
    localStorage.setItem("songs", songs);
}

function processSongsFile(file, onLoad, onError) {
    const reader = new FileReader(file);
    reader.onload = (e) => onLoad(loadSongsFromText(e.target.result));
    reader.onerror = onError;
    reader.readAsText(file);
}

function loadSongsFromText(text, onLoad, onError) {
    const lines = text.split("\n");
    const songs = [];

    for(let line of lines) {
        const songId = line.substring();
        songs.push(songId);
    }
    return songs;
}

function loadSongsFromLocalStorage() {
    return localStorage.getItem("songs");
}

export {
    processSongsFile,
    loadSongsFromLocalStorage,
    saveSongsToLocalStorage,
};