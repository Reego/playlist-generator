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
} from "../../src/app/actionTypes";

import reducer from "../../src/app/reducers";

describe("UI reducers", () => {

    test("inactive button block counter increments", () => {
        for(let initialButtonsBlockCounter of [0, undefined, 3]) {
            const initialPracticalValue = initialButtonsBlockCounter || 0;
            let state = {
                buttonsBlockCounter: initialButtonsBlockCounter;
            };
            for(let i = 0; i < 100; i++) {
                state = reducer(state, {
                    type: BUTTONS_BLOCK,
                });
                expect(state.buttonsBlockCounter).toEqual(initialPracticalValue + i);
            }
        }
    });

    test("inactive button block counter decrements", () => {
        let state = {};

        for(let initialButtonsBlockCounter of [0, undefined, -6]) {
            const initialPracticalValue = initialButtonsBlockCounter || 0;
            let state = {
                buttonsBlockCounter: initialButtonsBlockCounter;
            };
            for(let i = 0; i < 100; i++) {
                state = reducer(state, {
                    type: BUTTONS_UNBLOCK,
                });
                expect(state.buttonsBlockCounter).toEqual(initialPracticalValue - i);
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

    const makeAction = (content) => {
        type: SET_POPUP,
        content,
    };

    test("popup sets content", () => {
        const contentList = ["hello", "hello there", "hello there", "OBIWAN KENOBI", "ok", "", "lol"];
        for(let content of contentList) {
            expect(reducer(state, makeAction(content)));
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
            const g = i * 4;
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
            const g = i * 4;
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
            const g = i * 4;
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
            const g = i * 4;
            const newState = reducer({
                popup: stateOutcomePairs[g],
                buttonsBlockCounter: stateOutcomePairs[g + 1],
            }, makeAction(actionContent[i]));
            expect(newState.buttonsBlockCounter).toEqual(stateOutcomePairs[g + 2]);
        }
    });
});

describe("song state reducers", () => {

});

describe("playlist schema reducers", () => {

});

describe("auth reducers", () => {

});