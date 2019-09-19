import React, { Component } from "react";
import { Form, Button, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  // method will search for specified street or address
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked submit')
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
              <Form.Control className="search-input" type="text" placeholder="Enter street..." />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Search;
