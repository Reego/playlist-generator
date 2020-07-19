import {
    OPEN_POPUP,
    CLOSE_POPUP,
} from "./actionTypes";

const openPopup = (state, content) => ({
    type: OPEN_POPUP,
    content,
});

const closePopup = () => ({
    type: CLOSE_POPUP
});