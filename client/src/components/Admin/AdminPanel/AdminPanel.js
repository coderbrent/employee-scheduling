import React, { useState } from "react";
import "./AdminPanel.css";
import AddUser from './AddUser/AddUser'
import UserList from './UserListView/UserList'

const AdminPanel = () => {
  const [cal, setCal] = useState(false);

  // It would be cool to put this into a little table header arrow button
  // const sortByLastName = () => {
  //   users.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
  //   setUsers(users);
  //   console.log(users);
  // };

  const showCal = () => {
    cal ? setCal(false) : setCal(true)    
  }
  
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <AddUser />
          </div>
          <div className="col-lg-9 mt-4">
            <UserList />
          </div>  
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
