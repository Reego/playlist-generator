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
} from "../actionTypes";

import reducer from "../reducers";

describe("UI reducers", () => {

    test("inactive button block counter increments", () => {
        for(let initialButtonsBlockCounter of [0, undefined, 3]) {
            const initialPracticalValue = initialButtonsBlockCounter || 0;
            let state = {
                buttonsBlockCounter: initialButtonsBlockCounter,
            };
            for(let i = 0; i < 100; i++) {
                state = reducer(state, {
                    type: BUTTONS_BLOCK,
                });
                expect(state.buttonsBlockCounter).toEqual(initialPracticalValue + i + 1);
            }
        }
    });

    test("inactive button block counter decrements", () => {
        let state = {};

        for(let initialButtonsBlockCounter of [0, undefined, -6]) {
            const initialPracticalValue = initialButtonsBlockCounter || 0;
            let state = {
                buttonsBlockCounter: initialButtonsBlockCounter,
            };
            for(let i = 0; i < 100; i++) {
                state = reducer(state, {
                    type: BUTTONS_UNBLOCK,
                });
                expect(state.buttonsBlockCounter).toEqual(initialPracticalValue - i - 1);
            }
        }
    });

    test("playlist generation progress from 0 to 99 to -1", () => {
        const makeAction = (progress) => ({
            type: PROGRESS_PLAYLIST_GENERATION,
            progress,
        });
        const progressAndOutcomes = [
            0, 0,
            1, 1,
            23, 23,
            93, 93,
            99, 99,
            99, 99,
            100, -1,
            -1, -1,
            102, -1,
            200, -1,
            300, -1,
            -2, -2,
        ];

        let state = {
            playlistGenerationProgress: -1,
        };

        for(let i = 0; i < progressAndOutcomes.length; i += 2) {
            expect(reducer(state, makeAction(progressAndOutcomes[i])).playlistGenerationProgress).toEqual(progressAndOutcomes[i + 1]);
        }
    });
});

describe("popup reducers", () => {

    const makeAction = (content) => ({
        type: SET_POPUP,
        content,
    });

    test("popup sets content", () => {
        const contentList = ["hello", "hello there", "hello there", "OBIWAN KENOBI", "ok", "", "lol"];
        for(let content of contentList) {
            expect(reducer({}, makeAction(content)).popup).toEqual(content);
        }

    });

    // undefined

    test("popup set content when there was previous content set does not increment buttonsBlockCounter", () => {
        const stateOutcomePairs = [
            "wow", 0, 0,
            "wow", 2, 2,
            "meow", -5, -5,
        ];
        const actionContent = [
            "hola", "wait what", "baby, one more time",
        ];
        for(let i = 0; i < stateOutcomePairs.length; i++) {
            const g = i * 3;
            const newState = reducer({
                popup: stateOutcomePairs[g],
                buttonsBlockCounter: stateOutcomePairs[g + 1],
            }, makeAction(actionContent[i]));
            expect(newState.buttonsBlockCounter).toEqual(stateOutcomePairs[g + 2]);
        }
    });

    test("popup set content when there was no previous content set increments buttonsBlockCounter", () => {
        const stateOutcomePairs = [
            undefined, 0, 1,
            "", 2, 3,
            "", -5, -4,
        ];
        const actionContent = [
            "my my", "wait what", "baby, one more time",
        ];
        for(let i = 0; i < stateOutcomePairs.length; i++) {
            const g = i * 3;
            const newState = reducer({
                popup: stateOutcomePairs[g],
                buttonsBlockCounter: stateOutcomePairs[g + 1],
            }, makeAction(actionContent[i]));
            expect(newState.buttonsBlockCounter).toEqual(stateOutcomePairs[g + 2]);
        }
    });

    test("popup emptying content when there was previous content set decrements buttons block counter", () => {
        const stateOutcomePairs = [
            "wow", 0, -1,
            "boi", 2, 1,
            "meow", -5, -6,
        ];
        const actionContent = [
            "", "", "",
        ];
        for(let i = 0; i < stateOutcomePairs.length; i++) {
            const g = i * 3;
            const newState = reducer({
                popup: stateOutcomePairs[g],
                buttonsBlockCounter: stateOutcomePairs[g + 1],
            }, makeAction(actionContent[i]));
            expect(newState.buttonsBlockCounter).toEqual(stateOutcomePairs[g + 2]);
        }
    });

    test("popup emptying content when there was no previous content set does not decrement buttons block counter", () => {
        const stateOutcomePairs = [
            "", 0, 0,
            undefined, 2, 2,
            "", -5, -5,
        ];
        const actionContent = [
            "", "", "",
        ];
        for(let i = 0; i < stateOutcomePairs.length; i++) {
            const g = i * 3;
            const newState = reducer({
                popup: stateOutcomePairs[g],
                buttonsBlockCounter: stateOutcomePairs[g + 1],
            }, makeAction(actionContent[i]));
            expect(newState.buttonsBlockCounter).toEqual(stateOutcomePairs[g + 2]);
        }
    });
});

