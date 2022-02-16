//import { application } from 'express';
import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table'
import HandleUsers from './HandleUsers';
import { Navigate } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import Navbar from 'react-bootstrap/Navbar'
class  ManageRestuarants extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={data:[],upuser:null,redirect:false};
        this.handleSubmit=this.handleSubmit.bind(this);
      //  console.log(props);
    }
    handleSubmit(event)
    {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get("Rest_Name"));
        const path=`http://localhost:8000/admin/restuarants`;
        axios.post(path,{data:{Rest_name:data.get("Rest_Name")}}).then
        (res=>{
            console.log(res.data);
           
                this.setState({message:"Added"});
                // this.setState({redirect:true});
           
              
        //   this.setState({data:res.data});       
        });
    }
    componentDidMount()
    {
        console.log(window.sessionStorage.getItem("authorization"));
        axios.defaults.headers.common['authorization']=window.sessionStorage.getItem("authorization")
        console.log(axios.defaults.headers.common['authorization']);
      const path=`http://localhost:8000/admin/restuarants`;
      console.log(path);
      axios.get(path).then
      (res=>{
        this.setState({data:res.data});
        this.setState({rows:this.state.data.map(function(rest,index) {
     const newTo = 
    { 
                pathname: `/admin/restuarant?id=${rest.id}`
              };
                return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td hidden>{rest.id}</td>
                    <td><input value={rest.Rest_name} readOnly/></td>
                    {/* <td>{<HandleUsers value={id:user.id}/>}</td> */}
                    <td>
                    <Link to={newTo}>Edit</Link>
                    </td>
                  </tr>
                 ) 
            })
      })
    });
}
    render(){
        if(this.state.redirect)
        {
            return <Navigate to="/admin/restuarants" replace={true}/>;

        }
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
                      <Nav.Link href="/admin/restuarants" active>Restuarants</Nav.Link>
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
      <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>S.No</th>
                        <th hidden>id</th>
                        <th>Restuarant name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                    </Table>
                    <div class="text-center">
          <Form onSubmit={this.handleSubmit}>
          <p>{this.state.message}</p>
          <p>Restuarant Name<br/>
                    <input  name="Rest_Name" />
                    </p>
                    <Button type="submit">Add</Button>
                    </Form>
                    <p><Link to="/admin">Back to Homepage</Link>.</p>

          </div>
      </header>

  )};
      }
export default ManageRestuarants;
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