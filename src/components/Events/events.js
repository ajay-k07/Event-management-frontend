import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ButtonGroup, Button } from 'reactstrap';
import "./events.css";

function Event(props) {
  const [events, setEvents] = useState([]);
  const [rSelected, setRSelected] = useState(null);


  useEffect(() => {
    getEvents()
  }, [])

  const filterHandler = (query) => {
    setRSelected(query)
    getEvents(query)
  }

  const getEvents = async (filter) => {
    const url = filter ? `/events/${filter}` : '/events'
    const response = await api.get(url);
    setEvents(response.data);
  };

  const ShowDetails = (id) => {
    props.history.push({
      pathname: `/event/${id}`
    });
  }

  return (
    <div className="my-content">
      <br />
      <div>Filter :{' '}
        <ButtonGroup className="btn-group" >
          <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All Events</Button>
          <Button color="primary" onClick={() => filterHandler("Conference")} active={rSelected === 'Conference'}>Conference</Button>
          <Button color="primary" onClick={() => filterHandler("Workshop")} active={rSelected === 'Workshops'}>Workshops</Button>
          <Button color="primary" onClick={() => filterHandler("Hackathon")} active={rSelected === 'Hackathons'}>Hackathons</Button>
          <Button color="primary" onClick={() => filterHandler("Technical Competitions")} active={rSelected === 'Technical Competitions'}>Technical Competitions</Button>
          <Button color="primary" onClick={() => filterHandler("Programming Competitions")} active={rSelected === 'Programming Competitions'}>Programming Competitions</Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="container my-container">
        {events.map(event => {
          return (
            <div key={event._id}>
              <div className="row  my-row" >
                <div className=" col-md col-sm  my-col ">
                  <img src={event.thumbnail} className="img-circle img-center " alt="eventimg" height="200px" width="300px" />
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
      <br />
    </div>
  );
}
export default Event;

