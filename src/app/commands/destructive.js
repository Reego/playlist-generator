const {
    unfollowPlaylist,
    loadPlaylists,
} = require("api");

async function executeResetSongs(db, argv) {
    await clearSongTable(db);
}

async function executeUnfollowPlaylists(db, argv) {
    const playlists = await loadPlaylists();
    let i = 0;
    for(const playlist in playlists)
    {
        unfollowPlaylist(playlist);
        i++;
    }
    if(i < playlists.length - 1) {
        throw "Command interrupted while trying to unfollow all playlists. Please execute the command again.";
    }
}

async function executeResetAll(db, argv) {
    await executeResetSongs(db, argv);
    await executeUnfollowPlaylists(db, argv);
}

async function resetSongCheckedFields(db) {
    await db.model.update({ checked: false });
}

async function clearSongTable(db) {
    await db.Song.destroy({ truncate: true });
}