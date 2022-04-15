import React, {Component} from 'react';
import  './Post.css';
import Avatar from '@material-ui/core/Avatar';
import love from "../../images/love.svg"
import comment from "../../images/comment.svg"
import share from "../../images/share.svg"
import axios from 'axios';
class Post extends Component {
    constructor(props){
    super(props);
    this.state={commentList:[],user:"",likes:this.props.likes,id:0 }

    this.setlikes = this.setlikes.bind(this)
    }
    componentDidMount(){
        this.getComments();
        this.getname();
      }


      getname=()=>{
          let userid = JSON.parse(localStorage.getItem("users")).uid;

fetch("https://backend-project-cdac.herokuapp.com/users/"+userid)
    .then(response => response.json())
    .then(data => {
            this.setState({user:data.userName});
             
      });

     
    
}

    redheart = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABuUlEQVRYhe3RMU8TYRjA8f/z1rvEFdQ49xO0tFW/wsnioAm6sJIQDMEv0J2QUOMiiYOLgzEaMAgfAWtpDWGGxYXCKElz5fo4aDnrcde7cj0Sw7Pdm/d9/783B9dzPVc8ctGiUjVuoT4DPEUoCdwBTlT5huhb27TXZXe3O3CmVLJc7+4jjM6KUgZuKbQNNHrIO7tVeS9Ue0MBncp03nj6AaUYylYOxDBvNb9sA5wVHaen8gohH/5WbXrejcc39z4fhgI6lem8OdMd4Hb4RQPHV/5c/iLeftqel3vwN+IcoFRNd6reiHx5OtOwWvfu93+H6a+6hfpMBnGAsjv19Un/4xyA4VkG8d8p9Vs+QCllBQDKAYDARFZ1RSYDAJQfWQHAb/kAkU9Z1VX4GABY3dwycDr+vPy0VZcDANnfOEJkafwAFqW1dRwAANjNzTWE2tjSQs1ubb4ZXPpnFKRbfLgKPE81rrpmfd+aE9BIwFgQIfFQQKqIiHgkIBXEkPhQwKUQMeKxAD7CqYEspBmPDUiESBBPBIiFSBhPDIhEjBAfCXAhYsT4pUZB3KLz0i04r3XEh6SCuLL4fzO/AI+KyNGkrSDVAAAAAElFTkSuQmCC";


      getComments=()=>{
//   let data=[{
//   "username":"ASD",
//   "commentId":"1234",
//   "timeStamp":"123456",
//   "description":"comment"
//   },
//   {
//     "username":"BSD",
//     "commentId":"1234",
//     "timeStamp":"123456",
//     "description":"comment"
//     },
//     {
//         "username":"CSD",
//         "commentId":"1234",
//         "timeStamp":"123456",
//         "description":"comment"
//         },
//         {
//             "username":"DSD",
//             "commentId":"1234",
//             "timeStamp":"123456",
//             "description":"comment"
//             }
//   ]
        console.log(this.props)
    fetch("https://backend-project-cdac.herokuapp.com/comments/"+this.props.id)
    .then(response => response.json())
    .then(data => {
        this.setState({commentList:data});
      });
  
}

    submitComments = (event) =>{
        if(event.key == "Enter")
        {
            let comment = event.currentTarget.value;
            if(comment != null || comment != undefined)
            {
                let payload = {
                    "commentId" : Math.floor(Math.random()*100000).toString(),
                    "userId" : JSON.parse(localStorage.getItem("users")).uid,
                    "postId" : this.props.id,
                    "timeStamp" : new Date().getTime(),
                    "comment" : comment,
                    "userName" : this.state.user
                }
    
                       
            const requestOptions ={
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                                body : JSON.stringify(payload),
                            }
    
           fetch("https://backend-project-cdac.herokuapp.com/comments",requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.getComments();
                })
                .catch(error =>{
    
                })
            }
        }
    }

    state = { isOpen: false };

  handleLike = (e) => {
    this.setState({likes:this.props.likes+1})
    this.setlikes(this.state)
    this.setState({ isOpen: true });
    console.log(this.state)
  };
  

  setlikes=(data)=>{
      let userid = this.props.id;
        fetch("https://backend-project-cdac.herokuapp.com/post/"+userid)
        .then(res => res.json())
      .then(
        (result) => {
            console.log(data);
            this.setState({id:result.id})
            axios.put("https://backend-project-cdac.herokuapp.com/post/"+this.state.id,data).then(

        (res)=>{console.log(res)}
        )
          })
                

          
      }





    render(){
        return(
            <div className='post_container'>
                {/* Header */}
               <div className='post_header'>
               <Avatar className="post_image" src=""/>
               <div className='post_username' >{this.props.userName}</div>
               </div>
               {/* image */}
            <div>
               <img src={this.props.postImage} width="615px"/>
            </div>
               {/* analytics */}
            <div> 
                <div style={{"marginLeft":"10px"}}>
               <img src={this.state.isOpen? this.redheart:love} className="post_reactimage" onClick={this.handleLike}/>
               <img src={comment} className="post_reactimage"/>
               <img src={share} className="post_reactimage"/>
               </div >
               <div style={{"fontWeight":"bold","marginLeft":"20px"}}>
               {this.state.likes} likes
                </div>
               </div>
               {/* comment section */}
               <div>
               {
                this.state.commentList.map((item,index)=>(
                    
                 // index < 4 ?
                  <div className="post_comment" key={index}>{item.userName}:{item.comment}</div> //: <span></span>
                
                ))
                }
                 
                  <input type="text" onKeyPress={this.submitComments} className='post_commentbox' placeholder="Add a comment..."/>
               </div>
            </div>  
        );
    }
}
    export default Post;