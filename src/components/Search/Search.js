import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Search.scss";

class Search extends Component {
  // method will search for specified street or address
  handleSubmit = () => {};
  render() {
    return (
      <div className="search">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="searchForm">
            <Form.Control className="seach-form" type="text" placeholder="Enter street..." />
            <Button variant="primary" type="submit" className="search-btn">
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Search;
