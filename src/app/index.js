import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputNumber from "rc-input-number";

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

const minTempo = 0;
const maxTempo = 300;
const minYear = 0;
const maxYear = new Date().getFullYear();

function newEmptyPlaylist() {
    return {
        name: "New Playlist",
        genres: [],
        year: [0, maxYear],
        acousticness: [0, 1],
        danceability: [0, 1],
        energy: [0, 1],
        instrumentalness: [0, 1],
        valence: [0, 1],
        tempo: [0, 300],
        dateKey: new Date().getTime(),
    };
}

const Genres = () => {
    return (
        <div></div>
    );
};

const Constraint = ({ label, bounds, min="0", max="1", step=".01", onChange }) => {
    const lowerCaseLabel = label.toLowerCase();
    return (
        <div className={ style.constraintSlot }>
            <h4 className={ style.constraintLabel }>{ label }</h4>
            <br className={ style.constraintLabelBreak }/>
            <label className={ style.boundsLabel }>Min</label><InputNumber value={ bounds[0] } min={ min } max={ bounds[1] } step={ step } onChange={ (value) => onChange(value, 0, lowerCaseLabel) }/>
            <label className={ style.boundsLabel + " " + style.maxBoundsLabel}>Max</label><InputNumber value={ bounds[1] } min={ bounds[0] } max={ max } step={ step } onChange={ (value) => onChange(value, 1, lowerCaseLabel) }/>
        </div>
    );
};

const Playlist = ({ playlistIndex, playlistSchema, folded, setFoldedKey, onDelete }) => {

    const playlistName = playlistSchema.name;

    const dispatch = useDispatch();

    const onToggle = () => setFoldedKey((!folded) ? null : playlistSchema.dateKey);

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

    const onChangeConstraint = (value, minOrMax, constraintKey) => {
        const modifiedBounds = [...playlistSchema[constraintKey]];
        modifiedBounds[minOrMax] = value;
        onChangeSchema(Object.assign({}, playlistSchema, {
            [constraintKey]: modifiedBounds,
        }));
    };

    const stdSongFeatureRange = {
        min: 0,
        max: 1,
        step: .01,
    };

    return (
        <div className={ style.playlistSlot }>
            <h4 onClick={ onToggle }>{ playlistName || "New Playlist" }</h4>
            { !folded && (
                <React.Fragment>
                <input className={ style.playlistName } name="playlistName" type="text" value={ playlistName } placeholder={ "New Playlist" } onChange={ onChangePlaylistName }/>
                <Genres/>
                <Constraint label={ "Year" }
                    bounds={ playlistSchema.year }
                    min={ minYear } max={ maxYear } step={ 1 }
                    onChange={ onChangeConstraint }/>
                <Constraint label={ "Acousticness" }
                    bounds={ playlistSchema.acousticness }
                    onChange={ onChangeConstraint }/>
                <Constraint label={ "Danceability" }
                    bounds={ playlistSchema.danceability }
                    onChange={ onChangeConstraint }/>
                <Constraint label={ "Energy" }
                    bounds={ playlistSchema.energy }
                    onChange={ onChangeConstraint }/>
                <Constraint label={ "Instrumentalness" }
                    bounds={ playlistSchema.instrumentalness }
                    onChange={ onChangeConstraint }/>
                <Constraint label={ "Valence" }
                    bounds={ playlistSchema.valence } 
                    onChange={ onChangeConstraint }/>
                <Constraint label={ "Tempo" }
                    bounds={ playlistSchema.tempo }
                    min={ minTempo } max={ maxTempo } step={ 1 }
                    onChange={ onChangeConstraint }/>
                <div className={ style.button } onClick={ onDeletePlaylistSchema }>Delete</div>
                </React.Fragment>
            ) }
        </div>
    );
};

const Playlists = () => {

    const playlistSchemas = useSelector((state) => state.playlistSchemas) || [];
    const dispatch = useDispatch();

    const [ foldedKey, setFoldedKey ] = useState(null);

    const onAddPlaylist = () => {
        dispatch(addPlaylistSchema(newEmptyPlaylist()));
    };

    const playlistComponents = [];
    for(let i = 0; i < playlistSchemas.length; i++) {
        let g = i;
        playlistComponents.push(
            <Playlist key={ playlistSchemas[i].dateKey } playlistIndex={ i } playlistSchema={ playlistSchemas[i] } folded={ foldedKey !== playlistSchemas[g].dateKey } setFoldedKey={ setFoldedKey }/>
        );
    }

    return (
        <React.Fragment>
            <div className={ style.playlistsWrap }>
                { playlistComponents }
            </div>
            <div className={ style.button + " " + style.newPlaylistButton } onClick={ onAddPlaylist }>Create Playlist</div>
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
        <div className={ style.appWrap }>
            <h3 className={ style.userInfo + " " + style.infoTitle}>User: Reego</h3>
            <h3 className={ style.tracksLoaded + " " + style.infoTitle}>Tracks Loaded</h3>
            <br/>
            <br/>
            <Playlists/>
            <Generation/>
            <h3 className={ style.chunkWarning + " " + style.infoTitle}>NOTE: Songs are only added in chunks, so be patient and let the process finish.</h3>
        </div>
        </React.Fragment>
    );
};

export default App;