import React, { Component } from "react";
import "./SideBar.scss";
import { FaCcVisa, FaCoins } from "react-icons/fa";

class SideBar extends Component {
  render() {
    const data = this.props.searchedResponse;
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
                <div className="sidebar-item__info-time-rates--row">
                  <div className="sidebar-item__info-time-rates--col">Mon - Fri</div>
                  <div className="sidebar-item__info-time-rates--col">9:00am - 6:00pm</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.t_mf_9a_6p}</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.r_mf_9a_6p}</div>
                </div>
                <div className="sidebar-item__info-time-rates--row">
                  <div className="sidebar-item__info-time-rates--col">Mon - Fri</div>
                  <div className="sidebar-item__info-time-rates--col">6:00am - 10:00pm</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.t_mf_6p_10}</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.r_mf_6p_10}</div>
                </div>

                <div className="sidebar-item__info-time-rates--row">
                  <div className="sidebar-item__info-time-rates--col">Sat</div>
                  <div className="sidebar-item__info-time-rates--col">9:00am - 6:00pm</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.t_sa_9a_6p}</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.r_sa_9a_6p}</div>
                </div>
                <div className="sidebar-item__info-time-rates--row">
                  <div className="sidebar-item__info-time-rates--col">Sat</div>
                  <div className="sidebar-item__info-time-rates--col">6:00am - 10:00pm</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.t_sa_6p_10}</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.r_sa_6p_10}</div>
                </div>

                <div className="sidebar-item__info-time-rates--row">
                  <div className="sidebar-item__info-time-rates--col">Sun</div>
                  <div className="sidebar-item__info-time-rates--col">9:00am - 6:00pm</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.t_su_9a_6p}</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.r_su_9a_6p}</div>
                </div>
                <div className="sidebar-item__info-time-rates--row">
                  <div className="sidebar-item__info-time-rates--col">Sun</div>
                  <div className="sidebar-item__info-time-rates--col">6:00am - 10:00pm</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.t_su_6p_10}</div>
                  <div className="sidebar-item__info-time-rates--col">{item.fields.r_su_6p_10}</div>
                </div>
              </div>
            </div>
          </div>
        ))
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

export default SideBar;
