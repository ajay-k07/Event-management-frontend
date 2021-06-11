import React, { useState, useEffect } from 'react';
import {  Input } from 'reactstrap';
import api from '../../services/api';
import EventTable from './registrationeventtable';


const ManageEvents = (props) => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const registeredUsers = async (id) => {
        props.history.push({
            pathname: "/admin/" + id + "/registeredusers"
        });
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
            </div>
            <br/>
            <div className="row text-center">
                <EventTable results={results} registeredUsers={registeredUsers}  />
            </div>
        </div>
    )
}

export default ManageEvents;