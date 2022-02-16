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
class  HandleRestuarant extends React.Component {
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
        console.log(data.get("Rest_Name"));
        const path=`http://localhost:8000/admin/restuarants${data.get("id")}`;
        axios.put(path,{data:{Rest_name:data.get("Rest_Name")}}).then
        (res=>{
            console.log(res.data);
            if(res.data[0])
            {
                this.setState({message:"updated"});
                this.setState({redirect:true});
            }
              
        //   this.setState({data:res.data});       
        });
    }
    handleDelete()
    {
        //event.preventDefault();
       // const data = new FormData(event.target);
        console.log(this.state.data.id);
        const path=`http://localhost:8000/admin/restuarants${this.state.data.id}`;
        axios.delete(path).then
        (res=>{
            
                this.setState({message:"Deleted"});
                this.setState({redirect:true});
            
              
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
        console.log(window.sessionStorage.getItem("authorization"));
        axios.defaults.headers.common['authorization']=window.sessionStorage.getItem("authorization")
        console.log(axios.defaults.headers.common['authorization']);
        const reid=window.location.search.split("=")[1];
        console.log(window.location.search.split("=")[1],reid);
        const path=`http://localhost:8000/admin/restuarants${reid}`;
        axios.get(path).then((data)=>
        {
            console.log(data.data.id);
            this.setState({data:data.data});
            this.setState({id:data.data.id});
            this.setState({Rest_name:data.data.Rest_name});

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
                      <Nav.Link href="/admin/restuarants"active>Restuarants</Nav.Link>
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
                    <input name="id" value={this.state.id} hidden readOnly/>
          <p>Restuarant Name<br/>
                    <input  name="Rest_Name" value={this.state.Rest_name}  onChange={e => {this.setState({Rest_name:e.target.value})}}/>
                    </p>
                    <Button type="submit">Update</Button><t>        </t>
                    <Button onClick={this.handleDelete}>Delete</Button>
                    </Form>
                    <p><Link to="/admin">Back to Homepage</Link>.</p>

          </div>

      

      </header>

  )};
      }
export default HandleRestuarant;
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