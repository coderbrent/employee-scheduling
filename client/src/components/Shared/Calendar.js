import React, { Component } from "react";
import { LinkedCalendar } from "rb-datepicker";
import "./Calendar.css";

export default class Calendar extends Component {

  state = {
    date: ''
  }

  onDatesChange = ({ startDate, endDate }) => {
    console.log({ startDate, endDate });
  };
  render() {
    return (
      <LinkedCalendar
        onDatesChange={this.onDatesChange}
        showDropdowns={true}
      />
    );
  }
}
