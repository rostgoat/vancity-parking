import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class Search extends Component {
  state = {
    searchedValue: "",
    areas: [
      "Downtown",
      "Fairview",
      "West End",
      "Kitsilano",
      "Mount Pleasant",
      "Strathcona",
      "Grandview-Woodland",
      "Riley Park",
      "West Point Grey",
      "Arbutus-Ridge",
      "Kerrisdale",
      "South Cambie",
      "Kensington-Cedar Cottage",
      "Renfrew-Collingwood",
      "Killarney",
      "Shaughnessy",
      "Hastings-Sunrise"
    ]
  };

  handleSubmit = e => {
    e.preventDefault();

    this.state.areas.forEach(async area => {
      if (area.includes(this.state.searchedValue)) {
        const res = await axios.get(
          `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&facet=geo_local_area&refine.geo_local_area=${area}`
        );
        this.props.searchedCallBack(res);
        this.setState({
          searchedValue: ""
        });
      }
    });
  };

  handleSearch = e => {
    this.setState({
      searchedValue: e.target.value
    });
  };

  render() {
    return (
      <div className="search">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="searchForm" className="search-form">
            <InputGroup>
              <InputGroup.Prepend>
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </InputGroup.Prepend>
              <Form.Control
                className="search-input"
                type="text"
                placeholder="Enter street or area..."
                value={this.state.searchedValue}
                name="search"
                onChange={this.handleSearch}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Search;
