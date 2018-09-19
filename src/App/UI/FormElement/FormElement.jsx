import React from 'react';

const formElement = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input': 
      inputElement = <input {...props.element} />;
      break
    case 'select': 
      const tempProps = JSON.parse(JSON.stringify(props.element));
      delete tempProps.options;
      delete tempProps.value;
      const inputElementOptions =  props.element.options.map(option => <option key={option.value} value={option.value}>{option.name}</option>);
      inputElement =  <select defaultValue={props.element.value} {...tempProps}>{inputElementOptions}</select>;
      break
    default:
      inputElement = <input {...props.element} />;
  }

  return (
    <div className="form-row">
      <div className="form-group">
        <label htmlFor={props.label.for}>{props.label.value}</label>
        {inputElement}
        <div className="valid-feedback">{props.feedback}</div>
      </div>
    </div>
  );
};

export default formElement;
