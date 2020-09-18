import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type="text"
          name="day"
          placeholder="What day did this happen on?"
        />
        <input type="text" name="people" placeholder="Who was there?" />
        <input name="location" placeholder="Where did this happen?" />
        <textarea name="description" placeholder="Share your memory" />
        <button type="submit">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ReusableForm;
