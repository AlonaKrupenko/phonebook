import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFormik } from "formik";
import * as Yup from "yup";

function AddContactModal(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      position: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phoneNumber: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      props.onAdd(values);
    },
  });

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Please fill data for adding contact
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              name="phoneNumber"
              type="phone"
              placeholder="Phone"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-danger">{formik.errors.phoneNumber}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              name="position"
              type="text"
              placeholder="Position"
              {...formik.getFieldProps("position")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Add contact</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddContactModal;
