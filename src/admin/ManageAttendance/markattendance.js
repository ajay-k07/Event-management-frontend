import React, { useState, useEffect } from "react";
import { Container, Form, FormGroup, Input, Table, ModalBody, ModalHeader, Modal, Button } from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {FaFileDownload} from "react-icons/fa";
import api from "../../services/api";
import Message from "../../components/Message";
import ModalFooter from "reactstrap/lib/ModalFooter";


const MarkAttendance = (props) => {
    const [rollno, setRollno] = useState("");
    const [user, setUser] = useState([]);
    const [attendedusers, setAttendedusers] = useState([]);
    const [marks, setMarks] = useState([]);
    const [modal, setModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    

    const toggle = () => setModal(!modal);
    const fullname = (firstname,lastname) => {
        return  firstname + " " + lastname ;
    };


    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            if (rollno !== "") {
                const response = await api.post("/searchuser", { rollno: rollno });
                setUser(response.data)
                setRollno("");
            }
            else {
                setErrorMessage("please Fill user rollno")
            }
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
        getRegisteredUsers();
        getMarks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getRegisteredUsers = async () => {
        try {
            const url = "/event/" + props.match.params.id + "/attendedusers"
            const response = await api.get(url)
            console.log(response.data)
            setAttendedusers(response.data.users)
        } catch (error) {
            console.log(error);
        }
    }

    const getMarks = async() =>{
        try {
            const response = await api.get("/" + props.match.params.id + "/marks");
            console.log(response)
            setMarks(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const acceptUser = async (id) => {
        try {
            const user_id = id;
            await api.get("/" + props.match.params.id + "/accept", { headers: { user_id } });
            toggle();
            getRegisteredUsers();
        } catch (error) {
            console.log(error)
        }
    }


    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        let orderedmarks=[]
        attendedusers.map(users =>{
            marks.map(mark =>{
                if(users._id === mark.user){
                    orderedmarks.push(mark.marks)
                }
            })
        })
        console.log(orderedmarks)
        const headers = [["NAME", "EMAILID", "ROLLNO", "DEPARTMENT","MARKS"]];
        console.log(attendedusers)
        let data = attendedusers.map((user,index) => [fullname(user.firstname,user.lastname),user.email,user.rollno,user.department,orderedmarks[index]]);

        let content = {
            startY: 50,
            theme: 'grid',
            head: headers,
            body: data,
        };

        doc.setLineWidth(2);
        doc.text( "ATTENDED STUDENTS",200,40);
        doc.autoTable(content);
        doc.save("attendedlist.pdf")
    }


    return (
        <Container className="content my-content pt-3">
            <h2 style={{ textAlign: "center",marginBottom: "15px" }}>MARK ATTENDANCE</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Input id="rollno" bsSize="md" type="text" value={rollno} placeholder={'Enter User RollNo'} onChange={(evt) => setRollno(evt.target.value)} required />
                </FormGroup>
                <Button type="submit" color="info" onClick={toggle} >Search User</Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader className=" border-0" cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={toggle} >
                    USER DETAILS
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <img src={user.profilepic} alt="dummy" className="profile-pic" />
                        <hr />
                        <h5>NAME : {fullname(user.firstname,user.lastname)}</h5>
                        <hr />
                        <h5>EMAIL ID : {user.email}</h5>
                        <hr />
                        <h5>ROLL NO : {user.rollno}</h5>
                        <hr />
                        <h5>DEPARTMENT : {user.department}</h5>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={() => { acceptUser(user._id) }}>ACCEPT</Button>
                    <Button color="danger" onClick={toggle}>REJECT</Button>
                </ModalFooter>
            </Modal>
            {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
            <br />
            <div className="separator"><h4> EVENT PARTICIPATED USERS</h4></div>
            <Button onClick={exportPDF} color="danger" className="float-right mb-2"><FaFileDownload/> Download Attended Students List</Button>
            <br />
            <Table dark bordered responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>RollNo</th>
                        <th>Department</th>
                        <th>EmailID</th>
                    </tr>
                </thead>
                <tbody>
                    {attendedusers.length > 0 ? (
                        attendedusers.map((user) => (
                            <tr key={user._id}>
                                <td>{fullname(user.firstname,user.lastname)}</td>
                                <td>{user.rollno}</td>
                                <td>{user.department}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td colSpan={3}>No users</td>
                            </tr>
                        )}
                </tbody>
            </Table>
        </Container>
    )
}
export default MarkAttendance;