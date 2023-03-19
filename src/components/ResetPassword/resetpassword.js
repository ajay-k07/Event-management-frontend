import React, { useState } from "react";
import api from "../../services/api";
import Message from "../Message";

const ForgotPassword = (props) => {
  const [values, setValues] = useState({ password: "", confirmpassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const PasswordReset = async () => {
    try {
      const token = props.match.params.token;
      const { password, confirmpassword } = values;
      if (password.length > 7 && confirmpassword.length > 7) {
        const response = await api.put("/resetpassword", {
          password,
          confirmpassword,
          token,
        });
        console.log(response.data);
        setValues({ password: "", confirmpassword: "" });
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage(
          "Password Should be more than or equal to 8 characters"
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    }
  };

  return (
    <div className="my-content">
      <div className="container my-container3">
        <h3 style={{ marginBottom: "20px" }}>CHANGE PASSWORD</h3>
        <div className="individual-div">
          <div style={{marginBottom: "20px"}}>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              placeholder="Enter Confirm Password"
              value={values.confirmpassword}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-info my-3" onClick={() => PasswordReset()}>
            Reset Password
          </button>
          {errorMessage && <Message variant="danger">{errorMessage}</Message>}
          {successMessage && (
            <Message variant="success">{successMessage}</Message>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
