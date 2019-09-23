import React from "react";
import "./App.css";
import Map from "./components/Map/Map";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import SideBar from "./components/SideBar";
import axios from "axios";
import areas from "./data/areas";

class App extends React.Component {
  state = {
    searchedValue: "",
    searchedResponse: null
  };

  handleSubmit = e => {
    e.preventDefault();
    areas.forEach(async area => {
      if (area.includes(this.state.searchedValue)) {
        const res = await axios.get(
          `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&facet=geo_local_area&refine.geo_local_area=${area}`
        );
        this.setState({
          searchedResponse: res
        });
      }
    });
  };

  onSearchedInputChange = searchedValue => {
    this.setState({
      searchedValue: searchedValue
    });
  };

  render() {
    return (
      <div>
        {/* <Nav></Nav> */}
        <Search
          searchedValue={this.state.searchedValue}
          handleSubmit={this.handleSubmit}
          onSearchedInputChange={this.onSearchedInputChange}
        />
        <Map searchedResponse={this.state.searchedResponse} />
        {/* <SideBar></SideBar> */}
      </div>
    );
  }
}
export default App;
