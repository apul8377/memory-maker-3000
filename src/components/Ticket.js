import React from "react";
import PropTypes from "prop-types";

function Ticket(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenTicketClicked(props.id)}>
        <h3>
          {props.day} - {props.location}
        </h3>
        <p>
          <em>{props.people}</em>
        </p>
        <p>
          <em>{props.description}</em>
        </p>
        <p>
          <em>{props.formattedWaitTime}</em>
        </p>
      </div>
      <hr />
    </React.Fragment>
  );
}

Ticket.propTypes = {
  Day: PropTypes.string,
  People: PropTypes.string,
  Location: PropTypes.string,
  Description: PropTypes.string,
  id: PropTypes.string,
  formattedWaitTime: PropTypes.string,
  whenTicketClicked: PropTypes.func,
};

export default Ticket;
