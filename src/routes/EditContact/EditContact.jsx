import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import "./style.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import contactsListSlice from "../../redux/contactsList";
import { useNavigate, useParams } from "react-router-dom";

function EditContact() {
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

  const formik = useFormik({
    initialValues: {
      name: itemData.name,
      phoneNumber: itemData.phoneNumber,
      position: itemData.position,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phoneNumber: Yup.number().required("Required"),
    }),

    onSubmit: (values) => {
      dispatch(
        contactsListSlice.actions.edit({
          id: id,
          name: values.name,
          phoneNumber: values.phoneNumber,
          position: values.position,
        })
      );
      navigate("/");
    },
  });

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

      <Form onSubmit={formik.handleSubmit} id="edit-contact-form">
        <Row className="text-start border-bottom border-warning p-2">
          <Col className="align-self-center">Name:</Col>
          <Col>
            <InputGroup>
              <Form.Control
                className={
                  formik.touched.name && formik.errors.name
                    ? "required-field"
                    : null
                }
                name="name"
                type="text"
                placeholder={itemData.name}
                {...formik.getFieldProps("name")}
              />
            </InputGroup>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </Col>
        </Row>
        <Row className="text-start border-bottom border-warning p-2 ">
          <Col className="align-self-center">Phone:</Col>
          <Col>
            <InputGroup>
              <Form.Control
                className={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "required-field"
                    : null
                }
                name="phoneNumber"
                type="phone"
                placeholder={itemData.phoneNumber}
                {...formik.getFieldProps("phoneNumber")}
              />
            </InputGroup>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-danger">{formik.errors.phoneNumber}</div>
            ) : null}
          </Col>
        </Row>
        <Row className="text-start border-bottom border-warning p-2">
          <Col className="align-self-center">Position:</Col>
          <Col>
            <InputGroup>
              <Form.Control
                name="position"
                type="text"
                placeholder={itemData.position}
                {...formik.getFieldProps("position")}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="text-start border-bottom border-warning p-2">
          <Col>Id:</Col>
          <Col>{itemData.id}</Col>
        </Row>
        <div className="d-flex justify-content-between">
          <div className="m-2">
            <Button type="submit" variant="outline-success" className="me-2">
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
      </Form>
    </Container>
  );
}

export default EditContact;
