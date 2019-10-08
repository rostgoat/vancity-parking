import React from "react";
import "./App.scss";
import Map from "./components/Map/Map";
import Search from "./components/Search/Search";
import SideBar from "./components/SideBar/SideBar";
import axios from "axios";
import areas from "./data/areas";

class App extends React.Component {
  state = {
    searchedValue: "",
    searchedResponse: null,
    defaultArea: "Hastings-Sunrise"
  };
  async componentDidMount() {
    const res = await axios.get(
      `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&rows=45&facet=geo_local_area&refine.geo_local_area=${this.state.defaultArea}`
    );
    await this.setState({
      searchedResponse: res
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    areas.forEach(async area => {
      if (area.includes(this.state.searchedValue)) {
        const res = await axios.get(
          `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&rows=145&facet=geo_local_area&refine.geo_local_area=${area}`
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
    console.log("this.state.searchedResponse", this.state.searchedResponse);
    return (
      <div>
        <Search
          searchedValue={this.state.searchedValue}
          handleSubmit={this.handleSubmit}
          onSearchedInputChange={this.onSearchedInputChange}
        />
        <Map searchedResponse={this.state.searchedResponse} />
        <SideBar searchedResponse={this.state.searchedResponse}></SideBar>
      </div>
    );
  }
}
export default App;
