import axios from 'axios';
import React from 'react';
import StarRatings from 'react-star-ratings';
// import { withRouter } from "react-router";
import { useLocation, useParams } from "react-router-dom";
import { Link} from 'react-router-dom'
import Table from 'react-bootstrap/Table'
// const RenderRow = (props) =>{
//     return props.keys.map((key, index)=>{
//     return <td key={props.data[key]}>{props.data[key]}</td>
//     })
//    }

class  RestuarantRating extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={data:[],rows:null,name:null, rating:0,avrating:0,rrating:0,restId:0}
        this.changeRating=this.changeRating.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        //console.log(this.state.id);
    }
    onSubmitHandler(event)
    {
        event.preventDefault();
        const data = new FormData(event.target);
    
        console.log(data.get("comment"),this.state.rating); 
        let path=`http://localhost:8000/rating/${this.state.restId}`;
        axios.post(path,{data:{comment:data.get("comment"),rating:this.state.rating}})
        .then(res => {
          this.setState({message:res.data});
          //this.componentDidMount();
          setTimeout(() => {
            this.setState({message:null})
            
        }, 1000);
          console.log(res);
          console.log(res.data);
        })
    }
    changeRating( newRating, name ) {
        //console.log("chlta hy");
        this.setState({
          rating: newRating
        });
      }
    componentDidMount()
    { 
        const reid=window.location.search.split("=")[1];
        console.log(window.location.search.split("=")[1],reid);
        this.setState({restId:reid});
        // console.log(this.state.restId);
        const path=`http://localhost:8000/standard/${reid}`;
        console.log(path);
        axios.get(path).then
        (res=>{
            this.setState({name:res.data.name,data:res.data.data});
            // // this.setState({data:res.data.data});
           // console.log(this.state.data[0].Average);
            if(this.state.data[0].Average != null){
             this.setState({rows:this.state.data.map(function(rates,index) {
           
                           return (<tr key={index}>
                               <td>
                               <StarRatings
          
          rating={rates.Average}
          starRatedColor="blue"
        //  changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        /></td>
                               <td>{rates.MAX}</td>
                               <td>{rates.MIN}</td>
                               <td>{rates.comment}</td>
                               <td>
                               <StarRatings
          
          rating={rates.Rated}
          starRatedColor="blue"
        //  changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        /></td>
                               
                             </tr>
                            
                             )
                       })
                   });
                }
                           console.log(res.data.name);
        }).catch((err)=>{console.log(err);});
    
    }
    render(){
        return (
            <div className="text-center">
                <h1 className="main-title home-page-title">{this.state.name}</h1>
                    <h2>Rating</h2>
                <Table striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                        <th>Average Rating</th>
                        <th>Maximum Rating</th>
                        <th>Minimum Rating</th>
                        <th>Comment</th>
                        <th>Rated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                        
                    </tbody>
                    </Table>
            <form onSubmit={this.onSubmitHandler} >
                
                <p>
                    <input type="text" name="comment" placeholder="Comment Section" id="comment" required /> 
                </p>
                <StarRatings
                    rating={this.state.rating}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                />     
                <p>
                    <button id="sub_btn"  type="submit">Rate</button>
                </p>
            </form>
            <footer>
            {this.state.message}

                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
                <Link to="/">
                    <button className="primary-button">Log out</button>
                </Link>
            </div>
        );}
    }
export default RestuarantRating;

        //const {text, match: {params}} = this.props;
        //const {id} = params;
        // function Datas()
        // {
            //const search=window.location;
            //const match = search.match(/type=(.*)/);
            //const type = match?.[1];
            //console.log();

        // }
        // Datas();
        //const params = queryString.parse(location.search);
        //const windowUrl = this.props.location.id;
        // const params = new URLSearchParams(windowUrl);
        //const queryString = "?q=ui.dev&src=typed_query&f=live";
        //const id=this.props.match.params.redirectParam;
        //console.log(id);
    //     axios.get("http://localhost:8000/standard",{params:{id:this.props.match.params.id,
    // name:this.props.match.params.Rest_name}}).then
    //     (res=>{
    //         console.log(res.data);
    //     });
    
    
    