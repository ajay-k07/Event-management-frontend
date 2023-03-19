import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import api from '../../services/api';
import { Button } from 'reactstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./home.css";


function Content(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async (filter) => {
    const url = filter ? `/events/${filter}` : '/events'
    const response = await api.get(url)

    setEvents(response.data)
  };

  const ShowDetails = (id) => {
    props.history.push({
      pathname: `/event/${id}`
    });
  }

  return (
    <div className="content my-content" >
      <div className="carousel-wrapper">
        <Carousel infiniteLoop showThumbs={false} dynamicHeight useKeyboardArrows autoPlay>
          <div>
            <img src="/images/img-01.jpg" alt="ss1" className='images'/>
          </div>
          <div>
            <img src="/images/img-02.jpg" alt="ss2" className='images'/>
          </div>
          <div>
            <img src="/images/img-03.jpg" alt="ss3" className='images'/>
          </div>
          <div>
            <img src="/images/img-04.jpeg" alt="ss4" className='images'/>
          </div>
        </Carousel>
      </div>
      <br /><br />
      <h3><b>LATEST EVENTS</b></h3>
      {
        events.reverse().splice(0, 2).map(event => (
          <div key={event._id} className="container my-container">
            <div className="row my-row" >
              <div className=" col-md col-sm  my-col ">
                <img src={event.thumbnail} className="img-circle img-center " alt="event-img" height="200px" width="300px" />
              </div>
              <div className=" col-md col-sm  my-col ">
                <b>Event Category : </b>
                {event.category}
              </div>
              <div className=" col-md col-sm  my-col ">
                <b> Event Price : </b>
                {event.price === 0 ? "FREE" : `${event.price}`}
              </div>
              <div className=" col-md col-sm  my-col ">
                <Button onClick={() => { ShowDetails(event._id) }}>VIEW DETAILS</Button>
              </div>
            </div>
            <br /><br />
          </div>
        ))
      }
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-3 ">
            <img className="about-us-image" alt="aboutusimage" src="/images/aboutus.jpg" />
          </div>
          <div className="col-md-9">
            <h3><b>ABOUT US</b></h3>
            <p>A legacy being carried forward by like-minded individuals aims to collaborate the intellects of programmers, designers, application developers, tech-geeks and newbies in the world of programming for the intensive development of a hack.</p>
            <p> At hackCBS, we help you turn your ideas into reality by providing a comforting and welcoming enviornment. You’ll have all the freedom to create a product, learn new things, and to have hilariously funny moments with your friends. Moreover, we’ll offer you a chance to network with working professionals and hacker community leaders.</p>
            <p>If you haven’t participated in any hackathon before and if you’re looking out for the opportunity to do so, you’re in the right place. We welcome all newcomers and veterans alike. You are about to witness a series of events which will enlighten as well as enhance your skills.</p>
          </div>
        </div>
      </div>
      <br />
    </div>
  );

}
export default Content;