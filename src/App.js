import React from "react";
import "./App.css";
import Map from "./components/Map/Map";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search";
import SideBar from "./components/SideBar";
import { Container, Row, Col } from "react-bootstrap";

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav></Nav>
        <Map></Map>
        <Search></Search>
        <SideBar></SideBar>
      </div>
    );
  }
}
export default App;
