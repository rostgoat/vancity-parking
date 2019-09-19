import React from "react";
import "./App.css";
import Map from "./components/Map/Map";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import SideBar from "./components/SideBar";
import { Container, Row, Col } from "react-bootstrap";

class App extends React.Component {
  getSearchedValue = data => {
    console.log("data :", data);
  };
  render() {
    return (
      <div>
        <Nav></Nav>
        <Search searchedCallBack={this.getSearchedValue} />
        <Map></Map>
        <SideBar></SideBar>
      </div>
    );
  }
}
export default App;
