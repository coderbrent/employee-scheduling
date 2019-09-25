import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import Calendar from '../../Shared/Calendar'
import { Button } from 'reactstrap'

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [cal, setCal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/db/users");
      const json = await res.json();
      setUsers(json);
    };
    fetchUsers();
  }, []);

  // It would be cool to put this into a little table header arrow button
  // const sortByLastName = () => {
  //   users.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
  //   setUsers(users);
  //   console.log(users);
  // };

  const showCal = () => {
    cal ? setCal(false) : setCal(true)    
  }
  
  function deleteUser(id) {
    fetch(`/db/users/deleteById/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userid: id })
    }).then(res => res.json());
  }

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
    <>
      <div className="container d-inline-flex">
        <div className="row">
          <div className="col-sm-3">
            <div className="card admin-card  mt-4">
              <div
                className="card-header"
                style={{ backgroundColor: "indigo", color: "lightpink" }}
              >
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
                  <button onClick={() => newUser()} className="btn btn-primary">
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-9 mt-3 employee-card">
            <div
              className="card-header"
              style={{ backgroundColor: "darkblue", color: "whitesmoke" }}
            >
              <h3 style={{ fontWeight: "bolder" }}>Employee List</h3>
              <small>Employee Count: {users.length}</small>
            </div>
            <table className="table">
              <thead style={{ backgroundColor: "#444", color: "white" }}>
                <tr>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">E-Mail</th>
                  <th scope="col">Actions</th>
                  <th scope="col" />
                </tr>
              </thead>
              {users.map(user => (
                <tbody key={user._id} style={{ backgroundColor: "white" }}>
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      <a href={user.email}>{user.email}</a>
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm">View</button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>      
          </div>
        </div>
      </div>
      <Button onClick={() => showCal()}>Show Calendar</Button>
      { cal ? <Calendar /> : null }
    </>
  );
};

export default AdminPanel;
