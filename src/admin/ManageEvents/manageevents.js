import React, { useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import api from '../../services/api';
import EventTable from './eventtable';
import Message from "../../components/Message";
import { SiAddthis } from "react-icons/si"


const ManageEvents = (props) => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const results = !searchTerm
        ? events
        : events.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );


    const getEvents = async () => {
        try {
            const response = await api.get("/events");
            setEvents(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getEvents()
    }, [])

    const editEvent = async (id) => {
        props.history.push({
            pathname: "/admin/event/update/" + id
        });
    }

    const deleteEvent = async (id) => {
        try {
            await api.delete("/manageregistrations/" + id)
            await api.delete("/manageevents/" + id)
            getEvents()
            setSuccessMessage("Event Deleted Sucessfully")
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        }

    }


    return (
        <div className="container my-content">
            <h2 style={{ textAlign: "center" }}>EVENTS</h2>
            <div className="row ">
                <Input
                    type="text"
                    placeholder="Search Events"
                    value={searchTerm}
                    onChange={(evt) => setSearchTerm(evt.target.value)}
                />
                <Button className="event-button" size="lg" block color="info" onClick={() => { props.history.push("/admin/create/event") }}><SiAddthis />   Add Event</Button>
            </div>
            <div className="row text-center">
                <EventTable results={results} editEvent={editEvent} deleteEvent={deleteEvent} />
            </div>
            {successMessage && <Message variant="success">{successMessage}</Message>}
            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
        </div>
    )
}

export default ManageEvents;