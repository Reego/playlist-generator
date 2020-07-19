const http = require("http");

const apiURL;
const requestOptions = {
    method:
};

/*
 * Returns a Promise with a result of all of the user's songs
 */

async function getSongData(song) {
    return http.request(apiURL).then((data) => JSON.parse(data));
}

/*
 * Takes a songCallback as a parameter
 * the songCallback is called for each retrieved song from the API
 */

async function processUserSongs(songCallback) {
    let totalSongCount = 0;
    let processSongs = 0;
    while(true) {
        let songCount = ///
        totalSongCount += songCount;
        const songs = [];
        for(let i = 0; i < songCount; i++) {
            songCallback(songs[i]).then(() => { totalSongCount = })
        }
        if(songCount !== 0) {
            callback();
        }
    }
    return async.until(() => )
}

/*
 * Returns a Promise that retrieves all of the user's playlists
 */

async function getUserPlaylists() {
    return http.request(apiURL).then(() => JSON.parse(data));
}

/*
 * Returns the final loadaed playlists, each with a unique api_id
 */
async function loadPlaylists() {
    const playlists = require("../playlistConfig.json");

    const userPlaylists = await getUserPlaylists();
    for(let i = 0; i < playlists.length; i++) {
        const playlistName = playlists[i];
        let hasMatch = false;
        for(let g = 0; g < userPlaylists.length; g++) {
            if(playlistName === userPlaylists[g].name) {
                playlists[i].api_id = userPlaylists[g].id;
                userPlaylists = userPlaylists.splice(g, 1);
                hasMatch = true;
                break;
            }
        }
        if(!hasMatch) {
            playlists[i].api_id = await createPlaylist(playlistName);
        }
    }
    return playlists;
}

/*
 * Returns the api_id of the created playlist
 */
async function createPlaylist(playlistName) {
    ///
    return;
}

async function deletePlaylist(api_id) {
    ///
}

async function deleteAllPlaylists(api_ids) {
    for(let api_id of api_ids) {
        deletePlaylist(api_id);
    }
}

export {
    getSongData,
    getUserPlaylists,
};