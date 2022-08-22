import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddContactModal(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmitClick = (el) => {
    const itemData = {
      name: name,
      phoneNumber: phone,
      position: position,
    };

    props.onAdd(itemData);
  };

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

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please fill data for adding contact
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={onChange("name")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Phone"
              value={phone}
              onChange={onChange("phone")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Position"
              value={position}
              onChange={onChange("position")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleSubmitClick}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddContactModal;
