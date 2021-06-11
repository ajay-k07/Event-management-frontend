import  { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';


const useForm = (callback, validate, props) => {

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const notify = (first, last) => {
    const full = first + " " + last
    toast.dark(`${full} logged in successfully`)
  }

  const handleSubmit = async event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    try {
      if (values.email !== "" && values.password !== "") {
        const response = await api.post('/login', values);
        let { accessToken, refreshToken, user } = response.data;
        const userId = user._id || false;
        if (userId && accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          notify(user.firstname, user.lastname)
          props.history.push('/events')
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    }
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    values,
    errors,
    errorMessage,
    handleChange,
    handleSubmit,
  }
};

export default useForm;