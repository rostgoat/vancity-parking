import React, { Component } from "react";
import "./SideBar.scss";
import { FaCcVisa, FaCoins } from "react-icons/fa";

class SideBar extends Component {
  render() {
    const data = this.props.searchedResponse;
    console.log("data", data);
    const sidebarItems = data
      ? data.data.records.map(item => (
          <div className="sidebar-item" key={item.recordid}>
            <div className="sidebar-item__info">
              <div className="sidebar-item__info-basic">
                <div className="sidebar-item__info-basic--meter">{item.fields.pay_phone}</div>
                <div className="sidebar-item__info-basic--street">2800 Hastings</div>
                <div className="sidebar-item__info-basic--payment">
                  {item.fields.creditcard ? (
                    <div>
                      <FaCcVisa size="2em" /> / <FaCoins size="1.5em" />
                    </div>
                  ) : (
                    <FaCoins size="2em" />
                  )}
                </div>
              </div>
              <div className="sidebar-item__info-time-rates">
                <div className="sidebar-item__info-time-rates--meter">{item.fields.pay_phone}</div>
              </div>
            </div>
          </div>
        ))
      : null;
    return <div className="sidebar">{sidebarItems}</div>;
  }
}

export default SideBar;
