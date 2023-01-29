
import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "./views/Login.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const App = () => {

    const [login, setLogin] = useState(false)


    const loginUser = (username,password) =>{
        console.log(username,password)
              if((username == "hello"&&password=="hello") || (username == "dadabhaicool" && password=="admin")){
              localStorage.setItem('admin-login', JSON.stringify({username:username}));
              setLogin(true)
              }
              else {
                alert("Invalid Credentials")
              }
    };



    const logoutUser = () => {
        console.log("hello")
        localStorage.clear()
        setLogin(false)
      }
    
    



    useEffect(()=>{
        console.log("App")
        if(JSON.parse(localStorage.getItem("admin-login")) !== null ){
            setLogin(true)
        }else{
            setLogin(false)
        }
    })




    return ( <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
      {(login && JSON.parse(localStorage.getItem("admin-login")) !== null ) ?
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} logoutUser={logoutUser} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    :    
    <Switch>
    <Route path="/login" render={()=> <Login loginUser={loginUser}/> } />
    <Redirect from="/" to="/login" />
  </Switch>

    }
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>

    )
};

export default App