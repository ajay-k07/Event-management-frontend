import React, { useState } from 'react';
import api from '../../services/api';
import Message from '../Message';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const resetPassword = async () => {
        try {
            const response = await api.post("/forgot-password", {
                email,
            });
            console.log(response.data);
            setSuccessMessage(response.data.message);
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
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
                <h2>PASSWORD RESET</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn-info" onClick={() => resetPassword()}>
                    reset password
                </button>
                <br/>
                <br/>
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                {successMessage && <Message variant='success'>{successMessage}</Message>}
            </div>
        </div>
    )
}

export default ForgotPassword;
