import React, { Component } from "react";
import { LinkedCalendar } from "rb-datepicker";
import "./Calendar.css";

export default class Calendar extends Component {
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
      <LinkedCalendar
        onDatesChange={this.onDatesChange}
        showDropdowns={true}
      />
    );
  }
}
