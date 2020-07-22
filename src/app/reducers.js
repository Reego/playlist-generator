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
    return Object.assign({}, state, {
        songsLoaded: action.type === LOAD_SONGS,
    });
};

const handlePlaylistSchemas = (state = {}, action) => {
    if(action.type === MODIFY_PLAYLIST_SCHEMA) {
        const newPlaylistSchemas = [...state.playlistSchemas];
        newPlaylistSchemas[action.index] = action.modifiedPlaylistSchema;
        return Object.assign({}, state, {
            playlistSchemas: newPlaylistSchemas,
        });
    }
    else if(action.type === ADD_PLAYLIST_SCHEMA) {
        const newPlaylistSchemas = [...state.playlistSchemas];
        newPlaylistSchemas.push(action.newPlaylistSchema);
        return Object.assign({}, state, {
            playlistSchemas: newPlaylistSchemas,
        });
    }
    else if(action.index !== undefined && action.index < state.playlistSchemas.length) { /// REMOVE_PLAYLIST_SCHEMA
        const newPlaylistSchemas = [...state.playlistSchemas];
        newPlaylistSchemas.splice(action.index, 1);
        return Object.assign({}, state, {
            playlistSchemas: newPlaylistSchemas,
        });
    }
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
            return handlePlaylistSchemas(state, action);
        case PROGRESS_PLAYLIST_GENERATION:
            return handlePlaylistGeneration(state, action);
        case OBTAIN_AUTH:
            return handleAPI(state, action);
    }
    return state;
};

export default handleUserApp;