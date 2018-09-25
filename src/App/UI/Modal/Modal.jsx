import React from 'react';

const modal = props => (
  <div>
    <div className="modal-background" />
    <div role="dialog" className="modal-dialog">
      <header>
        <span>{props.header}</span>
        <button
          onClick={props.closeModal}
          type="button"
          aria-label="close"
        >
          CLOSE
        </button>
      </header>
      <div className="modal-content">{props.children}</div>
    </div>
  </div>
);

export default modal;
