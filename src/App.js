import React from 'react';
import './App.css';
import Map from './components/Map'
import Nav from './components/Nav'
import Search from './components/Search'
import SideBar from './components/SideBar'

class App extends React.Component {
  render () {
    return (
      <div>
        <Nav></Nav>
        <Map></Map>
        <Search></Search>
        <SideBar></SideBar>
      </div>
    )
  }
}
export default App;
