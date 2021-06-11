import React from 'react'
import { Button, Table } from 'reactstrap';
import { withRouter } from "react-router-dom"
import { FiEdit } from "react-icons/fi"
import { MdDelete } from "react-icons/md"

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
                                <Button color="warning" className="event-button" onClick={() => { props.editEvent(event._id) }}> <FiEdit /></Button>
                                <Button color="danger" className="event-button" onClick={() => { props.deleteEvent(event._id) }}><MdDelete /></Button>
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