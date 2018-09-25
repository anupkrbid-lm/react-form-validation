import React from 'react';

const form = props => (
    <form onSubmit={props.formSubmit}>
      {props.children}
      <div className="form-row">
        <div className="form-group">
          <button
            type="submit"
            disabled={!props.formState.valid}
            className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );

export default form;
