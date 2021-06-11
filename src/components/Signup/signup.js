import React, { useMemo } from 'react';
import UsesignupForm from './usesignupform';
import Validatesignup from './signupformvalidation';
import Message from '../Message';
import { GoDeviceCamera } from "react-icons/go";
import './signup.css';


const Signup = (props) => {
    const { handleChange, handleImage, handleSubmit, values, profilepic, errors, errorMessage } = UsesignupForm(submit, Validatesignup, props);

    function submit() {
        console.log("Submitted Sucessfully");
    }

    const preview = useMemo(() => {
        return profilepic ? URL.createObjectURL(profilepic) : null;
    }, [profilepic]);

    return (
        <div className="my-content">
            <form className="text-center border border-light p-5" onSubmit={handleSubmit} noValidate>
                <h3>SIGN UP</h3>
                <div className="form-row mb-4">
                    <div className="col">
                        <input type="text" name="firstname" className="form-control " placeholder="First Name" value={values.firstname} onChange={handleChange} />
                        {errors.firstname && (
                            <p className="error">{errors.firstname}</p>
                        )}
                    </div>
                    <div className="col">
                        <input type="text" name="lastname" className="form-control" placeholder="Last Name" value={values.lastname} onChange={handleChange} />
                        {errors.lastname && (
                            <p className="error">{errors.lastname}</p>
                        )}
                    </div>
                </div>
                <input type="text" name="rollno" className="form-control " placeholder="Roll No" value={values.rollno} onChange={handleChange} />
                {errors.rollno && (
                    <p className="error">{errors.rollno}</p>
                )}
                <br/>
                <select id="department" className="form-control" name="department" value={values.department} onChange={handleChange} >
                    <option value="">Select a Department</option>
                    <option value="MECH">MECH</option>
                    <option value="EEE">EEE</option>
                    <option value="ECE">ECE</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                </select>
                {errors.department && (
                    <p className="error">{errors.department}</p>
                )}
                <br/>
                <input type="email" name="email" className="form-control mb-4" placeholder="E-mail" value={values.email} onChange={handleChange} />
                {errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <input type="password" name="password" className="form-control" placeholder="Password" value={values.password} onChange={handleChange} />
                {errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <br />
                <input type="password" name="confirmpassword" className="form-control" placeholder="Confirm Password" value={values.confirmpassword} onChange={handleChange} />
                {errors.confirmpassword && (
                    <p className="error">{errors.confirmpassword}</p>
                )}
                <label>Upload Profile Photo: </label>
                <label id='profilepic' style={{ backgroundImage: `url(${preview})` }} className={profilepic ? 'has-profilepic' : ''}>
                    <input type="file" onChange={handleImage} />
                    <GoDeviceCamera />
                </label>
                <span className="text-danger">NOTE: Photo should be a passport size formal photo. This photo is further used for verification during participation of an event.</span>
                <button className="btn btn-info my-4 btn-block" type="submit">Sign In</button>
                <h5>By Clicking <em>Sign Up</em>,You agree to our Terms and Services</h5>
                <hr />
                <h6>Or Already had a account <a href="/login">Click Here</a></h6>
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
            </form>
        </div>
    );
}
export default Signup;