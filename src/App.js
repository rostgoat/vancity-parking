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
    const res = await this.apiCall(this.state.defaultArea, 50);
    await this.setState({
      searchedResponse: res
    });
  }

  /**
   * Function makes API call to retreive coordinates data for map
   *
   * @param {String} area - geographic area
   * @param {String} rowsAmt - amount of rows to return per area
   */
  async apiCall(area, rowsAmt) {
    return axios.get(
      `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&rows=${rowsAmt}&facet=geo_local_area&refine.geo_local_area=${area}`
    );
  }
  onSendMarkerInfoToParent = e => {
    console.log("parent");
  };

  /**
   * Function handles form submit in Search component and passes data to Map component
   */
  handleSubmit = e => {
    e.preventDefault();
    areas.forEach(async area => {
      if (area.includes(this.state.searchedValue)) {
        const res = await this.apiCall(area, 50);
        this.setState({
          searchedResponse: res
        });
      }
    });
  };

  /**
   * Function sets searched value in Search form to state
   */
  onSearchedInputChange = searchedValue => {
    this.setState({
      searchedValue: searchedValue
    });
  };

  render() {
    return (
      <div>
        <Search
          searchedValue={this.state.searchedValue}
          handleSubmit={this.handleSubmit}
          onSearchedInputChange={this.onSearchedInputChange}
        />
        <Map searchedResponse={this.state.searchedResponse} onSendMarkerInfoToParen={this.onSendMarkerInfoToParent} />
        <SideBar searchedResponse={this.state.searchedResponse}></SideBar>
      </div>
    );
  }
}
export default App;
