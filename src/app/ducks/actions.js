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
    type: SET_POPUP,
    content,
});

const progressPlaylistGeneration = (progress) => ({
    type: PROGRESS_PLAYLIST_GENERATION,
    progress,
});

const incrementButtonsBlockCounter = () => ({
    type: BUTTONS_BLOCK,
});

const decrementButtonsBlockCounter = () => ({
    type: BUTTONS_UNBLOCK,
});

/// Song level

const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs,
});

const resetLoadedSongs = () => ({
    type: RESET_LOADED_SONGS,
});


/// Playlist Schema level

const modifyPlaylistSchema = (modifiedPlaylistSchema, index) => ({
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

export {
    setPopup,
    progressPlaylistGeneration,
    incrementButtonsBlockCounter,
    decrementButtonsBlockCounter,
    loadSongs,
    resetLoadedSongs,
    modifyPlaylistSchema,
    addPlaylistSchema,
    removePlaylistSchema,
    obtainAuth,
};