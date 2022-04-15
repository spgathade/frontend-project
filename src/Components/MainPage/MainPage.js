import React,{Component,useState} from "react";
import Post from "../Post/Post";
import  './MainPage.css';
import uploadImage from "../../images/upload1.png"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

class MainPage extends Component {
    constructor(props){
    super(props);
    this.state={postArray:[],user:"" }
    }
    componentDidMount(){
        this.getPost()
        this.getname();//ajax call
        }

      

      getPost=()=>{
          const thisContext = this;

fetch("https://backend-project-cdac.herokuapp.com/post")
    .then(response => response.json())
    .then(data => {
            thisContext.setState({postArray:data});
      });
    
}

    getname=()=>{
          let userid = JSON.parse(localStorage.getItem("users")).uid;

fetch("https://backend-project-cdac.herokuapp.com/users/"+userid)
    .then(response => response.json())
    .then(data => {
            this.setState({user:data.userName});
             
      });

     
    
}


        upload=(event)=>{
            const image=event.target.files[0];
            const thisContext=this;
            if(image == null || image == undefined)
                return;

            const storage = getStorage();
            const storageRef = ref(storage,image.name);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', 
  (snapshot) => {
    
},
   
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
     
      let payload = {
        "postId" : Math.floor(Math.random()*100000).toString(),
        "userId" : JSON.parse(localStorage.getItem("users")).uid,
        "postPath" : downloadURL,
        "timeStamp" : new Date().getTime(),
        "likeCount" : 0,
        "userName":this.state.user
    }

           
const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }

fetch("https://backend-project-cdac.herokuapp.com/post",requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        thisContext.getPost();
        
    })
    .catch(error =>{

    })

    });
  }
);      
        }
    render(){
        return(
            <div>
                <div className="mainpage__container">   
                <div className="mainpage__divider"></div>
                <div className="fileupload">
                <label  htmlFor ="file-upload" >
                            <img className="mainpage__uploadicon" src={uploadImage} />
                        </label>
                        <input onChange={this.upload} id="file-upload" type="file"/>
                </div>
                <div className="mainpage__divider"></div>
            </div>
               {
                this.state.postArray.map((item,index)=>(
                <Post key={index} id={item.postId} userName={item.userName} postImage={item.postPath} likes={item.likeCount} />
                ))
                } 
          
            </div>  
        );

        }
}
    export default MainPage;