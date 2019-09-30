import React from "react";
import { Button } from 'reactstrap'

export default function AddUser() {

  function newUser() {
    let fName = document.getElementById("clientFName").value;
    let lName = document.getElementById("clientLName").value;
    let email = document.getElementById("clientEmail").value;
  
    fetch("/db/users/newuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: fName,
        lastName: lName,
        email: email
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  return (
    <div className="card admin-card mt-4">
      <div
        className="card-header"
        style={{ backgroundColor: "indigo", color: "lightpink" }} >
          <h4>Admin Panel</h4>
      </div>
        <div className="card-body">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="name"
              id="clientFName"
              className="form-control mb-2"
              placeholder="First Name"
            />
            <label>Last Name</label>
            <input
              type="name"
              id="clientLName"
              className="form-control mb-2"
              placeholder="Last Name"
            />
            <label>E-Mail Address</label>
            <input
              type="email"
              id="clientEmail"
              className="form-control mb-2"
              placeholder="Enter E-Mail Address"
              required={true}
            />
            <Button onClick={() => newUser()}>
              Add User
            </Button>
          </div>
        </div>
      </div>
        )
}