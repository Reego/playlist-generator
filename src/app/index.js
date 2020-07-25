import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

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
} from "./actions";

import style from "./style.module.css";

function newEmptyPlaylist() {
    return {
        name: "New Playlist",
        tempo: ".5",
    };
}

const Genres = () => {
    return (
        <div></div>
    );
};

const Constraint = ({ label, min, max, step, initialValue, onChange }) => {
    return (
        <p>
            <label>{ label }</label><input type="number" min={ min } max={ max } step={ step } onChange={ onChange }/>
        </p>
    );
};

const Playlist = ({ playlistIndex, playlistSchema, onDelete }) => {

    const [ folded, setFolded ] = useState(true);
    const playlistName = playlistSchema.name;

    const dispatch = useDispatch();

    const onChangeSchema = (modifiedPlaylistSchema) => {
        dispatch(modifyPlaylistSchema(modifiedPlaylistSchema, playlistIndex));
    };

    const onDeletePlaylistSchema = () => {
        dispatch(removePlaylistSchema(playlistIndex));
    }

    const onChangePlaylistName = (e) => {
        onChangeSchema(Object.assign({}, playlistSchema, {
            name: e.target.value,
        }));
    };

    const onChangeConstraint = (e, constraintKey) => {
        onChangeSchema(Object.assign({}, playlistSchema, {
            [constraintKey]: e.target.value,
        }));
    };

    return (
        <div className={ style.playlistSlot }>
            <h4>{ playlistName }</h4>
            <input name="playlistName" type="text" initialValue={ playlistName } placeholder={ "Playlist name" } onChange={ onChangePlaylistName }/>
            <Genres/>
            <Constraint label={ "tempo" } min={ 0 } max={ 1 } step={ .01 } onChange={ (e) => onChangeSchema(e, "tempo") }/>
            <div className={ style.button } onClick={ onDeletePlaylistSchema }>Delete</div>
        </div>
    );
};

const Playlists = () => {

    const playlistSchemas = useSelector((state) => state.playlistSchemas) || [];
    const dispatch = useDispatch();

    const onAddPlaylist = () => {
        dispatch(addPlaylistSchema(newEmptyPlaylist()));
    };

    const playlistComponents = [];
    for(let i = 0; i < playlistSchemas.length; i++) {
        let g = i;
        playlistComponents.push(
            <Playlist key={ i } playlistIndex={ i } playlistSchema={ playlistSchemas[i] }/>
        );
    }

    return (
        <React.Fragment>
            <div>
                { playlistComponents }
            </div>
            <div className={ style.button } onClick={ onAddPlaylist }>New Playlist</div>
        </React.Fragment>
    );
};

const Generation = () => {
    return (
        <h1></h1>
    );
};

const App = () => {
    return (
        <React.Fragment>
            <br/>
            <br/>
            <h3>User: Reego</h3>
            <h3>Tracks Loaded</h3>
            <Playlists/>
            <Generation/>
            <h3>NOTE: Songs are only added in chunks, so be patient and let the process finish.</h3>
        </React.Fragment>
    );
};

export default App;