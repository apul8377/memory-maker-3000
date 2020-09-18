import React from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import Moment from "moment";
import { useFirestore } from "react-redux-firebase";

function NewTicketForm(props) {
  const firestore = useFirestore();
  function addTicketToFirestore(event) {
    event.preventDefault();

    props.onNewTicketCreation();

    // Here's how we will actually add a ticket to Firestore.

    return firestore.collection("tickets").add({
      day: event.target.day.value,
      people: event.target.people.value,
      location: event.target.location.value,
      description: event.target.description.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <React.Fragment>
      <ReusableForm
        // Don't forget to change the name of the function here as well.
        formSubmissionHandler={addTicketToFirestore}
        buttonText="Share Memory"
      />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func,
};

export default NewTicketForm;
