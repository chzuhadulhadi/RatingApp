//import { application } from 'express';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import React from 'react'
// import { Nav } from 'react-bootstrap';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import Navbar from 'react-bootstrap/Navbar'
class  ManageRatings extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={}
      //  console.log(props);
      this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event)
    {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get("rst"));
        const path=`http://localhost:8000/admin/rating`;
        axios.post(path,{data:{restuarant:data.get("rst"),Rated:data.get("stars"),Comment:this.state.comment}}).then
        (res=>{
            if(res.data[0])
            {
                this.setState({message:"Updated"});
            }
              
          this.setState({data:res.data});       
       });
    }
    componentDidMount()
    {
        console.log(window.sessionStorage.getItem("authorization"));
        axios.defaults.headers.common['authorization']=window.sessionStorage.getItem("authorization")
        console.log(axios.defaults.headers.common['authorization']);
        axios.get("http://localhost:8000/admin/restuarants").then((data)=>
        {
            console.log(data.data);
            this.setState({rests:data.data.map(function(rest,index) {
                return(
                    <option value={rest.id} key={index}>{rest.Rest_name}</option>
                )
                })
        });
    });
      const path=`http://localhost:8000/admin/rating`;
      console.log(path);
      axios.get(path).then
      (res=>{
          console.log(res.data);
        this.setState({data:res.data});
        console.log(this.state.data);
        this.setState({rows:this.state.data.map(function(rate,index) {
     const newTo = 
    { 
                pathname: `/admin/rating?=${rate.id}`
              };
            //   console.log(rate);
                return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td hidden>{rate.id}</td>
                    <td><input value={rate.Restuarant_Id} readOnly/></td>
                    <td><input value={rate.User_Id} readOnly/></td>
                    <td><input value={rate.Rated} readOnly/></td>
                    <td><input value={rate.DOV} readOnly/></td>
                    <td><input value={rate.Comment} readOnly/></td>

                    {/* <td>{<HandleUsers value={id:user.id}/>}</td> */}
                    <td>
                    <Link to={newTo}>Edit</Link>
                    </td>
                  </tr>
                 ) 
            })
      });
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
                      <Nav.Link href="/admin/ratings" active>Ratings</Nav.Link>
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
      <div>
      <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>S.No</th>
                        <th hidden>id</th>
                        <th>Restuarant</th>
                        <th>User</th>
                        <th>Rated</th>
                        <th>D.O.V</th>
                        <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                    </Table>
                   <div class="text-center">
                   { <Form onSubmit={this.handleSubmit}>
          <p>{this.state.message}</p>
                    <p>Restuarant:<br/>
                    <select name="rst">
                        {this.state.rests}
                    </select>
                    </p>
                    <p>Comment<br/>
                    <input name="comment" placeholder='comment section' onChange={e => {this.setState({comment:e.target.value})}}/>
                    </p><p>Number Of Stars<br/>
                      <select name="stars">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>

                      </select>
                    </p>
                    <Button type="submit">Add</Button><p/>
                    </Form>}
                    <p><Link to="/">Back to Homepage</Link>.</p>

                   </div>

      </div>

      </header>

  )};
      }
export default ManageRatings;
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