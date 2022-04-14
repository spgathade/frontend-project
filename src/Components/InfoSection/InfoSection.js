import React,{Component} from "react";
import  './InfoSection.css';
import imageSrc from "../../images/pp4.jpeg"
import { Avatar } from "@material-ui/core";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
class InfoSection extends Component {
    constructor(props){
    super(props);
    this.state={ 
        user : "",
        description : ""
    }

    this.setdescription = this.setdescription.bind(this)
    }

    componentDidMount(){
        this.getname();//ajax call
      }

      updatedes = (e) =>{
            e.preventDefault();
          this.setdescription(this.state)
          console.log(this.state)
      }

      setdescription=(data)=>{
            let userid = JSON.parse(localStorage.getItem("users")).uid;
        axios.put("https://backend-project-cdac.herokuapp.com/users/"+userid,data).then(

        (res)=>{console.log(res)}
        )
       

      }

      getname=()=>{
          let userid = JSON.parse(localStorage.getItem("users")).uid;

fetch("https://backend-project-cdac.herokuapp.com/users/"+userid)
    .then(response => response.json())
    .then(data => {
            this.setState({user:data.userName, description:data.description});
             
      });

     
    
}

state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: true });
    console.log('cliked');
  };
  handlehideDialog = () => {
    this.setState({ isOpen: false });
    console.log('cliked');
  };

  onchange=(e)=>{
      this.setState({description:(e.target.value)})
    }


    render(){
        return(
            <div className="info_container">
              <Avatar src={imageSrc} className="info_image"/>
              <div className="info_content">
              <div className="info_username">{this.state.user}</div>
              <div className="info_description">{this.state.description}</div>
              <div><Button onClick={this.handleShowDialog}>Edit Description</Button></div>
              {this.state.isOpen && (
                                <div>
                                    
                                <Modal show={this.handleShowDialog} onHide={this.handlehideDialog}>
                                    <Modal.Header>
                                        <Modal.Title>Hi, {this.state.user}</Modal.Title>
                                    </Modal.Header>
                                  <form onSubmit={this.updatedes}>
                                        Description : <input type={"text"} onChange={this.onchange } /><br/><br/>
                                        <Button variant='primary' type="submit" >Save</Button> &nbsp;
                                     <Button variant="secondary" onClick={this.handlehideDialog}>
                                         Close
                                         </Button>
                                         </form>
                                </Modal>
                               
                                </div>
                                )}
              </div>
            </div>  
        );
    }
}
    export default InfoSection;