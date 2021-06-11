import React, { useEffect, useState } from 'react';
import { Button, Table, Input } from 'reactstrap';
import { withRouter } from "react-router-dom";
import Message from "../../components/Message";
import { MdDelete } from "react-icons/md";
import api from '../../services/api';


const EventTable = (props) => {
    const [registeredusers, setRegisteredusers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const results = !searchTerm
        ? registeredusers
        : registeredusers.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    useEffect(() => {
        getRegisteredUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getRegisteredUsers = async () => {
        try {
            const url = "/event/" + props.match.params.id + "/registeredusers"
            const response = await api.get(url)
            console.log(response.data)
            setRegisteredusers(response.data.users)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const user_id = id;
            await api.delete("/event/" + props.match.params.id + "/unregister", { headers: { user_id } });
            getRegisteredUsers();
            setSuccessMessage("Registered User Deleted Sucessfully")
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
            <br />
            <h2 style={{ textAlign: "center" }}>REGISTERED USERS</h2>
            <br />
            <Input
                type="text"
                placeholder="Search User By Email "
                value={searchTerm}
                onChange={(evt) => setSearchTerm(evt.target.value)}
            />
            <br/>
            <Table dark bordered responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>RollNo</th>
                        <th>Department</th>
                        <th>EmailID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstname}</td>
                                <td>{user.rollno}</td>
                                <td>{user.department}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button color="danger" className="event-button" onClick={() => { deleteUser(user._id) }}><MdDelete /></Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td colSpan={3}>No users</td>
                            </tr>
                        )}
                </tbody>
            </Table>
            {successMessage && <Message variant="success">{successMessage}</Message>}
            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
        </div>
    )
}

export default withRouter(EventTable);