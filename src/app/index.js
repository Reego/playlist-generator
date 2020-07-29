import React, { useState, useEffect } from "react";
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
    savePlaylistSchemas,
    obtainAuth,
} from "./ducks/actions";

import {
    generatePlaylists,
    loadPlaylistSchemasFromLocalStorage,
    savePlaylistSchemasToLocalStorage,
} from "./playlists";

import {
    loadSongsFromFile,
    loadSongsFromLocalStorage,
} from "./songs";

import style from "./style.module.css";

const minTempo = 0;
const maxTempo = 300;
const minYear = 0;
const maxYear = new Date().getFullYear();

const Popup = () => {
    const popupContent = useSelector((state) => state.popup);
    const dispatch = useDispatch();

    const onClosePopup = () => {
        if(popupContent) {
            dispatch(setPopup());
        }
    };

    if(popupContent) {
        return (
        <div className={ style.popupOverlay }>
            <div className={ style.popupBox }>
                <h2>{ popupContent }</h2>
                <div onClick={ onClosePopup }>OK</div>
            </div>
        </div>
        );
    }

    return null;
};

const SongsInterface = () => {
    const buttonsBlockCounter = useSelector((state) => state.buttonsBlockCounter) || 0;
    const dispatch = useDispatch();

    const onChangeFileField = (e) => {
        const file = e.files[e.files.length() - 1];
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const loadedSongs = loadSongsFromFile(e.target.value);
                dispatch(loadSongs(loadedSongs));
            };
            reader.onerror = (err) => {
                console.err(err);
                dispatch(setPopup("Uh oh, something went wrong..."));
            };
            reader.readAsText(file);
        }
        else
        {
            console.log("Something went wrong...");
        }
    };

    const onResetLoadedSongs = (e) => {
        dispatch(setPopup("Songs have been reset."));
        dispatch(resetLoadedSongs());
    };

    return (
        <React.Fragment>
            <label>Upload Songs</label><input type="file" onChange={ onChangeFileField }/>
            <h3>Copy and paste the contents of a playlist or your Library into a text file. Then, upload that text file.</h3>
            <br/>
            { buttonsBlockCounter <= 0 &&
                <div className={ style.button + " " + style.resetLoadedSongsButton } onClick={ onResetLoadedSongs }>Reset Loaded Songs</div>
            }
        </React.Fragment>
    );
};

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

const Playlist = ({ playlistIndex, playlistSchema, folded, setFoldedKey, onDelete, buttonsBlockCounter }) => {

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
                { buttonsBlockCounter <= 0 &&
                    <div className={ style.button } onClick={ onDeletePlaylistSchema }>Delete</div>
                }
                </React.Fragment>
            ) }
        </div>
    );
};

const Playlists = () => {

    const playlistSchemas = useSelector((state) => state.playlistSchemas) || [];
    const buttonsBlockCounter = useSelector((state) => state.buttonsBlockCounter) || 0;
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
            { buttonsBlockCounter <= 0 &&
                <div className={ style.button + " " + style.newPlaylistButton } onClick={ onAddPlaylist }>Create Playlist</div>
            }
        </React.Fragment>
    );
};

const generatePlaylists = async (dispatch) => {
    setTimeout(() => { dispatch(progressPlaylistGeneration(100)); }, 500);
};

const Generation = () => {
    const playlistGenerationProgress = useSelector((state) => state.playlistGenerationProgress);
    const buttonsBlockCounter = useSelector((state) => state.buttonsBlockCounter) || 0;

    const playlistSchemas = useSelector((state) => state.playlistSchemas);
    const songs = useSelector((state) => state.songs);

    const dispatch = useDispatch();

    const onStartGeneratePlaylists = () => {
        const songsLength = songs.length;
        dispatch(progressPlaylistGeneration(0));
        generatePlaylists(playlistSchemas, songs, (songIndex) => {
            dispatch(progressPlaylistGeneration(Math.floor(songIndex / songsLength * 100)));
        });
    };

    if(buttonsBlockCounter <= 0 && (playlistGenerationProgress === undefined || playlistGenerationProgress < 0)) { /// Not generating
        return (
            <div className={ style.button + " " + style.generatePlaylistsButton } onClick={ onStartGeneratePlaylists }>Generate Playlists</div>
        );
    }
    else {
        return (
            <React.Fragment>
                <br/>
                <h3>Generating...</h3>
                <br/>
                <div className={ style.generationProgressBar }>
                    <div style={{ width: playlistGenerationProgress + "%" }}></div>
                </div>
                <br/>
            </React.Fragment>
        );
    }
};

function loadPlaylistSchemas(dispatch) {

}

function loadSongs() {

}

const App = () => {
    const playlistSchemas = useSelector((state) => state.playlistSchemas);
    const playlistSchemasDirty = useSelector((state) => state.playlistSchemasDirty);
    const dispatch = useDispatch(dispatch);

    useEffect(() => {
        loadPlaylistSchemasFromLocalStorage(dispatch);
        loadSongsFromLocalStorage(dispatch);
    }, []);

    if(playlistSchemasDirty) {
        savePlaylistSchemasToLocalStorage(playlistSchemas);
        dispatch(savePlaylistSchemas());
    }

    return (
        <React.Fragment>
        <Popup/>
        <div className={ style.appWrap }>
            <h3 className={ style.userInfo + " " + style.infoTitle}>User: Reego</h3>
            <br/>
            <h3 className={ style.tracksLoaded + " " + style.infoTitle}>Tracks Loaded</h3>
            <br/>
            <SongsInterface/>
            <br/>
            <br/>
            <Playlists/>
            <Generation/>
            <h3 className={ style.chunkWarning + " " + style.infoTitle}><strong>NOTE:</strong> Songs are only added in chunks, so be patient and let the process finish before closing this page.</h3>
        </div>
        </React.Fragment>
    );
};

export default App;