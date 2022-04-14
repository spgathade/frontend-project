
import { Avatar } from "@material-ui/core";
import React,{Component} from "react";
import  './Suggestions.css';
import imageSrc1 from "../../images/pp1.png";
import imageSrc2 from '../../images/pp2.png'
import imageSrc3 from '../../images/pp3.jpeg'

class Suggestions extends Component {
    constructor(props){
    super(props);
    this.state={ }
    }
    render(){
        return(
            <div className="suggestions_container">
                <div className="suggestions_header">
                Suggestions for you
                </div >
                <div className="suggestions_body">
            <div className="suggestions_friends">
              <Avatar src={imageSrc1} className="suggestions_image"/>
              <div className="suggestions_username" >Ron weasly</div>
              </div>
              <div className="suggestions_friends">
              <Avatar src={imageSrc2} className="suggestions_image"/>
              <div className="suggestions_username" >Emma Watson</div>
              </div>
              <div className="suggestions_friends">
              <Avatar src={imageSrc3} className="suggestions_image"/>
              <div className="suggestions_username" >Rakesh Roshan</div>
              </div>
              <div className="suggestions_friends">
              <Avatar src={imageSrc2} className="suggestions_image"/>
              <div className="suggestions_username" >P V Sindhu</div>
              </div>
              <div className="suggestions_friends">
              <Avatar src={imageSrc1} className="suggestions_image"/>
              <div className="suggestions_username" >Virat Kohli</div>
              </div>
              
            </div>
            </div>  
                
                
            
        );
    }
}
    export default Suggestions;