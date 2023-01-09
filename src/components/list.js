import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import "react-datepicker/dist/react-datepicker.css";


export default function List() {

    const [showUpdate, setUpdateShow] = useState(false);

    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);

    const [showCreate, setCreateShow] = useState(false);

    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);

    const [APIData, setAPIData] = useState([]);

    const [userData, setUserData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        address: "",
        birth_date: "",
        gender: "",
    });

    const handleChange = (e) =>
        setUserData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

    // Fields
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [address, setAddress] = useState('');
    // const [birthDate, setBirthDate] = useState(new Date());
    // const [gender, setGender] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8082/api/users`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8082/api/users/${id}`)
            .then(() => {
                getUsers();
            })
    }

    const getUsers = () => {
        axios.get(`http://localhost:8082/api/users`)
            .then((response) => {
                setAPIData(response.data);
            })
    }

    const getUser = (id) => {
        axios.get(`http://localhost:8082/api/users/${id}`)
            .then((response) => {
                setUserData(response.data);
            })
            .finally(() => {
                handleUpdateShow();
            })
    }

    const updateUser = (id) => {

        axios.put(`http://localhost:8082/api/users/${id}`, {
            first_name: userData.first_name,
            last_name: userData.last_name,
            address: userData.address,
            birth_date: userData.birth_date,
            gender: userData.gender,
        }).then(() => {
            getUsers();
            handleUpdateClose();
        })
    }

    const createUser = () => {
        axios.post(`http://localhost:8082/api/users`, {
            first_name : userData.first_name,
            last_name : userData.last_name,
            address : userData.address,
            birth_date : userData.birth_date,
            gender : userData.gender,
        }).then(() => {
            handleCreateClose();
            getUsers();
        })
    }

    return (
        <Container>
            <Row>
                <Col><h2 className="text-center mt-5">CRUD with GoLang + React</h2></Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="success" className="mb-3" onClick={() => { handleCreateShow(); }}>Add User</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">ID #</th>
                                <th className="text-center">First Name</th>
                                <th className="text-center">Last Name</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {APIData.map((data, key) => {
                                return (
                                    <tr key={key}>
                                        <td className="text-center">{data.id}</td>
                                        <td className="text-center">{data.first_name}</td>
                                        <td className="text-center">{data.last_name}</td>
                                        <td className="text-center">
                                            <Button variant="primary" onClick={() => { getUser(data.id); }}>View</Button>{' '}
                                            <Button variant="danger" onClick={() => deleteUser(data.id)}>Delete</Button>{' '}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table></Col>

            </Row>


            <Modal show={showUpdate} onHide={handleUpdateClose}>

                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="Enter first name" value={userData.first_name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="last_name" placeholder="Enter last name" value={userData.last_name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Enter address" value={userData.address} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="text" name="birth_date" placeholder="dd/mm/yyyy" value={userData.birth_date} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="gender" name="gender" value={userData.gender} onChange={handleChange}>
                                <option>Please choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => updateUser(userData.id)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>




            <Modal show={showCreate} onHide={handleCreateClose}>

                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="Enter first name" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="last_name" placeholder="Enter last name" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Enter address" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="text" name="birth_date" placeholder="dd/mm/yyyy" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="#">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="gender" name="gender" value={userData.gender} onChange={handleChange}>
                                <option>Please choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => createUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}