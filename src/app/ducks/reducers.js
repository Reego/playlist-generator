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
    SAVE_PLAYLIST_SCHEMAS,

    OBTAIN_AUTH,
} from "./actionTypes";

/// Helper function that sets default value of counter to 0 if undefined

const incrementCounter = (counter = 0) => counter + 1;

const decrementCounter = (counter = 0) => counter - 1;

const handlePopup = (state = {}, action) => {
    if(action.content) {
        const newState = Object.assign({}, state, {
            popup: action.content,
        });
        if(!state.popup) {
            newState.buttonsBlockCounter = incrementCounter(newState.buttonsBlockCounter);
        }
        return newState;
    }
    const newState = Object.assign({}, state, {
        popup: "",
    });
    if(state.popup) {
        newState.buttonsBlockCounter = decrementCounter(newState.buttonsBlockCounter);
    }
    return newState;
};

const handleSongState = (state = {}, action) => {
    let songs = (action.type === LOAD_SONGS) ? action.songs : [];
    return Object.assign({}, state, {
        songs,
    });
};

const handlePlaylistSchemas = (playlistSchemas = [], action) => {
    let newPlaylistSchemas;
    if(action.type === MODIFY_PLAYLIST_SCHEMA) {
        newPlaylistSchemas = [...playlistSchemas];
        newPlaylistSchemas[action.index] = action.modifiedPlaylistSchema;
    }
    else if(action.type === ADD_PLAYLIST_SCHEMA) {
        newPlaylistSchemas = [...playlistSchemas];
        newPlaylistSchemas.push(action.newPlaylistSchema);
    }
    else if(action.index !== undefined && action.index < playlistSchemas.length) { /// REMOVE_PLAYLIST_SCHEMA
        newPlaylistSchemas = [...playlistSchemas];
        newPlaylistSchemas.splice(action.index, 1);
    }
    return newPlaylistSchemas;
};

const handlePlaylistGeneration = (state = {}, action) => {
    let previousProgress = state.playlistGenerationProgress;
    if(previousProgress !== action.progress) {
        return Object.assign({}, state, {
            playlistGenerationProgress: ((action.progress >= 100)
                ? -1 : action.progress
            )
        });
    }
    return state;
};

const handleAPI = (state = {}, action) => {
    return Object.assign({}, state, {
        auth: action.auth
    });
};

const handleUserApp = (state = {}, action) => {
    switch(action.type) {
        case BUTTONS_BLOCK:
            return Object.assign({}, state, {
                buttonsBlockCounter: incrementCounter(state.buttonsBlockCounter),
            });
        case BUTTONS_UNBLOCK:
            return Object.assign({}, state, {
                buttonsBlockCounter: decrementCounter(state.buttonsBlockCounter),
            });
        case SET_POPUP:
            return handlePopup(state, action);
        case LOAD_SONGS:
        case RESET_LOADED_SONGS:
            return handleSongState(state, action);
        case MODIFY_PLAYLIST_SCHEMA:
        case ADD_PLAYLIST_SCHEMA:
        case REMOVE_PLAYLIST_SCHEMA:
            return Object.assign({}, state, {
                playlistSchemas: handlePlaylistSchemas(state.playlistSchemas, action),
                playlistSchemasDirty: true,
            });
        case SAVE_PLAYLIST_SCHEMAS:
            return Object.assign({}, state, {
                playlistSchemasDirty: false,
            });
        case PROGRESS_PLAYLIST_GENERATION:
            return handlePlaylistGeneration(state, action);
        case OBTAIN_AUTH:
            return handleAPI(state, action);
    }
    return state;
};

export default handleUserApp;