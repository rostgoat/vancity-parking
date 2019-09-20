import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  // pass callback to parent with searched field
  handleSearch = e => {
    this.props.onSearchedInputChange(e.target.value);
  };

  render() {
    const searchedValue = this.props.searchedValue;
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
                value={searchedValue}
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
