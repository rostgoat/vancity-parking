import React, { Component } from "react";
import "./SideBar.scss";

class SideBar extends Component {
  render() {
    const data = this.props.searchedResponse;
    console.log("data", data);
    const sidebarItems = data
      ? data.data.records.map(item => (
          <div className="sidebar-item" key={item.recordid}>
            {item.fields.meterid}
          </div>
        ))
      : null;
    return <div className="sidebar">{sidebarItems}</div>;
  }
}

export default SideBar;
