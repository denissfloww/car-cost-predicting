import React, { Fragment } from 'react';
import './App.css';
import { useBodyStyles } from './styles/styles';
import Navbar from './components/Navbar';
import Routers from './Routers';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    const classes = useBodyStyles()();

    return (
        <Router>
            <Fragment>
                <div className={classes.root}>
                    <Navbar />
                    <Routers />
                </div>
            </Fragment>
        </Router>
    );
};

export default App;
