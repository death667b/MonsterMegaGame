import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Factions from "./pages/Factions";
import Bestiary from "./pages/Bestiary";
import Lore from "./pages/Lore";
import GameRules from "./pages/GameRules";

import NotFound from "./pages/NotFound";


class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect from="/home" to="/" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/factions" component={Factions} />
            <Route exact path="/bestiary" component={Bestiary} />
            <Route exact path="/lore" component={Lore} />
            <Route exact path="/gamerules" component={GameRules} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
