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

const handleButtonsBlock = (state = {}, action) => {
    let modifiedInactiveButtonsCounter = ((action.type === BUTTONS_BLOCK)
        ? state.inactiveButtonsCounter + 1
        : state.inactiveButtonsCounter - 1);
    return Object.assign({}, state, {
        inactiveButtonsCounter: state.inactiveButtonsCounter + 1,
    });
};

const handlePopup = (state = {}, action) => {
    if(action.content === "") {
        return Object.assign({}, state, {
            inactiveButtonsCounter: state.inactiveButtonsCounter - 1,
            popup: "",
        });
    }
    const newState = Object.assign({}, state, {
        popup: action.content.
    });
    if(state.popup === null) {
        newState.inactiveButtonsCounter++;
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
        const newState = Object.assign({}, state);
        newState.playlistSchemas[action.playlistSchema.index] = action.modifiedPlaylistSchema;
        return newState;
    }
    else if(action.type === ADD_PLAYLIST_SCHEMA) {
        const newState = Object.assign({}, state);
        newState.playlistSchemas.push(state.newPlaylistSchema);
        return newState;
    }
    else { /// REMOVE_PLAYLIST_SCHEMA
        return Object.assign({}, state, {
            playlistSchemas: state.playlistSchemas.splice(0, action.index);
        });
    }
};

const handlePlaylistGeneration = (state = {}, action) => {
    let previousProgress = state.playlistGenerationProgress;
    if(previousProgress !== action.progress) {
        return Object.assign({}, state, {
            playlistGenerationProgress: ((action.progress >= 100)
                ? -1 : action.progress,
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
        case BUTTONS_UNBLOCK:
            return handleButtonsBlock(state, action);
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