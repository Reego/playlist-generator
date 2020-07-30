import {
    apiUpdatePlaylist,
    getSongData,
} from "./api";

import {
    addPlaylistSchema,
} from "./ducks/actions";

const playlistNameSuffix = " [SMS]";

const playlistConstraint = [
    "year", "acousticness", "danceability", "energy", "instrumentalness", "valence", "tempo",
];

function isValidSong(playlist, songData) {
    if(playlist.genres && !playlist.genres.includes(songData.genre))
    {
        return false;
    }

    for(let i = 0; i < playlistConstraint.length; i++) {
        const songDataExtraValue = songData[playlistConstraint[i]];
        const playlistConstraintBounds = playlist[playlistConstraint[i]];

        if(playlistConstraintBounds < playlistConstraintBounds[0]
            || playlistConstraintBounds > playlistConstraintBounds[1]) {
            return false;
        }
    }
    return true;
}

async function generatePlaylists(playlistSchemas, songIds, progressionCallback) {
    const playlists = {};

    playlistSchemas.forEach((playlistSchemas) => {
        playlists[playlistSchemas.dateKey] = [playlistSchemas, []];
    });

    const fullPlaylists = [];
    for(let i = 0; i < songIds.length; i += 50) {
        const songData = getSongData(songIds.slice(i, 50));
        for(let g = 0; g < songData.length; g++) {
            playlistSchemas.forEach((playlistSchema) => {
                if(isValidSong(playlistSchema, songData[g])) {
                    playlists[playlistSchema.dateKey][1].push(songData[g]);
                }
            });
        }
        playlistSchemas.forEach(async (playlistSchema) => {
            const playlistItem = playlists[playlistSchema.dateKey];
            if(playlistItem[1].length >= 100) {
                await apiUpdatePlaylist(playlistItem.apiId, playlistItem.slice(0, 100));
            }
            playlistItem[1].splice(0, 100);
        });
        progressionCallback(i);
    }
    if(songIds.length % 50 !== 0) {
        progressionCallback(songIds.length)
    }
}

function loadPlaylistSchemasFromLocalStorage() {
    return localStorage.getItem("playlistSchemas") || [];
}

function savePlaylistSchemasToLocalStorage(playlistSchemas) {
    localStorage.setItem("playlistSchemas", playlistSchemas);
}

export {
    generatePlaylists,
    loadPlaylistSchemasFromLocalStorage,
    savePlaylistSchemasToLocalStorage,
};