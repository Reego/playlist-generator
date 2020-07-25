import React from "react";

import "./layout.css";

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <header>
                <h1>Music Sorter</h1>
            </header>
            { children }
        </React.Fragment>
    );
};

export default Layout;