import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Label, } from 'reactstrap';
import moment from 'moment';
import { GoDeviceCamera } from "react-icons/go";
import Message from "../../components/Message";
import "./example.css";
import { toast } from 'react-toastify';


const CreateEvent = ({ history, match }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState("");
    const [sponsors, setSponsors] = useState("");
    const [date, setDate] = useState('');
    const [registrationenddate, setEndDate] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [editthumbnail, setEditThumbnail] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { id } = match.params;
    const isAddMode = !id;

    const notify = () => {
        toast.dark("Event Updated Sucessfully")
    }

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSponsors("");
        setDate("");
        setEndDate("");
        setThumbnail(null);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        return isAddMode ? CreateEvent(event) : UpdateEvent(event, id);
    }

    const CreateEvent = async (event) => {
        const eventData = new FormData();

        eventData.append("thumbnail", thumbnail);
        eventData.append("category", category);
        eventData.append("title", title);
        eventData.append("price", price);
        eventData.append("description", description);
        eventData.append("sponsors", sponsors);
        eventData.append("date", date);
        eventData.append("registrationenddate", registrationenddate);
        try {
            if (title !== "" &&
                description !== "" &&
                category !== "" &&
                price !== "" &&
                sponsors !== "" &&
                registrationenddate !== "" &&
                date !== "" &&
                thumbnail !== null
            ) {
                console.log("Event has been sent");
                await api.post("/admin/createevent", eventData);
                setSuccessMessage("Event Sucessfully Created");
                resetForm();
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            } else {
                setErrorMessage("Missing Required Information");
                setTimeout(() => {
                    setErrorMessage("")
                }, 3000);

                console.log("Missing required data");
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    }

    const UpdateEvent = async (id) => {
        try {
            const eventData = new FormData();

            eventData.append("thumbnail", thumbnail);
            eventData.append("category", category);
            eventData.append("title", title);
            eventData.append("price", price);
            eventData.append("description", description);
            eventData.append("sponsors", sponsors);
            eventData.append("date", date);
            eventData.append("registrationenddate", registrationenddate);
            await api.put("/manageevents/" + match.params.id, eventData);
            notify()
            history.push("/admin/events")
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        }
    }

    useEffect(() => {
        if (!isAddMode) {
            api.get("/event/" + match.params.id,).then(user => {
                const details = user.data
                setTitle(details.title)
                setDescription(details.description)
                setCategory(details.category)
                setPrice(details.price)
                setEditThumbnail(details.thumbnail)
                setSponsors(details.sponsors)
                setDate(moment(details.date).format("YYYY-MM-DD"));
                setEndDate(moment(details.registrationenddate).format("YYYY-MM-DD"));
                console.log(details)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ChangeThumbnail = async (event) => {
        setThumbnail(event.target.files[0])
        setEditThumbnail(null)
    }


    return (
        <Container className="content my-content">
            <h2 style={{ textAlign: "center" }}>{isAddMode ? "Add Event" : "Edit Event"}</h2>
            <br /><br />
            <Form onSubmit={submitHandler}>
                {
                    isAddMode ? (
                        <br />
                    ) : (editthumbnail ?
                        (<FormGroup>
                            <img className="editeventimg" src={editthumbnail} alt="projectimage" width="300" height="200"/>
                        </FormGroup>) : (<br />)
                        )
                }
                <FormGroup>
                    <Label>Upload Image: </Label>
                    <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                        <Input type="file" onChange={ChangeThumbnail} />
                        <GoDeviceCamera />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Title: </Label>
                    <Input id="title" type="text" value={title} placeholder={'Event Title'} onChange={(evt) => setTitle(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event description: </Label>
                    <Input id="description" type="text" value={description} placeholder={'Event Description'} onChange={(evt) => setDescription(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event Sponsors: </Label>
                    <Input id="sponsors" type="text" value={sponsors} placeholder={'Event Sponsors'} onChange={(evt) => setSponsors(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event price: </Label>
                    <Input id="price" type="text" value={price} placeholder={'Event Price(Rupees)'} onChange={(evt) => setPrice(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event date: </Label>
                    <Input id="date" type="date" value={date} placeholder={'Event Date'} onChange={(evt) => setDate(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event Registration End Date: </Label>
                    <Input id="registrationenddate" type="date" value={registrationenddate} placeholder={'Registration End Date'} onChange={(evt) => setEndDate(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="category">Choose a category:</label>
                    <select id="category" name="category" value={category} onChange={(evt) => setCategory(evt.target.value)} >
                        <option value="">Select a Category</option>
                        <option value="Conference">Conference</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Technical Competitions">Technical Competitions</option>
                        <option value="Programming Competitions">Programming Competitions</option>
                    </select>
                </FormGroup>
                <Button className="event-button" type="submit" color="info" >
                    {isAddMode ? "Create Event" : "Update Event"}
                </Button>
                <Button className="event-button" color="danger" onClick={() => { history.push("/admin/events") }}>Cancel</Button>
                <br /><br />
            </Form>
            {successMessage && <Message variant="success">{successMessage}</Message>}
            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
        </Container>
    )
}
export default CreateEvent;