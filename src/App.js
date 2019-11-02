import React from "react";
import "./App.scss";
import Map from "./components/Map/Map";
import Search from "./components/Search/Search";
import SideBar from "./components/SideBar/SideBar";
import areas from "./data/areas";
import { fetchAreas } from "./actions/areaActions";
import { setSearchResponse } from "./actions/searchActions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  areas: state.areas,
  searchedResponse: state.searchResponse
});

class App extends React.Component {
  state = {
    searchedValue: "",
    searchedResponse: null,
  };

  async componentDidMount() {
    const areas = await this.props.fetchAreas();
    await this.props.setSearchResponse(areas)
    // await this.setState({
    //   searchedResponse: areas
    // });
  }

  onSendMarkerInfoToParent = e => {
    console.log("parent", e);
  };

  /**
   * Function handles form submit in Search component and passes data to Map component
   */
  handleSubmit = e => {
    e.preventDefault();
    areas.forEach(async area => {
      if (area.includes(this.state.searchedValue)) {
        const areas = await this.props.fetchAreas(area);
        this.setState({
          searchedResponse: areas
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
        <Map searchedResponse={this.state.searchedResponse} onSendMarkerInfoToParent={this.onSendMarkerInfoToParent} />
        <SideBar searchedResponse={this.state.searchedResponse} />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  { fetchAreas, setSearchResponse }
)(App);
