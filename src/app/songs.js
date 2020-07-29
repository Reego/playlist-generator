import {
    loadSongs,
} from "./ducks/actions";

function loadSongsFromFile(fileContent) {
    const lines = fileContent.split("\n");
    const songs = [];

    for(let line of lines) {
        const songId = line.substring();
        songs.push(songId);
    }
    return songs;
}

function loadSongsFromLocalStorage(dispatch) {
    const localSongs = localStorage.getItem("songs");
    dispatch(loadSongs(localSongs));
}

export {
    loadSongsFromFile,
    loadSongsFromLocalStorage,
};