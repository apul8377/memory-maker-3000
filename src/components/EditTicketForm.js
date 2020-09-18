import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";

function EditTicketForm(props) {
  const { ticket } = props;
  const firestore = useFirestore();
  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicket();
    const propertiesToUpdate = {
      day: event.target.day.value,
      people: event.target.people.value,
      location: event.target.location.value,
      description: event.target.description.value,
    };
    return firestore.update(
      { collection: "tickets", doc: ticket.id },
      propertiesToUpdate
    );
  }
  return (
    <React.Fragment>
      <ReusableForm
        buttonText="Update Memory"
        formSubmissionHandler={handleEditTicketFormSubmission}
      />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  onEditTicket: PropTypes.func,
};

export default EditTicketForm;
