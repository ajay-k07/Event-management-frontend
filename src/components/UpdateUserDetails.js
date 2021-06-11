import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify"


const UpdateUser = (props) => {
    const [values, setValues] = useState({ firstname: "", lastname: "", rollno: "", department: "", email: "", password: "", confirmpassword: "" });

    const notify = () => {
        toast.dark("Account Details Updated Sucessfully")
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setValues(
            {
                ...values,
                [name]: value
            });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await api.put("/user/profile", values,)
            console.log(response.data);
            notify()
            props.history.push("/user/profile")
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        const getDetails = async () => {
            try {
                const result = await api.get("/user/profile");
                const userdata = result.data;
                setValues({ ...values, firstname: userdata.firstname, lastname: userdata.lastname, rollno: userdata.rollno, department: userdata.department, email: userdata.email });
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="my-content">
            <form className="text-center border border-light p-5" onSubmit={handleSubmit} noValidate>
                <div className="form-row mb-4">
                    <div className="col">
                        <input type="text" name="firstname" className="form-control " placeholder="First Name" value={values.firstname} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input type="text" name="lastname" className="form-control" placeholder="Last Name" value={values.lastname} onChange={handleChange} />
                    </div>
                </div>
                <input type="text" name="rollno" className="form-control " placeholder="Roll No" value={values.rollno} onChange={handleChange} />
                <br />
                <select id="department" className="form-control" name="department" value={values.department} onChange={handleChange} >
                    <option value="">Select a Department</option>
                    <option value="MECH">MECH</option>
                    <option value="EEE">EEE</option>
                    <option value="ECE">ECE</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                </select>
                <br />
                <input type="email" name="email" className="form-control mb-4" placeholder="E-mail" value={values.email} onChange={handleChange} />
                <h3>CHANGE PASSWORD</h3>
                <input type="password" name="password" className="form-control" placeholder="Password" value={values.password} onChange={handleChange} />
                <br />
                <input type="password" name="confirmpassword" className="form-control" placeholder="Confirm Password" value={values.confirmpassword} onChange={handleChange} />
                <button className="btn btn-info my-4 btn-block" type="submit">UPDATE</button>
                <button className="btn btn-danger my-4 btn-block" onClick={() => { props.history.push("/user/profile") }}>CANCEL</button>
            </form>
        </div>
    )
}
export default UpdateUser;