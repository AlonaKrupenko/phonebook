import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function ContactInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const contactsList = useSelector((state) => {
    return state.list.contactsList;
  });

  const itemData = contactsList.find((el) => {
    return el.id === id;
  });

  const editContact = () => {
    navigate("/edit/" + id);
  };

  return (
    <Container>
      <h4 className="text-success">Full info about contact</h4>
      <Button
        variant="outline-warning"
        className=" mt-2 d-block"
        onClick={editContact}
      >
        Edit info
      </Button>
      <div>
        <Row className="text-start border-bottom border-success p-2">
          <Col>Name:</Col>
          <Col>{itemData.name}</Col>
        </Row>
        <Row className="text-start border-bottom border-success p-2">
          <Col>Phone:</Col>
          <Col>{itemData.phoneNumber}</Col>
        </Row>
        <Row className="text-start border-bottom border-success p-2">
          <Col>Position:</Col>
          <Col>{itemData.position}</Col>
        </Row>
        <Row className="text-start border-bottom border-success p-2">
          <Col>Id:</Col>
          <Col>{itemData.id}</Col>
        </Row>
      </div>
    </Container>
  );
}

export default ContactInfo;
