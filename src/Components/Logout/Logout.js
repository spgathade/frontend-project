import React, {Component} from 'react';
import './Logout.css';


class Logout extends Component {
    constructor(props){
    super(props)
    localStorage.removeItem("token")
    this.state={
       
     }
    }
    logout=()=>{
        
        localStorage.clear();
        window.location.reload();        
    }
    
    render(){
        
        return(
                <div className='logout_div'>
                   
                <button className="logout_button" onClick={this.logout}> Logout</button>
                
                </div>
        );
    }
}
    export default Logout;