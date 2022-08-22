import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import { useSelector, useDispatch } from "react-redux";
import contactsListSlice from "../../redux/contactsList";
import { useNavigate, useParams } from "react-router-dom";

function EditContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const contactsList = useSelector((state) => {
    return state.list.contactsList;
  });

  const itemData = contactsList.find((el) => {
    return el.id === id;
  });

  const onChange = (type) => (e) => {
    switch (type) {
      case "name":
        setName(e.target.value);
        break;

      case "phone":
        setPhone(e.target.value);
        break;

      case "position":
        setPosition(e.target.value);
        break;
    }
  };

  const updatedEl = {
    id: id,
    name: name ? name : itemData.name,
    phoneNumber: phone ? phone : itemData.phoneNumber,
    position: position ? position : itemData.position,
  };

  const toEditContact = () => {
    dispatch(
      contactsListSlice.actions.edit({
        id: id,
        name: updatedEl.name,
        phoneNumber: updatedEl.phoneNumber,
        position: updatedEl.position,
      })
    );
    navigate("/");
  };
  const toRemoveContact = () => {
    navigate("/remove/" + id);
  };
  const handleClose = (type) => () => {
    if (type === "accept") {
      navigate("/");
    }
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Container>
      <h4 className="text-warning">Edit contact</h4>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Undo changes</Modal.Title>
          <CloseButton onClick={handleClose("cross")} />
        </Modal.Header>
        <Modal.Body>
          Please note, all changes will be not saved and you will be redirected
          to contact list
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose("accept")}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Row className="text-start  border-bottom border-warning p-2">
          <Col className="align-self-center">Name:</Col>
          <Col>
            <InputGroup>
              <Form.Control
                placeholder={itemData.name}
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={name}
                onChange={onChange("name")}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="text-start border-bottom border-warning p-2 ">
          <Col className="align-self-center">Phone:</Col>
          <Col>
            <InputGroup>
              <Form.Control
                placeholder={itemData.phoneNumber}
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={phone}
                onChange={onChange("phone")}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="text-start border-bottom border-warning p-2">
          <Col className="align-self-center">Position:</Col>
          <Col>
            <InputGroup>
              <Form.Control
                placeholder={itemData.position}
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={position}
                onChange={onChange("position")}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="text-start border-bottom border-warning p-2">
          <Col>Id:</Col>
          <Col>{itemData.id}</Col>
        </Row>
      </div>

      <div className="d-flex justify-content-between">
        <div className="m-2">
          <Button
            variant="outline-success"
            className="me-2"
            onClick={toEditContact}
          >
            Save changes
          </Button>
          <Button variant="outline-primary" onClick={handleShow}>
            Undo changes
          </Button>
        </div>
        <Button
          variant="outline-danger"
          className="m-2"
          onClick={toRemoveContact}
        >
          Delete contact
        </Button>
      </div>
    </Container>
  );
}

export default EditContact;
