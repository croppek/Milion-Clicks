import React from "react";

import Search from "../containers/Search";

// Główny "wrapper" całej aplikacji
export default class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Search />
            </div>
        );
    }
}