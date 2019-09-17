import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  // method will search for specified street or address
  handleSubmit = () => {};
  render() {
    return (
      <div className="search">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="searchForm">
            <Col sm="10">
              <Form.Control className="seach-form" type="text" placeholder="Enter street..." />
            </Col>
            <Col sm="2">
              <Button variant="primary" type="submit" className="search-btn">
                <FontAwesomeIcon icon={faSearch} className="seach-icon" />
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Search;
