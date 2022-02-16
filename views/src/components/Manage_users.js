//import { application } from 'express';
import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table'
import HandleUsers from './HandleUsers';
// import { Nav } from 'react-bootstrap';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import Navbar from 'react-bootstrap/Navbar'
class  ManageUsers extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={data:[],upuser:null};
        this.handleSubmit=this.handleSubmit.bind(this);
      //  console.log(props);
    }
    handleSubmit(event)
    {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get("email"));
        const path=`http://localhost:8000/admin/users${data.get("id")}`;
        axios.post(path,{data:{username:data.get("username"),email:data.get('email'),type:data.get("type"),password:data.get("password")}}).then
        (res=>{
            if(res.data[0])
            {
                this.setState({message:"Added"});
            }
              
        //   this.setState({data:res.data});       
        });
    }
    componentDidMount()
    {
        console.log(window.sessionStorage.getItem("authorization"));
        axios.defaults.headers.common['authorization']=window.sessionStorage.getItem("authorization")
        console.log(axios.defaults.headers.common['authorization']);

      const path=`http://localhost:8000/admin/users`;
      console.log(path);
      axios.get("http://localhost:8000/admin/users").then
      (res=>{
        this.setState({data:res.data});
        console.log(res.data);
            this.setState({rows:this.state.data.map(function(user,index) {
     const newTo = 
    { 
                pathname: `/admin/user?id=${user.id}`
              };
                return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td hidden>{user.id}</td>
                    <td><input value={user.username} readOnly/></td>
                    <td><input value={user.email} readOnly/></td>
                    <td><input value={user.password}readOnly/></td>
                    <td><select value={user.type} disabled>
                        <option>standard</option>
                        <option>admin</option>
                        </select></td>
                    {/* <td>{<HandleUsers value={id:user.id}/>}</td> */}
                    <td>
                    <Link to={newTo}>Edit</Link>
                    </td>
                  </tr>
                 )
            //  }
             
                // return(<tr key={index}>
                //     <td>{index+1}</td>
                //     <td>{user.id}</td>
                //     <td>{user.username}</td>
                //     <td>{user.email}</td>
                //     <td>{user.password}</td>
                //     <td><select value={user.type} disabled>
                //         <option>standard</option>
                //         <option>admin</option>
                //         </select></td>
                //     <td><button>Edit</button></td>
                //     {/* <td> */}
                //     {/* <Link to={newTo}>Rate </Link> */}
                //     {/* </td> */}
                //   </tr>
                //  )
                
            })
      })
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
                      <Nav.Link href="/admin/users" active>Users</Nav.Link>
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
      <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>S.No</th>
                        <th hidden>id</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                    </Table>
                   <div class="text-center">
                   <Form onSubmit={this.handleSubmit}>
          <p>{this.state.message}</p>
                    <input name="id" value={this.state.data.id} hidden readOnly/>
          <p>Username<br/>
                    <input  name="username" />
                    </p><p>Email<br/>
                    <input name="email" />
                    </p><p>Password<br/>
                    <input name="password" placeholder='password'/>
                    </p>
                    <p>Type<br/>
                        <select name="type" >
                            <option>admin</option>
                            <option>standard</option>
                        </select>
                    </p>
                    <Button type="submit">Add</Button>
                    </Form>
                   </div>
      </header>

  )};
      }
export default ManageUsers;
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