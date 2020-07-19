const {
    loadSongs,
} = require("../api");

/// maybe do by song...

/*
 * Takes a playlist and songData object as parameters
 * Returns whether or not the songData falls under the constraints set by the playlist
 */

function isValidSong(playlist, songData) {
    if(playlist.genreConstraints && !playlist.genreConstraints.includes(songData.genre))
    {
        return false;
    }

    for(let i = 0; i < playlist.extraConstraints.length; i += 3) {
        const songDataItemValue = songData[playlist.extraConstraints];

        if(songDataItemValue !== undefined
            && songDataItemValue < playlist.extraConstraints[i + 1]
            || songDataItemValue > playlist.extraConstraints[i + 2]) {
            return false;
        }
    }
    return true;
}

async function executeQuerySongs(db, argv) {
    getUserSongs(async (songData) => {
        await db.findOrCreate({
            where: {
                spotifyID: songData.spotifyID,
            },
            defaults: {
                name: songData.name,
                artist: songData.artist,
                year: songData.year,
                spotifyID: songData.spotifyID,
            }
        });
    });
}

async function executeCreatePlaylists(db, argv) {
    getUserSongs(async (songData) => {

    });
}

async function executeUpdateAll(db, argv) {
}