import React, { useEffect, useState } from "react";
import { Table, Button, Card, Collapse } from 'reactstrap';
import CardHeader from "reactstrap/lib/CardHeader";
import './UserList.css'
            
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [collapse, isCollapsed] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/db/users");
      const json = await res.json();
      setUsers(json);
    };
    fetchUsers();
  }, []);

  function deleteUser(id) {
    fetch(`/db/users/deleteById/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userid: id })
    }).then(res => res.json()
    .then(setUsers(users)));
  }

  const toggle = () => {
    !collapse ? isCollapsed(true) : isCollapsed(false)
  }

  return (
    <>
    <Card>
      <CardHeader
        style={{ backgroundColor: "darkblue", color: "whitesmoke" }}
      >
        <h3 style={{ fontWeight: "bolder" }}>Employee List</h3>
        <small>Employee Count: {users.length}</small>
      </CardHeader>
      <Table hover>
        <thead style={{ backgroundColor: "#444", color: "white" }}>
          <tr>
            <th scope="col"> First </th>
            <th scope="col"> Last </th>
            <th scope="col"> E-Mail </th>
            <th scope="col"> Actions </th>
            <th scope="col" />
          </tr>
        </thead>
        { users.map(user => (
          <tbody key={user._id} style={{ backgroundColor: "white" }}>
            <tr>
              <td> {user.firstName} </td>
              <td> {user.lastName} </td>
              <td> <a href={user.email}>{user.email}</a> </td>
              <td>
                <Button color="warning" onClick={()=>toggle()}> Edit </Button>
                  <Collapse isOpen={collapse}>
                    Som - you need to put something here
                  </Collapse>
              </td>
              <td>
                <Button color="danger" onClick={() => deleteUser(user._id)}> Delete? </Button> 
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Card>
    </>
  )
};