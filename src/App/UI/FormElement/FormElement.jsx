import React from 'react';

const formElement = props => {
  let inputElement = null;
  const tempProps = JSON.parse(JSON.stringify(props.element));
  const changed = props.element.changed;
  delete tempProps.changed;

  const inputElementClassList = ['form-control'];

  if (props.dirty) {
    inputElementClassList.push('form-control-dirty');
  } else {
    inputElementClassList.push('form-control-prestin');
  }

  if (props.valid) {
    inputElementClassList.push('form-control-valid');
  } else if (props.dirty && !props.valid) {
    inputElementClassList.push('form-control-invalid');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input {...tempProps}
          className={inputElementClassList.join(' ')} 
          onChange={event => {
            event.persist();
            changed(event);
          }} />
        );
      break
    case 'select':
      delete tempProps.options;
      delete tempProps.value;
      const inputElementOptions = props.element.options.map(option => <option key={option.value} value={option.value}>{option.name}</option>);
      inputElement = (
        <select defaultValue={props.element.value} 
          className={inputElementClassList.join(' ')} 
          {...tempProps}  
          onChange={event => {
            event.persist();
            changed(event);
          }}>{inputElementOptions}</select>
      );
      break
    default:
      inputElement = (
        <input {...tempProps} 
          onChange={event => {
            event.persist();
            changed(event);
          }} />
      );
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
