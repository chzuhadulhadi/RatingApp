//import { application } from 'express';
import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router';
import Table from 'react-bootstrap/Table'
// import { Nav } from 'react-bootstrap';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import Navbar from 'react-bootstrap/Navbar'
class  HandleUsers extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={data:[],row:null,message:null};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleDelete=this.handleDelete.bind(this);

      //  console.log(props);   
    }

    handleSubmit(event)
    {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get("email"));
        const path=`http://localhost:8000/admin/users${data.get("id")}`;
        axios.put(path,{data:{username:data.get("username"),email:data.get('email'),type:data.get("type"),password:data.get("password")}}).then
        (res=>{
            if(res.data[0])
            {
                this.setState({message:"Updated"});
            }
              
        //   this.setState({data:res.data});       
        });
    }
    handleDelete()
    {
        //event.preventDefault();
       // const data = new FormData(event.target);
        console.log(this.state.data.id);
        const path=`http://localhost:8000/admin/users${this.state.data.id}`;
        axios.delete(path).then
        (res=>{
            if(res.data[0])
            {
                this.setState({message:"Deleted"});
                this.setState({redirect:true});
            }
              
        //   this.setState({data:res.data});       
        });
    }
//     handleDelete(id)
//     {
// //                     //console.log(id);
// //                     axios.delete(`http://localhost:8000/admin/users${id}`).then(res=>{
// //                         console.log("deleted",res);
// //                         //this.forceUpdate();
// //                     });
// console.log("called");
//     }
    componentDidMount()
    {
        console.log(window.sessionStorage.getItem("authorization"));
        axios.defaults.headers.common['authorization']=window.sessionStorage.getItem("authorization")
        console.log(axios.defaults.headers.common['authorization']);
        const reid=window.location.search.split("=")[1];
        console.log(window.location.search.split("=")[1],reid);
        const path=`http://localhost:8000/admin/users${reid}`;
        axios.get(path).then((data)=>
        {
            console.log(data.data.data);
            this.setState({data:data.data.data});
            this.setState({username:data.data.data.username});
            this.setState({email:data.data.data.email});
            this.setState({type:data.data.data.type});
            this.setState({password:data.data.data.password});

            // this.setState({username:data.data.data.username});
            // this.setState({username:data.data.data.username});

            // this.setState({rows:this.state.data.map(function(user,index) {
            //     return(
            //         <input value={user}/>
            //     )
            //     })});
        });
    }
      //   console.log(path);
    //   axios.get(path).then
    //   (res=>{
    //     this.setState({data:res.data});
        // this.setState({rows:this.state.data.map(function(user,index) {
    //  const newTo = 
    // { 
    //             pathname: `/admin/users/?id=${user.id}`, 
    //             username: user.username, 
    //           };
            // //  if(this.state.upuser ===user.id)
            // //  {
            //     function SubmitHandler()
            //     {

            //     }
            //     function Deler(id)
            //     {
            //         console.log(id);
            //         axios.delete(`http://localhost:8000/admin/users${id}`).then(res=>{
            //             console.log("deleted",res);
            //             //this.forceUpdate();
            //         });
            //     }
    render(){
        if (this.state.redirect) {
            return <Navigate to="/admin/users" replace={true}/>;
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
      
          <div class="text-center">
          <Form onSubmit={this.handleSubmit}>
          <p>{this.state.message}</p>
                    <input name="id" value={this.state.data.id} hidden readOnly/>
          <p>Username<br/>
                    <input  name="username" value={this.state.username}  onChange={e => {this.setState({username:e.target.value})}}/>
                    </p><p>Email<br/>
                    <input name="email" value={this.state.email} onChange={e => {this.setState({email:e.target.value})}}/>
                    </p><p>Password<br/>
                    <input name="password" placeholder='password' value={this.state.password} onChange={e => {this.setState({password:e.target.value})}}/>
                    </p>
                    <p>Type<br/>
                        <select value={this.state.type} name="type" onChange={e => {this.setState({type:e.target.value})}}>
                            <option>admin</option>
                            <option>standard</option>
                        </select>
                    </p>
                    <Button type="submit">Update</Button><t>        </t>
                    <Button onClick={this.handleDelete}>Delete</Button>
                    </Form>
                    <p><Link to="/admin">Back to Homepage</Link>.</p>

          </div>

      

      </header>

  )};
      }
export default HandleUsers;
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