describe("song state reducers", () => {

    test("songs gets set to first parameter provided to loadSongs action", () => {

        const makeAction = (songsToLoad) => ({
            type: LOAD_SONGS,
            songs: songsToLoad,
        });

        const initStates = [
            ["hi", "how", "are", "you?"],
            [1, 2, 3, 3, 4, 5],
            [8, 7, 55, 2],
            ["no", "way"],
            [8],
        ];

        const actionSongsParams = [
            [1, 2, 3],
            [],
            ["WHOA", "HEY"]
        ];

        for(let i = 0; i < initStates.length; i++) {
            const state = initStates[i];
            const newState = reducer(initStates[i], makeAction(actionSongsParams[i]));
            expect(newState.songs).toEqual(actionSongsParams[i]);
        }
    });

    test("songs becomes an empty array", () => {
        const action = {
            type: RESET_LOADED_SONGS,
        };
        expect(reducer({}, action).songs.length).toEqual(0);
        expect(reducer({ songs: [1, 2, 3] }, action).songs.length).toEqual(0);
        expect(reducer({ songs: ["whoa", "HEY"] }, action).songs.length).toEqual(0);
    });
});

describe("playlist schema reducers", () => {

    test("modifying playlist schema overrides schema object at provided index", () => {
        const initStates = [
            ["hi", "how", "are", "you?"],
            [1, 2, 3, 3, 4, 5],
            [8, 7, 55, 2],
            ["no", "way"],
            [8],
        ];

        const actionSchemas = [
            "Bad.", 2,
            7, 3,
            "whao", 0,
            "no", 1,
            9, 0,
        ];

        const expectedOutcomes = [
            ["hi", "how", "Bad.", "you?"],
            [1, 2, 3, 7, 4, 5],
            ["whao", 7, 55, 2],
            ["no", "no"],
            [9],
        ];

        for(let i = 0; i < initStates.length; i++) {
            let k = i * 2;
            const initState = { playlistSchemas: initStates[i] };
            const newState = reducer(
                initState,
                { 
                    type: MODIFY_PLAYLIST_SCHEMA,
                    modifiedPlaylistSchema: actionSchemas[k],
                    index: actionSchemas[k + 1],
                }
            );
            for(let g = 0; g < newState.playlistSchemas.length; g++) {
                expect(newState.playlistSchemas[g]).toEqual(expectedOutcomes[i][g]);
            }
            expect(newState.playlistSchemas.length).toEqual(expectedOutcomes[i].length);
            expect(newState.playlistSchemasDirty).toBe(true);
        }
    });

    test("playlist schema gets added to the end of state.playlistSchemas", () => {
        const initStates = [
            ["hi", "how", "are", "you?"],
            [1, 2, 3, 3, 4, 5],
            [8, 7, 55, 2],
            ["no", "way"],
            [8],
        ];

        const actionSchemas = [
            "Bad.",
            7,
            "whao",
            "no",
            9,
        ];

        const expectedOutcomes = [
            ["hi", "how", "are", "you?", "Bad."],
            [1, 2, 3, 3, 4, 5, 7],
            [8, 7, 55, 2, "whao"],
            ["no", "way", "no"],
            [8, 9],
        ];

        for(let i = 0; i < initStates.length; i++) {
            const initState = { playlistSchemas: initStates[i] };
            const newState = reducer(
                initState, { type: ADD_PLAYLIST_SCHEMA, newPlaylistSchema: actionSchemas[i] }
            );
            for(let g = 0; g < newState.playlistSchemas.length; g++) {
                expect(newState.playlistSchemas[g]).toEqual(expectedOutcomes[i][g]);
            }
            expect(newState.playlistSchemas.length).toEqual(expectedOutcomes[i].length);
            expect(newState.playlistSchemasDirty).toBe(true);
        }
    });

    test("playlist schema gets removed at the provided index from state.playlistSchemas", () => {
        const initStates = [
            ["hi", "how", "are", "you?"],
            [1, 2, 3, 3, 4, 5],
            [8, 7, 55, 2],
            ["no", "way"],
            [8],
        ];

        const actionIndeces = [
            0,
            2,
            3,
            1,
            0,
        ];

        const expectedOutcomes = [
            ["how", "are", "you?"],
            [1, 2, 3, 4, 5],
            [8, 7, 55],
            ["no"],
            [],
        ];

        for(let i = 0; i < initStates.length; i++) {
            const initState = { playlistSchemas: initStates[i] };
            const newState = reducer(
                initState, { type: REMOVE_PLAYLIST_SCHEMA, index: actionIndeces[i] }
            );
            for(let g = 0; g < newState.playlistSchemas.length; g++) {
                expect(newState.playlistSchemas[g]).toEqual(expectedOutcomes[i][g]);
            }
            expect(newState.playlistSchemas.length).toEqual(expectedOutcomes[i].length);
            expect(newState.playlistSchemasDirty).toBe(true);
        }
    });

    test("saving playlist schemas sets playlistSchemasDirty to false", () => {
        const action = {
            type: SAVE_PLAYLIST_SCHEMAS,
        };
        expect(reducer({ playlistSchemasDirty: false }, action).playlistSchemasDirty).toBe(false);
        expect(reducer({ playlistSchemasDirty: true }, action).playlistSchemasDirty).toBe(false);

    });
});

describe("auth reducers", () => {

    test("state.auth properly set", () => {
        const makeAction = (auth) => ({
            type: OBTAIN_AUTH,
            auth,
        });
        expect(reducer({}, makeAction(null)).auth).toEqual(null);
        expect(reducer({ auth: "hello" }, makeAction(false)).auth).toEqual(false);
        const testAuth = {
            b: "whoa",
        };
        expect(reducer({ auth: { a: "wow" } }, makeAction(testAuth)).auth).toBe(testAuth);
    });
});