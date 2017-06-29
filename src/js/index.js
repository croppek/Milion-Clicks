import '../scss/main.scss';

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

// Główny komponen aplikacji
import App from "./components/App";
// Redux store
import store from "./store";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('app')
);