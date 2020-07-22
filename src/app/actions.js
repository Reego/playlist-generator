import {
    SET_POPUP,
    PROGRESS_PLAYLIST_GENERATION,
    BUTTONS_BLOCK,
    BUTTONS_UNBLOCK,

    LOAD_SONGS,
    RESET_LOADED_SONGS,

    MODIFY_PLAYLIST_SCHEMA,
    ADD_PLAYLIST_SCHEMA,
    REMOVE_PLAYLIST_SCHEMA,

    OBTAIN_AUTH,
} from "./actionTypes";


/// UI level

const setPopup = (content = "") => ({
    type: OPEN_POPUP,
    content,
});

const progressPlaylistGeneration = () => ({
    type: PROGRESS_PLAYLIST_GENERATION,
});

const incrementButtonsBlockCounter = () => ({
    type: BUTTONS_BLOCK,
});

const decrementButtonsBlockCounter = () => ({
    type: BUTTONS_UNBLOCK,
});

/// Song level

const loadSongs = () => ({
    type: LOAD_SONGS
});

const resetLoadedSongs = () => ({
    type: RESET_LOADED_SONGS,
});


/// Playlist Schema level

const modifyPlaylistSchema = (modifiedPlaylistSchema, indez) => ({
    type: MODIFY_PLAYLIST_SCHEMA,
    modifiedPlaylistSchema,
    index,
});

const addPlaylistSchema = (newPlaylistSchema) => ({
    type: ADD_PLAYLIST_SCHEMA,
    newPlaylistSchema,
});

const removePlaylistSchema = (index) => ({
    type: REMOVE_PLAYLIST_SCHEMA,
    index,
});


/// API level

const obtainAuth = (auth) => ({
    type: OBTAIN_AUTH,
    auth,
});