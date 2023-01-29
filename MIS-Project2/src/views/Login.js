
import React,{useState,useEffect} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
} from "reactstrap";

import GIF from "./gif.gif"
import "./Login.css"

function Login(props) {

    console.log(props)

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");


    const getUsername = (e) =>{
        setUsername(e.target.value)
    }

    const getPassword = (e) => {
        setPassword(e.target.value)
    }



  return (
    <>
     <div className="signupSection">
  <div className="info">
    <h2 style={{ color:"white" }}>Welcome</h2>
    <i class="icon ion-ios-ionic-outline" aria-hidden="true"></i>
    <p style={{ color:"white" }}>The Current Affairs</p>
    <img style={{ width:"340px",height:"280px" }} src={GIF}/>
  </div>
  <form className="signupForm" name="signupform">
    <h2 style={{ color:"white" }}>Login</h2>
    <ul className="noBullet">
    <li>
        <label for="email"></label>
        <input onChange={(e)=>getUsername(e)} type="email" className="inputFields" id="email" name="email" placeholder="Email" value={username} required/>
      </li>
      <li>
        <label for="password"></label>
        <input onChange={(e)=>getPassword(e)}  type="password" className="inputFields" id="password" name="password" placeholder="Password" value={password}  required/>
      </li>
     
      <li id="center-btn">
        <button type='button' onClick={()=> props.loginUser(username,password)} id="join-btn" name="join" alt="Join">Login</button>
      </li>
    </ul>
    
  </form>
</div>
    </>
  );
}

export default Login;
