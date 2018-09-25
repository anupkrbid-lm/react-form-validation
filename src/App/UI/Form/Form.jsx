import React from 'react';

const form = props => (
    <form onSubmit={props.formSubmit}>
      {props.children}
      <button type="submit">Submit</button>
    </form>
  );

export default form;
