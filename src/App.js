import React from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "./reducers";

const store = createStore(reducer);

const App = () => {
    <Provider store={ store }>
        <Switch>
            <Route path="/user"><App/></Route>
            <Route path="/about"><About/></Route>
            <Route><Home/></Route>
        </Switch>
    </Provider>
}

export default App;
