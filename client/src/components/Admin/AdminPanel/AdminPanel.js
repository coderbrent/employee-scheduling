import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import Calendar from '../../Shared/Calendar'
import { Button } from 'reactstrap'
import AddUser from './AddUser/AddUser'

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

  return (
    <>
      <div className="container d-inline-flex">
        <div className="row">
          <div className="col-sm-3">
            <AddUser />
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
              { users.map(user => (
                <tbody key={user._id} style={{ backgroundColor: "white" }}>
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      <a href={user.email}>{user.email}</a>
                    </td>
                    <td>
                      <Button>Schedule</Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteUser(user._id)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>      
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
