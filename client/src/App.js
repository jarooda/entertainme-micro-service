import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Movies, Home, Series, MovieDetail, SerialDetail } from './pages'
import { Navbar } from './components'

function App() {
  return (
    <React.Fragment>
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
      </Switch>
    </React.Fragment>
  );
}

export default App;
