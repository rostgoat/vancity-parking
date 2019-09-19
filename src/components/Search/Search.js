import React, { Component } from "react";
import { Form, Button, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class Search extends Component {
  state = {
    searchedValue: ""
  };

  async componentDidMount() {
    const res = await axios.get(
      "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&facet=geo_local_area&refine.geo_local_area=Hastings-Sunrise"
    );
    console.log("res :", res);
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.searchedValue);

    if (this.state.searchedValue.includes("Hastings")) {
      this.props.searchedCallBack(this.state.searchedValue);
    }
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
                placeholder="Enter street..."
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
