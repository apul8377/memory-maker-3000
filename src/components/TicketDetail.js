import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props) {
  const { ticket, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Memory Detail</h1>
      <h3>
        {ticket.day} - {ticket.location}
      </h3>
      <p>
        <em>With {ticket.people}</em>
      </p>
      <p>
        <em>{ticket.description}</em>
      </p>
      <button onClick={props.onClickingEdit}>Update Memory</button>
      <button onClick={() => onClickingDelete(ticket.id)}>Delete Memory</button>
      <hr />
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
};

export default TicketDetail;
