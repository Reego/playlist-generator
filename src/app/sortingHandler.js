import {
    getSongData,
} from "./api";

function generatePlaylists(playlistSchemas, songIds, progressionCallback) {
    const fullPlaylists = [];
    for(let i = 0; i < songIds.length; i += 50) {
        const songData = getSongData(songIds.slice(i, 50));
        for(let g = 0; g < songData.length; g++) {
            playlistSchemas.forEach((playlistSchema) => {
                
            });
        }
        progressionCallback(i);
    }
    if(i % 50 !== 0) {
        progressionCallback(songIds.length)
    }
}

export {
    processSongs,
    generatePlaylists,
};