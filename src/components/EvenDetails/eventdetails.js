import React, { useState, useEffect } from 'react';
import StripeContainer from "../Stripe/StripeContainer";
import moment from 'moment';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { isAuthenticated } from "../../Auth/auth";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';
import './evendetails.css';

const EventDetails = (props) => {
    const [event, setEvent] = useState({});
    const [modal, setModal] = useState(false);
    var [currentdate, setcurrentDate] = useState(new Date());
    const [isRegistered, setIsRegistered] = useState(false);
    const [isAttended, setIsAttended] = useState(false);
    const user = isAuthenticated();
    let user_id = user._id;
    let isAdmin = user.isAdmin;
    const toggle = () => setModal(!modal);

    const fullname = (firstname, lastname) => {
        return firstname + " " + lastname;
    };

    let full = fullname(user.firstname, user.lastname)
    const closeBtn = (
        <button className="close" onClick={toggle}>
            &times;
        </button>
    );

    useEffect(() => {
        fetchData();
        Register();
        Attend();
        fetchCurrentDate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCurrentDate = async () => {
        var timer = setInterval(() => setcurrentDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }

    const fetchData = async () => {
        try {
            const url = "/event/" + props.match.params.id;
            const result = await api.get(url);
            setEvent(result.data);
        } catch (error) {
            console.log(error.response.data.message);
            props.history.push("/login");
        }
    };

    const Register = async () => {
        try {
            const url = "/isregister/" + props.match.params.id;
            const result = await api.get(url, { headers: { user_id } });
            if (result.data.isRegister) {
                setIsRegistered(true)
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const Attend = async () => {
        try {
            const url = "/isattend/" + props.match.params.id;
            const result = await api.get(url, { headers: { user_id } });
            if (result.data.isAttend) {
                setIsAttended(true)
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const registerEvent = async () => {
        try {
            const response = await api.post("/event/" + props.match.params.id + "/register");
            console.log(response.data);
            toast.dark(response.data.message)
            props.history.push("/user/profile");
        } catch (error) {
            console.log(error)
        }
    }

    const acceptUser = async (id, eventid) => {
        try {
            let user_id = id;
            await api.get("/" + props.match.params.id + "/accept", { headers: { user_id } });
            props.history.push({
                pathname: `/quiz/${eventid}`
            });
        } catch (error) {
            console.log(error)
        }
    }

    const downloadcertificate = async (name) => {
        try {
            const response = await api({
                url: '/generatecertificate',
                method: 'POST',
                responseType: 'blob',
                data: { name }
            });
            const file = new Blob(
                [response.data],
                { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit = async ev => {
        ev.preventDefault();
        try {
            const details = {
                message: ev.target.message.value
            }
            const response = await api.post("/sendmails/" + props.match.params.id, details);
            console.log(response.data);
            toggle();
            toast.dark(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="my-content">
            <br />
            <div className="container ">
                <div className="row">
                    <div className="col-md-5">
                        <div className="project-info-box mt-0">
                            <h5>EVENT DESCRIPTION</h5>
                            <p className="mb-0">{event.description}</p>
                        </div>
                        <div className="project-info-box">
                            <h5>EVENT DETAILS</h5>
                            <p><b>TITLE:</b>{event.title}</p>
                            <p><b>CATEGORY:</b> {event.category}</p>
                            <p><b>DATE:</b>{moment(event.date).format('L')}</p>
                            <p><b>SPONSORS:</b> {event.sponsors}</p>
                            {event.price === 0 ? (<p className="price mb-0"><b>PRICE:</b>FREE</p>) : (<p className="price mb-0"><b>PRICE:</b>{event.price}</p>)}
                        </div>
                    </div>
                    <div className="col-md-7">
                        <img className="event-details-img" src={event.thumbnail} alt="projectimage" class="rounded" />
                        <div className="project-info-box">
                            <p><b>REGISTRATION ENDS ON:</b> {moment(event.registrationenddate).format('L')}</p>
                            <p style={{ color: "#FF0000" }}>NOTE : Once Registered, You cannot unregister .</p>
                            {
                                isAdmin ? (
                                    <>
                                        <Button color="danger" onClick={toggle}>SEND DETAILS</Button>
                                        <Modal isOpen={modal} toggle={toggle} >
                                            <ModalHeader className=" border-0" cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={toggle} close={closeBtn}>
                                                SEND DETAILS ABOUT EVENT
                                            </ModalHeader>
                                            <ModalBody>
                                                <Form onSubmit={handleFormSubmit}>
                                                    <FormGroup>
                                                        <Label for="message">message</Label>
                                                        <Input type="text" name="message" id="message" placeholder="Enter Message" required />
                                                    </FormGroup>
                                                    <Button color="primary">SUBMIT</Button>{' '}
                                                    <Button color="danger" onClick={toggle}>CANCEL</Button>
                                                </Form>
                                            </ModalBody>
                                        </Modal>
                                    </>
                                ) : (
                                    isRegistered ?
                                        (
                                            event.category === "Technical Competitions" ? (
                                                (moment(event.date).format('L') === moment(currentdate).format('L') && !isAttended) ? (
                                                    <>
                                                        <Button color="danger" disabled>REGISTERED</Button>
                                                        <Button color="warning" className="event-button" onClick={() => { acceptUser(user_id, event._id) }} >PARTICIPATE</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p style={{ color: "#FF0000" }}>You can participate at the Event date or You participated already </p>
                                                        <Button color="danger" disabled>REGISTERED</Button>
                                                        <Button color="warning" className="event-button" disabled>PARTICIPATE</Button>
                                                        <Button color="warning" className="event-button" onClick={() => { downloadcertificate(full) }}>Download Certificate</Button>
                                                    </>
                                                )
                                            ) :
                                                (
                                                    <>
                                                        <Button color="danger" disabled>REGISTERED</Button>
                                                        <Button color="warning" className="event-button" onClick={() => { downloadcertificate(full) }}>Download Certificate</Button>
                                                    </>
                                                )
                                        ) :
                                        (event.price === 0 ?
                                            (<Button color="danger" onClick={registerEvent}>REGISTER</Button>)
                                            :
                                            (<>
                                                <Button color="danger" onClick={toggle}>REGISTER</Button>
                                                <Modal isOpen={modal} toggle={toggle} >
                                                    <ModalHeader className=" border-0" cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={toggle} close={closeBtn}>
                                                        PAY FOR EVENT REGISTRATION
                                                    </ModalHeader>
                                                    <StripeContainer event={event} register={registerEvent} />
                                                </Modal>
                                            </>)
                                        )
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails;