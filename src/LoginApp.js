import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {LoginThunk} from "./reducer";
import {Redirect} from "react-router-dom";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="free@samuraijs.com" component={"input"} name={"email"}/>
            <Field placeholder="free"  component={"input"} name={"password"}/>
            <Field  type={"checkbox"} component={"input"} name={"rememberMe"}/>
            <button>LOGIN</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'loginFree'})(LoginForm)

const LoginApp = (props) => {
    const onSubmit = (formData) => {
        props.LoginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

  /*  if(this.props.isAuth === true) return <Redirect to={"./App"}/>*/
    return (
        <div>
            {/*<Fade clear>*/}
                <div>
                    <LoginReduxForm onSubmit={onSubmit}/>
                </div>
            {/*</Fade >*/}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.todoReducer.isAuth,
    }
};

export default connect(mapStateToProps, {LoginThunk})(LoginApp);