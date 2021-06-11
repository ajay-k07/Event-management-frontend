import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Message from '../Message';

const ForgotPassword = (props) => {
    const [values, setValues] = useState({ password: "", confirmpassword: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = event => {
        const { name, value } = event.target;
        setValues(
            {
                ...values,
                [name]: value
            });
    };

    const UpdatePassword = async () => {
        try {
            const { password, confirmpassword } = values
            if (password.length > 7 && confirmpassword.length > 7) {
                const response = await api.put("/updatepassword", { password, confirmpassword })
                console.log(response.data);
                const RefreshToken = localStorage.getItem("refreshToken")
                await api.post("/logout", RefreshToken)
                localStorage.removeItem("user");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                toast.dark(response.data.message);
                props.history.push("/login")
            } else {
                setErrorMessage("Password Should be more than or equal to 8 characters");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        }
    }

    return (
        <div className="my-content">
            <div className="container my-container3">
                <br /><br />
                <h3>CHANGE PASSWORD</h3>
                <input type="password" name="password" className="form-control" placeholder="Enter Password" value={values.password} onChange={handleChange} />
                <br />
                <input type="password" name="confirmpassword" className="form-control" placeholder="Enter Confirm Password" value={values.confirmpassword} onChange={handleChange} />
                <br />
                <button className="btn-info" onClick={() => UpdatePassword()}>
                    Reset Password
                </button>
                <br />
                <br />
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
            </div>
        </div>
    )
}

export default ForgotPassword;
