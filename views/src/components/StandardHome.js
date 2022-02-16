import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import RestuarantRating from './RestuarantRatings';
const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
   }

class  StandardHome extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={data:[],rows:null}

    }
    componentDidMount()
    {
      console.log(axios.defaults.headers.common['authorization']);

        axios.get("http://localhost:8000/standard").then
        (res=>{
            
                this.setState({data:res.data.data});
                if(this.state.data){
                this.setState({rows:this.state.data.map(function(user,index) {
             const newTo = 
            { 
                        pathname: `/ratings/?id=${user.id}`, 
                        Rest_name: user.Rest_name, 
                      };
                        return (<tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.Rest_name}</td>
                            <td>
                            <Link to={newTo}>Rate </Link>
                            </td>
                          </tr>
                         
                          )
                    })
                });}
                // console.log(typeof(res.data.data),res.data.data.map(function(user,index) {
                //         return user.id,index
                // }));
        });
    }
    
    
    render(){
        return (
            <div className="text-center">
                <h1 className="main-title home-page-title">Restuarants</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>S.No</th>
                        <th>Restuarant Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                    </Table>
                <Link to="/">
                    <button className="primary-button">Log out</button>
                </Link>
            </div>
        )}}
export default StandardHome;