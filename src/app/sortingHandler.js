import {
    getSongData,
} from "./api";

function generatePlaylists(playlistSchemas, songIds) {
    const fullPlaylists = [];
    for(let i = 0; i < songIds.length; i += 50) {
        const songData = getSongData(songIds.slice(i, 50));
        for(let g = 0; g < songData.length; g++) {
            playlistSchemas.forEach((playlistSchema) => {

            });
        }
    }
}

export {
    processSongs,
    generatePlaylists,
};