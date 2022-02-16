import React from 'react'
import { Link,Navigate} from 'react-router-dom'
import axios  from 'axios';
import '../App.css'

class SignInPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state=
        {
            message:"",navigate:null
        }
    }
    // handleLogin(thi) {
    //     console.log("Email: " + thi);
    //     //console.log("Password: " + this.input.password);
    // }
    // handleEmailChange(e) {
    //     this.setState({});
    //  };
    //  handlePasswordChange(e) {
    //     this.setState({password: e.target.value});
    //  };
    // componentDidMount() {
    //     axios.post("localhost:8000/login").then((data) => console.log(data))
    //      .then(data => {
    //          this.setState({ user: data });
    //      });
    //  }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
    
        console.log(data.get('username'),data.get('password')); 
        axios.post(`http://localhost:8000/login`, { data:{username:data.get('username'),password:data.get("password")}} )
        .then(res => {
          console.log(res.data.token,res.data.type);
          axios.defaults.headers.common["authorization"] = res.data.token;
          console.log(axios.defaults.headers.common["authorization"]);

          window.sessionStorage.setItem("authorization", res.data.token);
          this.setState({ navigate: "/"+res.data.type });
        }).catch(err=>{
            if(err){
                console.log(err);
                this.setState({message:"Wrong username or password"});
                setTimeout(() => {
                    this.setState({message:""});

                }, 1000);}
        });
    }
    componentDidMount() {
        setTimeout(this.setState({message:""}),100);
        
        // axios.get("http://localhost:8000").then(res=>
        // {
        //     console.log(res.data);
        // });
        // console.log("hmm");
         //(response.data);
         //fetch('https://some-api.com/harry-potter')
         //.then((response) => response.json())
         //.then(data => {
           //  this.setState({ user: data });
         //});
     }
     
    render()
    {
        if (this.state.navigate) {
            return <Navigate replace to={this.state.navigate}  />
          }
        return (
            <div className="text-center m-5-auto">
                <h2>Sign in to us</h2>
                <h3>{this.state.message}</h3>
                
                <form action="submit" onSubmit={this.handleSubmit}>
                    <p>
                        <label>Username</label><br/>
                        <input id="username" name="username" type="text"  required />
                    </p>
                    <p>
                        <label>Password</label>
                        <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                        <br/>
                        <input type="password" name="password"   required />
                    </p>
                    <p>
    
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                </form>
                <footer>
                    <p>First time? <Link to="/register">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        )
    }

}
export default SignInPage;