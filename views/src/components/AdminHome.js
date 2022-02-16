//import { application } from 'express';
import axios from 'axios';
import React from 'react'
// import { Nav } from 'react-bootstrap';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import Navbar from 'react-bootstrap/Navbar'
class  AdminHome extends React.Component {
    constructor(props)
    {
        super(props);
      //  console.log(props);
    }
    componentDidMount()
    {
      console.log(axios.defaults.headers.common['authorization']);
      const path=`http://localhost:8000/admin`;
      console.log(path);
      axios.get("http://localhost:8000/admin").then
      (res=>{
        console.log(res);
      });
    }
    render(){
      return (
      <header >
         <div className="row">
      <div className="col-md-12">
              <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                  <Navbar.Brand href="/admin">Admin Panel</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                      <Nav.Link href="/admin/users">Users</Nav.Link>
                      <Nav.Link href="/admin/restuarants">Restuarants</Nav.Link>
                      <Nav.Link href="/admin/ratings">Ratings</Nav.Link>
                      {/* <Nav.Link href="/"><button>Logout</button></Nav.Link> */}
                      </Nav>
                      {/* <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                      <Button href="/">Logout</Button>
                      {/* </Form> */}
                  </Navbar.Collapse>
              </Navbar>
              <br />                  
      </div>
      </div> 
      {/* <p><Link to="/">Back to Homepage</Link>.</p> */}
      <h2 className="main-title text-center">You are now logged in as <strong>ADMIN</strong></h2>
      </header>

  )};
      }
export default AdminHome;
 /*{ <div className="row">
<div className="col-md-12">
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about-us">Contact Us</Nav.Link>
                <Nav.Link href="/contact-us">About Us</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        <br />                  
</div>
</div> }*/