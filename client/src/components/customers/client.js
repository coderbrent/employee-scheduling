import React, { Component } from 'react';
import axios from 'axios'
import './customers.css';

class ClientList extends Component {
  state = {
    customer: []
  }

  deleteUser(id) {
    fetch(`/db/clients/deleteById/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid : id })
    })
      .then(res => res.json())
  };

  fetchClients = async() => { 
    const result = await axios.get('/db/clients');
    
    this.state.customer = { customer : result.data }
  }

  componentDidUpdate() {
    fetchClients();
  }
  
  newUser() {
    let fName = document.getElementById('clientFName').value;
    let lName = document.getElementById('clientLName').value;
    let email = document.getElementById('clientEmail').value;

    fetch('/db/clients/newclient', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        firstName: fName, 
        lastName: lName,
        email: email
      })
    }).then(res => res.json())
      .then(res => console.log(res));
  };
  
  render() {
    return (
      <>
      <div className="container d-inline-flex">
        <div className="row">
          <div className="col-sm-3">
            <div className="card mt-3">
            <div className="card-header" 
              style={ { backgroundColor: 'indigo', color: 'lightpink' } }>
            <h4>Account Creation</h4>
            </div>
              <div className="card-body">
              <div className='form-group'>
              
              <label>First Name</label>
              <input type="name" 
                id="clientFName" 
                className='form-control mb-2' 
                placeholder="First Name"/>
              
              <label>Last Name</label>
              <input type="name" 
                id="clientLName" 
                className='form-control mb-2' 
                placeholder="Last Name"/>

              <label>E-Mail Address</label>
              <input type="email" 
                id="clientEmail" 
                className='form-control mb-2' 
                placeholder="Enter E-Mail Address" 
                required={true}/>

              <button onClick={this.newUser} className="btn btn-primary">Create Account</button>
            </div>
          </div>
        </div>
      </div>
        
        <div className="col-sm-9 mt-3">
          <div className="card-header" style={{backgroundColor: 'indigo', color: 'lightpink'}}>
            <h3 style={{ fontWeight: 'bolder' }}>Client List</h3><small>By Brent Abruzese</small>
          </div>
            <table className="table">
              <thead style={{ backgroundColor: '#888', color: 'white'}}>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">E-Mail</th>
                <th scope="col">Actions</th>
                <th scope="col"/>
              </tr>
              </thead>
            { customer.map(cust => (
            <tbody style={{ backgroundColor: "white"}}>
              <tr>
                <td>{cust.firstName}</td>
                <td>{cust.lastName}</td>
                <td><a href={cust.email}>{cust.email}</a></td>
                <td>
                  <button className="btn btn-primary btn-sm">View</button>
                </td>
                <td>
                <button onClick={this.deleteUser(cust._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
            ))}
            </table>
            </div>
          </div>
        </div>
    </>
  )
    }
}

export default ClientList;