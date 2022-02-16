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
class  HandleRating extends React.Component {
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
        console.log(data.get("rst"));
        const path=`http://localhost:8000/admin/rating${this.state.reid}`;
        axios.put(path,{data:{restuarant:data.get("rst"),ids:data.get('user'),Rated:this.state.rated,Comment:this.state.comment}}).then
        (res=>{
            if(res.data[0])
            {
                this.setState({message:"Updated"});
            }
              
          this.setState({data:res.data});       
       });
    }
    handleDelete()
    {
        //event.preventDefault();
       // const data = new FormData(event.target);
        console.log(this.state.reid);
        const path=`http://localhost:8000/admin/rating${this.state.reid}`;
        axios.delete(path).then
        (res=>{
            if(res.data[0])
            {
                this.setState({message:"Deleted"});
                
               // this.setState({redirect:true});
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
        this.setState({reid:reid});
        
        const path=`http://localhost:8000/admin/rating${reid}`;
        axios.get(path).then((data)=>
        {
            console.log(data.data.users);
            // this.setState({data:data.data.data});
            // this.setState({username:data.data.data.username});
            // this.setState({email:data.data.data.email});
            // this.setState({type:data.data.data.type});
            // this.setState({password:data.data.data.password});
            console.log(data.data.rates[0].Comment);
            this.setState({comment:data.data.rates[0].Comment});
            this.setState({id:data.data.rates[0].id});
            this.setState({rated:data.data.rates[0].Rated});

            // this.setState({username:data.data.data.username});
            console.log(data.data.rates[0].Rated);
            this.setState({rests:data.data.rests.map(function(rest,index) {
                if(data.data.rates[0].Restuarant_Id==rest.id)
                {
                    return(
                        <option value={rest.id} key={index} selected>{rest.Rest_name}</option>
                    )    
                }
                return(
                    <option value={rest.id} key={index}>{rest.Rest_name}</option>
                )
                })});
                // this.setState({rates:data.data.rates.map(function(user,index) {
                //     return(
                //         <option value={user.id} key={index}>{user.username}</option>
                //     )
                //     })});
            this.setState({users:data.data.users.map(function(user,index) {
                if(data.data.rates[0].User_Id==user.id)
                {
                    
                    return(<option value={user.id} key={index} selected>{user.username}</option>)    
                }
                return(
                    <option value={user.id} key={index}>{user.username}</option>
                )
                })});
        });
        // console.log(this.state.comment);
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
            return <Navigate to="/admin/ratings" replace={true}/>;
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
      
          <div class="text-center">
          <Form onSubmit={this.handleSubmit}>
          <p>{this.state.message}</p>
                    <input name="id" value={this.state.data.id} hidden readOnly/>
          Username<br/>
          <select name="user">
                    {this.state.users}
                    </select>
                    <p>Restuarant:<br/>
                    <select name="rst">
                        {this.state.rests}
                    </select>
                    </p>
                    <p>Comment<br/>
                    <input name="comment" value={this.state.comment} onChange={e => {this.setState({comment:e.target.value})}}/>
                    </p><p>Number Of Stars<br/>
                      <select value={this.state.rated}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>

                      </select>
                    </p>
                    <Button type="submit">Update</Button><p/>
                    <Button onClick={this.handleDelete}>Delete</Button>
                    </Form>
                    <p><Link to="/admin">Back to Homepage</Link>.</p>

          </div>

      

      </header>

  )};
      }
export default HandleRating;
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