import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "./app/reducers";

import Layout from "./common/layout";
import Home from "./home/index";
import ShufflerApp from "./app/index";

const store = createStore(reducer);

const App = () => (
    <Provider store={ store }>
        <Router>
            <Layout>
                <Switch>
                    <Route path="/user"><ShufflerApp/></Route>
                    <Route><Home/></Route>
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;
