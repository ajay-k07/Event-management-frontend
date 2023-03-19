import React from 'react';
import useForm from "./useForm";
import validate from './LoginFormValidationRules';
import Message from '../Message';
import "./login.css"


const Login = (props) => {
    const {
        values,
        errors,
        errorMessage,
        handleChange,
        handleSubmit,
    } = useForm(logging, validate, props);

    function logging() {
        console.log('No errors, submit callback called!');
    }

    return (
        <div className="my-content">
            <div className="container my-container3">
                <h2 style={{marginBottom: "10px"}}>LOGIN</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='individual-div'>
                        <label htmlFor="email" >Email Address</label>
                        <div >
                            <input autoComplete="off" className="form-control" type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                            {errors.email && (
                                <p className="error fs-6">{errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className='individual-div'>
                        <label htmlFor="password">Password</label>
                        <div >
                            <input className="form-control" type="password" name="password" onChange={handleChange} value={values.password || ''} required />
                        </div>
                        {errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                    </div>
                    <button className="btn btn-info my-2" type="submit">Login</button>
                    <br />
                    <hr />
                    <h6>Forgot password ?<a href="/user/reset-password">Click Here</a></h6>
                    <h6>Haven't Registered <a href="/signup">Click Here</a></h6>
                    {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                </form>
            </div>
        </div>
    );
}
export default Login;