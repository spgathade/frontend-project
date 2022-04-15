import React, {Component} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer,toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


class SignIN extends Component {
    constructor(props){
    super(props);
    this.state={
        emailId : null,
        password : null
     }
    }

    login=()=>{

        // auth.signInWithEmailAndPassword(this.state.emailId, this.state.password)
        //     .then((userCredential) => {
        //         // Signed in
        //         var user = userCredential.user;
        //         localStorage.setItem("users",JSON.stringify(user));
        //         window.location.reload();

            const auth = getAuth();
        signInWithEmailAndPassword(auth, this.state.emailId, this.state.password)
        .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("users",JSON.stringify(user));
    toast.success("Login Success")
    window.location.reload();
    
    

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error("Invalid Username or Password");
  });
    }
    render(){
        return(
            <div>
                <input className="loginpage_text" onChange={(event)=>this.state.emailId=event.currentTarget.value} type="text" placeholder="Phone number,username or email "/>
                <input className="loginpage_text" onChange={(event)=>this.state.password=event.currentTarget.value} type="password" placeholder="Password "/>
                <button className="login_button" onClick={this.login}> Log In</button><ToastContainer/>
            </div>  
        );
    }
}
    export default SignIN;