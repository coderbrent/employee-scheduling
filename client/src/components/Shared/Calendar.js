import React, { Component } from "react";
import { LinkedCalendar } from "rb-datepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

export default class Calendar extends Component {

  state = {
    date: ""
  };

  constructor(props) {
    super(props)
    this.state = {
      date: ''
    }
  };

  onDatesChange = ({ startDate, endDate }) => {
    console.log({ startDate, endDate });
  }

  render() {
    return (
      <LinkedCalendar onDatesChange={this.onDatesChange} showDropdowns={true} />
    );
  }
}
