const constructiveCmds = require("./constructive");
const destructiveCmds = require("./destructive");

const CMD_QUERY_SN = "query-songs-data";
const CMD_RESET_SN = "reset-songs-data";
const CMD_UNFOLLOW_PL = "unfollow-playlists";
const CMD_UPDATE_ALL = "update";
const CMD_RESET_ALL = "reset-all";
const CMD_CREATE_PL = "create-playlists";

const mapping = {
    CMD_QUERY_SN: constructiveCmds.executeQuerySongs,
    CMD_RESET_SN: destructiveCmds.executeResetSongs,
    CMD_UNFOLLOW_PL: destructiveCmds.executeUnfollowPlaylists,
    CMD_UPDATE_ALL: constructiveCmds.executeUpdateAll,
    CMD_RESET_ALL: destructiveCmds.executeResetAll,
    CMD_CREATE_PL: constructiveCmds.executeCreatePlaylists,
};

export default mapping;