import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  handleSubmit = e => {
    this.props.handleSubmit(e);
  };

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.onSearchedInputChange(this.state.searchTerm);
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
                value={this.state.searchTerm}
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

export default Search;
