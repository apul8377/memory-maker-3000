import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from "./../actions";
import { withFirestore } from "react-redux-firebase";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false,
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  };

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  };

  handleChangingSelectedTicket = (id) => {
    this.props.firestore
      .get({ collection: "tickets", doc: id })
      .then((ticket) => {
        const firestoreTicket = {
          day: ticket.get("day"),
          people: ticket.get("people"),
          location: ticket.get("location"),
          description: ticket.get("description"),
          id: ticket.id,
        };
        this.setState({ selectedTicket: firestoreTicket });
      });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null,
    });
  };

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: "tickets", doc: id });
    this.setState({ selectedTicket: null });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = (
        <EditTicketForm
          ticket={this.state.selectedTicket}
          onEditTicket={this.handleEditingTicketInList}
        />
      );
      buttonText = "Return to Memory List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Memory List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = "Return to Memory List";
    } else {
      currentlyVisibleState = (
        <TicketList onTicketSelection={this.handleChangingSelectedTicket} />
      );
      buttonText = "Add Memory";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {};

const mapStateToProps = (state) => {
  return {
    formVisibleOnPage: state.formVisibleOnPage,
  };
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);
