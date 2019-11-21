import React, { Component } from "react";
import "./SideBar.scss";
import { FaCcVisa, FaCoins } from "react-icons/fa";
import { connect } from "react-redux";
import { rateTimeCalc } from "../../utils/utils";

class SideBar extends Component {
  render() {
    const { areas } = this.props.areas;
    console.log(
      "areas && areas.data && areas.data.records",
      areas && areas.data && areas.data.records ? rateTimeCalc(areas.data.records[0]) : null
    );
    const sidebarItems =
      areas && areas.data && areas.data.records
        ? areas.data.records.map(item => {
            console.log("item", item);
            item = rateTimeCalc(item);
            return (
              <div className="sidebar-item" key={item.recordid}>
                <div className="sidebar-item__header">
                  <div className="sidebar-item__header--item">{item.area}</div>
                </div>
                <div className="sidebar-item__info">
                  <div className="sidebar-item__info-basic">
                    <div className="sidebar-item__info-basic--left sidebar-item__info-basic--meter">
                      {item.pay_phone}
                    </div>
                  </div>
                  <div className="sidebar-item__info-time-rates">
                    <div className="sidebar-item__info-time-rates--row">{item.day}</div>
                    <div className="sidebar-item__info-time-rates--row">
                      <div className="sidebar-item__info-time-rates--col">9:00am - 6:00pm</div>
                    </div>
                    <div className="sidebar-item__info-time-rates--row">
                      <div className="sidebar-item__info-time-rates--col">{item.rate_per_hour}</div>/
                      <div className="sidebar-item__info-time-rates--col">{item.length_of_stay}</div>
                    </div>
                  </div>
                </div>
                <div className="sidebar-item__footer">
                  <div className="sidebar-item__footer--item">
                    {item.creditcard.includes("Yes") ? (
                      <div>
                        <FaCcVisa size="2em" className="sidebar-item__footer--item-payment" />
                        <FaCoins size="1.5em" className="sidebar-item__footer--item-payment" />
                      </div>
                    ) : (
                      <FaCoins size="2em" className="sidebar-item__footer--item-payment" />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : null;
    return (
      <div className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-list">{sidebarItems}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    areas: state.areas
  };
};

export default connect(mapStateToProps)(SideBar);
