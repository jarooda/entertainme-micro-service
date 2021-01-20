import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Movies, Home, Series, MovieDetail, SerialDetail, Favorite } from './pages'
import { Navbar, PopUp } from './components'

function App() {
  return (
    <React.Fragment>
      <PopUp />
      <Navbar />
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/movies/:id">
          <MovieDetail />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/series/:id">
          <SerialDetail />
        </Route>
        <Route path="/series">
          <Series />
        </Route>
        <Route path="/favorites">
          <Favorite />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
