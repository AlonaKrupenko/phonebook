import React from "react";
import "./style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import { ReactComponent as DeleteIcon } from "../../assets/delete_icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit_icon.svg";
import { ReactComponent as InfoIcon } from "../../assets/info_icon.svg";

function ContactItem(props) {
  const handleClick = () => {
    props.onSelect(props.item.id);
  };
  const handleInfoClick = (e) => {
    e.stopPropagation();
    props.onInfoIconClick(props.item.id);
  };
  const handleEditClick = (e) => {
    e.stopPropagation();
    props.onEditIconClick(props.item.id);
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    props.onRemoveIconClick(props.item.id);
  };

  return (
    <>
      <ListGroup.Item
        as="li"
        action
        onClick={handleClick}
        variant="secondary"
        className="contact-item"
      >
        {props.children}
        <div className="icons-block">
          <InfoIcon className="icon info" onClick={handleInfoClick} />
          <EditIcon className="icon edit" onClick={handleEditClick} />
          <DeleteIcon className="icon delete" onClick={handleRemoveClick} />
        </div>
      </ListGroup.Item>
    </>
  );
}

export default ContactItem;
