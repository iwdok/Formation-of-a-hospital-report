import React, { Component }  from "react";
import { Router, Route }     from "react-router-dom";
import { createHashHistory } from 'history';
import { inject, observer }  from "mobx-react";
import Main                  from "./Main";
import '../styles/App.scss';

@inject('mainStore') @observer
class App extends Component {

    constructor(props){
        super(props);
        this.store = this.props.mainStore;
        this.history = createHashHistory();
    }

    render() {
        return (
            <Router history={createHashHistory()}>
                <div className="container">
                    <Route path="/" exact component={Main}/>
                </div>
            </Router>
        );
    }
}

export default App;