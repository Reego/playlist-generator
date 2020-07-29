import {
    getSongData,
} from "./api";

const playlistNameSuffix = " [SMS]";

const playlistConstraint = [
    "year", "acousticness", "danceability", "energy", "instrumentalness", "valence", "tempo",
];

function isValidSong(playlist, songData) {
    if(playlist.genres && !playlist.genres.includes(songData.genre))
    {
        return false;
    }

    for(let i = 0; i < constraint.length; i++) {
        const songDataExtraValue = songData[constraint[i]];
        const playlistConstraintBounds = playlist[constraint[i]];

        if(playlistConstraintBounds < playlistConstraintBounds[0]
            || playlistConstraintBounds > playlistConstraintBounds[1]]) {
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
                    if(playlists[playlistSchema.dateKey])
                }
            });
        }
        playlistSchemas.forEach((playlistSchema) => {
            const playlistItem = playlist[playlistSchema.dateKey];
            if(playlistItem[1].length >= 100) {
                await apiUpdatePlaylist(playlistItem.slice(0, 100));
            }
            playlistItem[1].splice(0, 100);
        });
        progressionCallback(i);
    }
    if(i % 50 !== 0) {
        progressionCallback(songIds.length)
    }
}

function savePlaylistSchemasInLocalStorage(playlistSchemas) {

}

export {
    generatePlaylists,
    savePlaylistSchemasInLocalStorage,
};