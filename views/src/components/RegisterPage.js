import axios from 'axios';
import React from 'react';
//import { render } from 'react-dom'
import { Link } from 'react-router-dom'

import '../App.css'

class  SignUpPage extends React.Component {
    constructor(props){super(props)
        //this.axios=this.axios.bind(this);
        this.state={message:null};
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        }
    onSubmitHandler(event)
    {
        event.preventDefault();
        const data = new FormData(event.target);
    
        console.log(data.get("username"),data.get('email'),data.get('password')); 
        axios.post(`http://localhost:8000/createaccount`, {data:{username:data.get("username"),email:data.get('email'),password:data.get("password")}} )
        .then(res => {
          this.setState({message:res.data.message})
          this.componentDidMount();
           
          console.log(res);
          console.log(res.data);
        })
    }
    componentDidMount()
    {
        console.log(window.sessionStorage.getItem("authorization"));
        axios.defaults.headers.common['authorization']=window.sessionStorage.getItem("authorization")
        console.log(axios.defaults.headers.common['authorization']);
        setTimeout(() => {
            this.setState({message:null})
            
        }, 1000);
    }
    render(){
        return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <h3>{this.state.message}</h3>

            <form action="/home" onSubmit={this.onSubmitHandler} >
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="username" required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" requiredc />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn"  type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )}

}
export default SignUpPage;