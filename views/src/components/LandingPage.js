import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../images/bg.png'
import axios from 'axios'

import '../App.css'

class LandingPage extends React.Component {
    constructor(props)
    {
        super(props);
        //this.axios=this.axios.bind(this);
        this.message="Welcome";

        this.state={message:"empty",
            HeaderStyle:{
                width: "100%",
                height: "100vh",
                background: `url(${BackgroundImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",     
        }
    }}
    
    componentDidMount() {
        delete axios.defaults.headers.common["authorization"];
        window.sessionStorage.removeItem("authorization");
        
        console.log(axios.defaults.headers.common["authorization"]);
        axios.get("http://localhost:8000").then(res=>
        {
            this.setState({message: res.data.message });
            //this.state.message=res.data.message;
            console.log(this.state.message);
        });
        
        }

    

    
    render(){
        return (
        <header style={ this.state.HeaderStyle }>
            <h1 className="main-title text-center">login / register page</h1>
            <p className="main-para text-center">{this.state.message}</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
            </div>
        </header>
    )};
    
}


export default LandingPage;