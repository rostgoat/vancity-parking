import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import "./Search.scss";
import areas from "../../data/areas";
import { fetchAreas } from "../../actions/areaActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  state = {
    searchedValue: ""
  };

  /**
   * Function handles form submit in Search component and passes data to Map component
   */
  handleSubmit = e => {
    e.preventDefault();
    console.log("this.state.searchedValue", this.state.searchedValue);
    areas.forEach(async area => {
      if (area.includes(this.state.searchedValue)) {
        await this.props.fetchAreas(area);
      }
    });
  };

  handleSearch = e => {
    this.setState({ searchedValue: e.target.value });
  };

  handleKeyPress = (e, searchedValue) => {
    if (e.key === "Enter") {
      this.setState({
        searchedValue: searchedValue
      });
    }
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
                defaultValue={this.state.searchedValue}
                name="search"
                onChange={this.handleSearch}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    areas: state.areas
  };
};

export default connect(
  mapStateToProps,
  { fetchAreas }
)(Search);
