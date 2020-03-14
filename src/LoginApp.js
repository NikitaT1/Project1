import React from 'react';
import {Field, reduxForm} from "redux-form";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Имя" component={"input"} name={"user_name"}/>
            <Field placeholder="e-mail"  component={"input"} name={"user_email"}/>
            <Field  placeholder="message" component={"textarea"} name={"message"}/>
            <button>LOGIN</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'form'})(LoginForm)

const LoginApp = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div id={"login"}>
            {/*<Fade clear>*/}
                <div>
                    <LoginReduxForm onSubmit={onSubmit}/>
                </div>
            {/*</Fade >*/}
        </div>
    );
}

export default LoginApp;