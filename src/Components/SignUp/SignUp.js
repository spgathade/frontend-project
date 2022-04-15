import React,{Component} from "react";
import  './SignUp.css';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer,toast } from "react-toastify";
 import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";


class SignUp extends Component {
    constructor(props){
    super(props);
    this.state={
        emailId: null,
        name: null,
        userName: null,
        password: null,
     }
    }

   
    newSignUp=()=>{
        
        
        auth.createUserWithEmailAndPassword(this.state.emailId,this.state.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            

            let payload = {
                "userId" : user.uid,
                "userName" : this.state.userName,
                "name" : this.state.name,
                "profileImage" : ""
            }

                   
        const requestOptions ={
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body : JSON.stringify(payload),
                        }

       fetch("https://backend-project-cdac.herokuapp.com/users",requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("users",JSON.stringify(user));
                window.location.reload();
                toast.success("Sucessfully Registered")
            })
            .catch(error =>{

            })

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            toast.error("Enter Correct Details");
            // ..
        });
}


    render(){
        return(
            <div>


                <input className="loginpage_text" onChange={(event)=>{this.state.emailId = event.currentTarget.value;}} type="text" placeholder="Mobile number or email "/>
                <input className="loginpage_text" onChange={(event)=>{this.state.name = event.currentTarget.value;}} type="text" placeholder="Full Name "/>
                <input className="loginpage_text" onChange={(event)=>{this.state.userName = event.currentTarget.value;}} type="text" placeholder="Username "/>
                <input className="loginpage_text" onChange={(event)=>{this.state.password = event.currentTarget.value;}} type="password" placeholder="Password "/>
                <button className="login_button" onClick={this.newSignUp}> Sign Up</button><ToastContainer/>
            </div>  
        );
    }
}
    export default SignUp;