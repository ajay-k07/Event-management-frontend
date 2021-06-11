import React, { useEffect, useState } from "react";
import BarChart from "./charts/barchart";
import PieChart from "./charts/piechart";
import LineChart from "./charts/linechart";
import { RiCalendarEventFill, RiShoppingCartFill } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { GiReceiveMoney } from "react-icons/gi"
import "./admindashboard.css"
import api from "../../services/api";

const AdminDashboard = () => {
    const [eventscount, setEventscount] = useState(0)
    const [userscount, setUserscount] = useState(0)
    const [registercounts, setRegistercount] = useState(0)

    const countEvent = async () => {
        const response = await api.get("/events")
        console.log(response)
        setEventscount(response.data.length)
    }

    const countUser = async () => {
        const response = await api.get("/users")
        setUserscount(response.data.length)
    }

    const countRegister = async () => {
        let count = []
        const response = await api.get("/registrations")
        for (const dataObj of response.data) {
            count.push(dataObj.users.length);
        }
        setRegistercount(count.reduce((a, b) => a + b, 0))
    }

    useEffect(() => {
        countEvent()
        countUser()
        countRegister()
    }, [])

    return (
        <div className="content my-content">
            <br />
            <div className="container">
                <div className=" row">
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-secondary o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <RiCalendarEventFill size={50} />
                                </div>
                                <div className="mr-5">{eventscount} Total Events</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-secondary o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <FaUsers size={60} />
                                </div>
                                <div className="mr-5">{userscount} Total Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-secondary o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <RiShoppingCartFill size={50} />
                                </div>
                                <div className="mr-5">{registercounts} Total Registrations</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-secondary o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <GiReceiveMoney size={50} />
                                </div>
                                <div className="mr-5">10,000 Total Amount</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="container ">
                <h2 style={{ textAlign: "center" }}>Analysis</h2>
                <br />
                <div className="row">
                    <div className="col-xl-6 col-sm-12">
                        <BarChart />
                    </div>
                    <div className="col-xl-6 col-sm-12">
                        <PieChart />
                    </div>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="row">
                    <LineChart />
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;