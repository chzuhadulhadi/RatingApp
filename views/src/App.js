import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StandardHome from './components/StandardHome'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ForgetPasswordPage from './components/ForgetPasswordPage'
import AdminHome from './components/AdminHome'
import ManageRatings from './components/Manage_Ratings'
import ManageRestuarants from './components/Manage_restuarants'
import ManageUsers from './components/Manage_users'
import './App.css'
import RestuarantRating from './components/RestuarantRatings'
import HandleUsers from './components/HandleUsers'
import HandleRestuarant from './components/HandleRestuarant'
import HandleRating from './components/HandleRating'

class  App extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            user: [],
            isLoggedIn:false,
        }

    //this.axios=this.axios.bind(this);
    }
    

    // Footer()
    // {            
    //         <p className="text-center" style={ FooterStyle }>Designed & coded by <a href="https://izemspot.netlify.com" target="_blank" rel="noopener noreferrer">IZEMSPOT</a></p>
    // }
    // FooterStyle={
    //     background: "#222",
    //     fontSize: ".8rem",
    //     color: "#fff",
    //     position: "absolute",
    //     bottom: 0,
    //     padding: "1rem",
    //     margin: 0,
    //     width: "100%",
    //     opacity: ".5"
    // }
render()
{
    return (
    <Router>
        <div>
            <Routes>
                <Route exact path="/"  element={<LandingPage/>}/>
                <Route path="/login"  element={<LoginPage/>}/>
                <Route path="/register"  element={<RegisterPage/>}/>
                <Route path="/forget-password" element={<ForgetPasswordPage/>}/>
                <Route path="/admin" element={ <AdminHome/> } />
                <Route path="/standard" element={ <StandardHome/> } />
                <Route path="/admin/users" element={ <ManageUsers/> } />
                <Route path="/admin/restuarants" element={ <ManageRestuarants/> } />
                <Route path="/admin/ratings" element={ <ManageRatings/> } />
                <Route path="/admin/rating" element={ <HandleRating/> } />
                <Route path="/admin/user" element={<HandleUsers/>}/>
                <Route path="/admin/restuarant" element={<HandleRestuarant/>}/>
                {/* <Route path="/greeting/:name" render={(props) => <Greeting text="Hello, " {...props} />} /> */}
                <Route path="/ratings" element= {<RestuarantRating />}/>

            </Routes>
            {/* <Footer /> */}
        </div>
    </Router>
);
}
}


export default App;