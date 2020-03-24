import React from 'react';
import {reduxForm} from "redux-form";


const LoginForm = (props) => {
    return (
        <form>
            <input placeholder="Имя"/>
            <input placeholder="e-mail"  />
            <input placeholder="message" />
            <button>Send</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    return <div>
        <h1>
            <LoginReduxForm/>
        </h1>
    </div>

}

export default Login;


