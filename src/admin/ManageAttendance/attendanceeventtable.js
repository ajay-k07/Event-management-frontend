import React from 'react'
import { Button, Table } from 'reactstrap';
import { withRouter } from "react-router-dom"
import { IoMdCheckmarkCircle } from "react-icons/io"

const EventTable = (props) => {


    return (
        <Table dark  bordered responsive>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {props.results.length > 0 ? (
                    props.results.map((event) => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{event.category}</td>
                            <td>
                                <Button color="warning" className="event-button" onClick={() => { props.markAttendance(event._id) }}> <IoMdCheckmarkCircle size="1rem" /> Mark Attendance</Button>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                          <td colSpan={3}>No events</td>
                        </tr>
                      )}
            </tbody>
        </Table>
    )
}

export default withRouter(EventTable);