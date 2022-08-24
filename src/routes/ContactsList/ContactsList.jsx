import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import "./style.scss";

import { v4 as uuidv4 } from "uuid";

import ContactItem from "../../components/ContactItem/ContactItem";
import AddContactModal from "../../components/AddContactModal/AddContactModal";

import { useSelector, useDispatch } from "react-redux";
import contactsListSlice from "../../redux/contactsList";
import { useNavigate } from "react-router-dom";

function ContactsList(props) {
  const [modalShow, setModalShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const contactsListRedux = useSelector((state) => {
    return state.list.contactsList;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddContact = () => {
    setModalShow(true);
  };

  const toAddContact = (el) => {
    dispatch(
      contactsListSlice.actions.add({
        id: uuidv4(),
        name: el.name,
        phoneNumber: el.phoneNumber,
        position: el.position,
      })
    );
    setModalShow(false);
  };

  const getInfo = (id) => {
    navigate("/info/" + id);
  };
  const editContact = (id) => {
    navigate("/edit/" + id);
  };
  const removeContact = (id) => {
    navigate("/remove/" + id);
  };

  const handleChangeSearchField = (e) => {
    setSearchValue(e.target.value);
  };

  const listToRender = contactsListRedux
    .filter((el) => {
      return (
        el.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        el.phoneNumber.includes(searchValue)
      );
    })
    .sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      return 0;
    });

  return (
    <Container className="contacts-block">
      {modalShow ? (
        <AddContactModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onAdd={toAddContact}
        />
      ) : null}
      <div className="d-flex justify-content-between mb-2 mt-2">
        <Button
          variant="primary"
          className="add-btn m-0"
          onClick={onAddContact}
        >
          Add new contact
        </Button>

        <Form className="m-0">
          <Form.Control
            disabled={contactsListRedux.length === 0}
            type="search"
            placeholder="Search"
            className="m-0"
            aria-label="Search"
            value={searchValue}
            onChange={handleChangeSearchField}
          />
        </Form>
      </div>

      <ListGroup as="ul">
        {contactsListRedux.length === 0 ? (
          <Alert variant="secondary">
            <Alert.Heading>There is no contacts yet</Alert.Heading>
            <hr />
            <p className="mb-0">Please add new contact</p>
          </Alert>
        ) : listToRender.length === 0 ? (
          <div>Nothing found</div>
        ) : (
          listToRender.map((el) => {
            return (
              <ContactItem
                as="li"
                key={el.id}
                item={el}
                onSelect={getInfo}
                onInfoIconClick={getInfo}
                onEditIconClick={editContact}
                onRemoveIconClick={removeContact}
              >
                {el.name}
              </ContactItem>
            );
          })
        )}
      </ListGroup>
    </Container>
  );
}

export default ContactsList;
