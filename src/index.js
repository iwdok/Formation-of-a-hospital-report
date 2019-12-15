import React             from "react";
import ReactDOM          from "react-dom";
import App               from "./components/App.js";
import { Provider }      from 'mobx-react';
import MainStore         from './stores/MainStore';

const Root = (
    <Provider
        mainStore={MainStore}
    >
        <App/>
    </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));