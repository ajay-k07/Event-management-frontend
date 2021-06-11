import  { useState, useEffect } from "react";
import api from '../../services/api';
import { serialize } from 'object-to-formdata';
import {toast} from "react-toastify"

const UsesignupForm = (callback, Validatesignup, props) => {

    const [values, setValues] = useState({ firstname: "", lastname: "", rollno: "", department: "", email: "", password: "",confirmpassword: "" });
    const [profilepic, setProfilepic] = useState(null);
    const [errors, setErrors] = useState({ firstname: "", lastname: "", rollno: "", department: "", email: "", password: "",confirmpassword: ""});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = event => {
        const { name, value } = event.target;
        setValues(
            {
                ...values,
                [name]: value
            });
    };

    const handleImage = event =>{
        setProfilepic(event.target.files[0])
    }

    const resetForm = () => {
        setValues({ firstname: "", lastname: "", rollno: "", department: "", email: "", password: "", confirmpassword: ""})
        setProfilepic(null)
    }

    const notify = () =>{
        toast.dark("Account Created Successfully , You can login now ")
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors(Validatesignup(values));
        setIsSubmitting(true);
        const realFormData = serialize(values, {indices: true});
        realFormData.append('profilepic',profilepic);
        try {
            if (values.email !== "" &&
                values.password !== "" &&
                values.confirmpassword !== "" &&
                values.firstname !== "" &&
                values.lastname !== "" &&
                values.rollno !== "" &&
                values.department !== "" &&
                values.password.length > 7 &&
                values.confirmpassword.length > 7 && 
                profilepic !== null) {
                await api.post('/register', realFormData);
                props.history.push('/login');
                notify();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
                resetForm();
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    return {
        handleChange,
        handleImage,
        handleSubmit,
        values,
        profilepic,
        errors,
        errorMessage
    };

};
export default UsesignupForm;