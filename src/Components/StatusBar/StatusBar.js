import React, { Component } from 'react';
import "./StatusBar.css";
import { Avatar } from '@material-ui/core';
import statusimg from "../../images/pp1.png";
import uploadimage from "../../images/statusadd.png";
import {storage,auth} from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from 'react-toastify';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            statusList: []
         }
    }
    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        // let data=[
        //     {
        //         "username":"anindya_bunny",
        //         "imageURL":"https://darresne.com/img/female-avatar.png"
        //      },
        //      {
        //         "username":"abcs",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //      },
        //      {
        //         "username":"qwe",
        //         "imageURL":"https://www.w3schools.com/w3css/img_avatar3.png"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://darresne.com/img/female-avatar.png"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://www.w3schools.com/w3css/img_avatar3.png"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGonDgYzVXUcaKSWbvyH_ICVD23aI4zlRMJQ&usqp=CAU"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"../../images/pp1.png"
        //      }
        // ]

        fetch('https://backend-project-cdac.herokuapp.com/status')
            .then(response => response.json())
            .then(data => {
                this.setState({statusList: data});
        });
    }   

    uploadStatus =(event)=>{
        let image=event.target.files[0];
        const thisContext=this;
        if(image == null || image == undefined)
            return;

        const storage = getStorage();
        const storageRef = ref(storage,image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);
        //var uploadTask = storage.ref("status").child(image.name).put(image);
        uploadTask.on(
          "state_changed",
          function (snapshot) {
          },
          function (error) {
          },
          function () {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL);

                let payload = {
                    "statusId": Math.floor(Math.random()*100000).toString(),
                    "userId": JSON.parse(localStorage.getItem("users")).uid,
                    "path": downloadURL,
                    "timeStamp": new Date().getTime()
                }
    
                const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }
    
                fetch("https://backend-project-cdac.herokuapp.com/status",requestOptions)
                .then(response => response.json())
                .then(data => {
                    thisContext.getData();
                })
                .catch(error =>{
    
                })
                
            })
            }
        );
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

    render() { 
        return ( 
            <div className="statusbar__container">
            <div className="fileupload">
                <label htmlFor="file-upload-status" >
                    <img className="statusbar__upload" src={uploadimage} width="55px" height="55px" />
                </label>
                    <input id="file-upload-status" onChange={this.uploadStatus} type="file"/>
            </div>
                {
                    this.state.statusList.map((item,index)=>(
                        <div className="status" key={index}>
                            <Avatar className="statusbar__status"  src={item.path} onClick={this.handleShowDialog} />
                            {this.state.isOpen && (
                                <div>
                                <Modal show={this.handleShowDialog} onHide={this.handlehideDialog} >
                                    <Modal.Body className='modal-body'>
                                        <img src={item.path} alt="img" width={300} height={300}/><br/>
                                        <p className=''>{item.userName}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                     <Button variant="secondary" onClick={this.handlehideDialog}>
                                         Close
                                         </Button>
                                     </Modal.Footer>
                                </Modal>
                                </div>
                                )}
        
                            <div className="statusbar__text">{item.userName}</div>
                        </div>
                    ))
                }
            </div>
         );
    }
}
 
export default StatusBar;