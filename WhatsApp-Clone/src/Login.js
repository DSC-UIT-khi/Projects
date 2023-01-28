import React from 'react';
import './Login.css'
import {Button} from '@material-ui/core'
import {auth, provider} from "./firebase"
//we made the google auth provider in firebase file

import {useStateValue} from './StateProvider'
import {actionTypes} from './reducer'

function Login() {
    //useStatevalue is a hook we create inside stateprovider
    // dispatch is like a gun you put whatever payload and shoot it to data layer to update the data
    const [{}, dispatch] = useStateValue();


    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user:result.user,
            })
        }
        ).catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__container">

                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
                    alt=""
                />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login
