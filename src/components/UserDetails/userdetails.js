import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import Message from '../Message';
import api from "../../services/api";
import "./userdetails.css";


const UserDetails = (props) => {
    const [userdata, setUserdata] = useState([]);
    const [myevents, setMyevents] = useState([]);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [errorMessage, setErrorMessage] = useState("");
    let myEvents = [];

    useEffect(() => {
        getDetails()
        getMyEvents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getDetails = async () => {
        try {
            const result = await api.get("/user/profile");
            setUserdata(result.data);
        } catch (error) {
            console.log(error.response.data.message);
            props.history.push("/login");
        }
    };

    const getMyEvents = async () => {
        try {
            const response = await api.get("/myevents");
            response.data.forEach(data => {
                myEvents.push(data.event)
            });
            console.log(myEvents);
            setMyevents(myEvents)
        } catch (error) {
            console.log(error);
        }
    }

    const fullname = () => {
        return userdata.firstname + " " + userdata.lastname;
    };

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const handleUpdate = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("profilepic", image.raw);
            await api.put("/user/profilephoto", formData)
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        }
    };

    const handleCancel = () => {
        window.location.reload();
    }

    const ShowDetails = (id) => {
        props.history.push({
            pathname: `/event/${id}`
        });
    }

    return (
        <div className="content my-content">
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-md-4 ">
                        <label htmlFor="upload-button">
                            {image.preview ?
                                (
                                    <img src={image.preview} alt="dummy" className="profile-pic" />
                                ) : (
                                    <div className="change-photo">
                                        <img src={userdata.profilepic} alt="dummy" className="profile-pic" />
                                        <div className="change-text">
                                            <h3>CHANGE PHOTO</h3>
                                        </div>
                                    </div>

                                )}
                        </label>
                        <input
                            type="file"
                            id="upload-button"
                            style={{ display: "none" }}
                            onChange={handleChange}
                        />
                        <br />
                        {image.raw ?
                            (
                                <div>
                                    <button className="btn-info event-button" onClick={handleUpdate}>Update</button>
                                    <button className="btn-danger event-button" onClick={handleCancel}>Cancel</button>
                                </div>
                            ) : (
                                <></>
                            )
                        }

                    </div>
                    <div className="col-md-8">
                        <h5>NAME : {fullname()}</h5>
                        <hr />
                        <h5>EMAIL ID : {userdata.email}</h5>
                        <hr />
                        <h5>ROLL NO : {userdata.rollno}</h5>
                        <hr />
                        <h5>DEPARTMENT : {userdata.department}</h5>
                        <hr />
                        <Button color="info" onClick={() => { props.history.push("/user/updateprofile") }}>Update Details</Button>
                    </div>
                    {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                </div>
                <br />
                <div className="separator"><h4>MY EVENTS</h4></div>
                <div className="container ">
                    {myevents.map(event => {
                        return (
                            <div key={event._id}>
                                <div className="row  my-row" >
                                    <div className=" col-md col-sm  my-col ">
                                        <img src={event.thumbnail} className="img-circle img-center " alt="eventimage" height="200px" width="300px" />
                                    </div>
                                    <div className=" col-md col-sm  my-col ">
                                        <strong>Event Category : </strong>
                                        {event.category}
                                    </div>
                                    <div className=" col-md col-sm  my-col ">
                                        <strong> Event Price : </strong>
                                        {event.price === 0 ? "FREE" : `${event.price}`}
                                    </div>
                                    <div className=" col-md col-sm  my-col ">
                                        <Button onClick={() => { ShowDetails(event._id) }}>VIEW DETAILS</Button>
                                    </div>
                                </div>
                                <br />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}
export default UserDetails;