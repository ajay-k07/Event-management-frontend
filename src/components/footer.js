import React from 'react';
import {FaHome ,FaEnvelope,FaPhone,FaPrint,FaFacebook,FaTwitter,FaInstagramSquare, FaLinkedin} from "react-icons/fa";

function Footer(){
    return(
        <div className="footer my-footer">
            <br/><br/>
            <div className="container-fluid my-background text-white ">
                <div className="row">
                    <div className=" col-md-4 col-sm-4 ">
                        <h4>EVENT MANAGEMENT</h4>
                        <p>Participate in Hackathons and Workshops , Win Amazing prizes and gifts from us
                            Go Fast and Register   </p>
                    </div>
                    <div className=" col-md-3 col-sm-3 ">
                        <h4>SERVICES</h4>
                        <ul className="list-unstyled ">
                            <li>
                                <p>
                                    <a href="/" id="one">HOME</a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/events" id="one">EVENTS</a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/signup" id="one">SIGN UP</a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/login" id="one">LOGIN</a>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className=" col-md-3 col-sm-3 ">
                        <h4>ADDRESS</h4>
                        <ul className="list-unstyled">
                            <li>
                                <p>
                                    <FaHome/>TAMIL NADU, INDIA
                                </p>
                            </li>
                            <li>
                                <p>
                                    <FaEnvelope/>info@example.com
                                </p>
                            </li>
                            <li>
                                <p>
                                    <FaPhone/>+91 1234567890
                                </p>
                            </li>
                            <li>
                                <p>
                                    <FaPrint/>+91 1234567890
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className=" col-md-2 col-sm-2 ">
                        <h4>FOLLOW US</h4>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://www.facebook.com/kumar.poshika/" type="button" className="btn-floating btn-large btn-fb">
                                    <FaFacebook  size="2rem"/>
                                </a>
                            </li>
                            <br/>
                            <li>
                                <a href="https://twitter.com/appun_ram" type="button" className="btn-floating btn-tw">
                                    <FaTwitter size="2rem"/>
                                </a>
                            </li>
                            <br/>
                            <li>
                                <a href="https://www.instagram.com/appun_ram/" type="button "  className="btn-floating btn-gplus">
                                    <FaInstagramSquare  size="2rem"/>
                                </a>
                            </li>
                            <br/>
                            <li>
                                <a href="https://www.linkedin.com/in/ram-kumar-674704189/" type="button" className="btn-floating btn-large btn-li">
                                    <FaLinkedin  size="2rem"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid my-background text-center">
                <p className="text-white">&copy; 2020 Copyright: <a  id="one" href="/" >Eventmanagement.com</a></p>
            </div>
        </div>
    );
}
export default Footer;