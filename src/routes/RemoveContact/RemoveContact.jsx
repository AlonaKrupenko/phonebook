import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import contactsListSlice from "../../redux/contactsList";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function RemoveContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contactsList = useSelector((state) => {
    return state.list.contactsList;
  });

  const contactItem = contactsList.find((el) => {
    return el.id === id;
  });

  const toRemoveContact = () => {
    dispatch(contactsListSlice.actions.remove(contactItem));
    navigate("/");
  };

  const editContact = () => {
    navigate("/edit/" + id);
  };

  return (
    <Container>
      <h4 className="text-danger">Remove contact</h4>
      <div className="d-flex">
        <Button
          variant="outline-warning"
          className=" mt-2 me-2 "
          onClick={editContact}
        >
          Cancel removal
        </Button>
        <Button
          variant="outline-danger"
          className=" mt-2 mr-2"
          onClick={toRemoveContact}
        >
          Сonfirm removal
        </Button>
      </div>

      <div>
        <Row className="text-start border-bottom border-danger p-2">
          <Col>Name:</Col>
          <Col>{contactItem.name}</Col>
        </Row>
        <Row className="text-start border-bottom border-danger p-2">
          <Col>Phone:</Col>
          <Col>{contactItem.phoneNumber}</Col>
        </Row>
        <Row className="text-start border-bottom border-danger p-2">
          <Col>Position:</Col>
          <Col>{contactItem.position}</Col>
        </Row>
        <Row className="text-start border-bottom border-danger p-2">
          <Col>Id:</Col>
          <Col>{contactItem.id}</Col>
        </Row>
      </div>
    </Container>
  );
}

export default RemoveContact;
