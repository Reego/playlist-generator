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
} from "../actionTypes";

import {
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
} from "../actions";

test("setPopup returns object with type SET_POPUP", () => {
    expect(setPopup().type).toBe(SET_POPUP);
});

test("progressPlaylistGeneration returns object with type PROGRESS_PLAYLIST_GENERATION", () => {
    const progress = [0, 2, 3, 5];
    for(let num of [0, 2, 3, 5]) {
        const action = progressPlaylistGeneration(num);
        expect(action.type).toBe(PROGRESS_PLAYLIST_GENERATION);
        expect(action.progress).toEqual(num);
    }
});

test("incrementButtonsBlockCounter returns object with type BUTTONS_BLOCK", () => {
    expect(incrementButtonsBlockCounter().type).toEqual(BUTTONS_BLOCK);
});

test("decrementButtonsBlockCounter returns object with type BUTTONS_UNBLOCK", () => {
    expect(decrementButtonsBlockCounter().type).toEqual(BUTTONS_UNBLOCK);
});

test("loadSongs returns object with type LOAD_SONGS", () => {
    expect(loadSongs().type).toEqual(LOAD_SONGS);
});

test("resetLoadedSongs returns object with type RESET_LOADED_SONGS", () => {
    expect(resetLoadedSongs().type).toEqual(RESET_LOADED_SONGS);
});

test("modifyPlaylistSchema returns object with type MODIFY_PLAYLIST_SCHEMA", () => {
    let i = 0;
    for(let modifiedPlaylistSchema of ["wow", "hey", "NAH"]) {
        const action = modifyPlaylistSchema(modifiedPlaylistSchema, i);
        expect(action.type).toEqual(MODIFY_PLAYLIST_SCHEMA);
        expect(action.modifiedPlaylistSchema).toEqual(modifiedPlaylistSchema);
        expect(action.index).toEqual(i);
        i++;
    }
});

test("addPlaylistSchema returns object with type ADD_PLAYLIST_SCHEMA", () => {
    for(let newPlaylistSchema of ["wow", "hey", "NAH"]) {
        const action = addPlaylistSchema(newPlaylistSchema);
        expect(action.type).toEqual(ADD_PLAYLIST_SCHEMA);
        expect(action.newPlaylistSchema).toEqual(newPlaylistSchema);
    }
});

test("removePlaylistSchema returns object with type REMOVE_PLAYLIST_SCHEMA", () => {
    for(let i = 0; i < 10; i++) {
        const action = removePlaylistSchema(i);
        expect(action.type).toEqual(REMOVE_PLAYLIST_SCHEMA);
        expect(action.index).toEqual(i);
    }
});

test("obtainAuth returns object with type OBTAIN_AUTH", () => {
    for(let auth of ["wow", "hey", "NAH"]) {
        const action = obtainAuth(auth);
        expect(action.type).toEqual(OBTAIN_AUTH);
        expect(action.auth).toEqual(auth);
    }
});

