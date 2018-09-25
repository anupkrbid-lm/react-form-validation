import React, { Component } from 'react';

import Form from './UI/Form/Form';
import FormElement from './UI/FormElement/FormElement';

class App extends Component {
  state = {
    formIsValid: false,
    form: {
      name: {
        elementType: 'input',
        label: {
          for: 'name',
          value: 'Name'
        },
        element: {
          id: 'name',
          name: 'name',
          type: 'text',
          placeholder: 'Your Name',
          value: '',
          changed: this.formElementChangeHandler.bind(this)
        },
        validation: {
          required: true
        },
        valid: false,
        dirty: false
      },
      email: {
        elementType: 'input',
        label: {
          for: 'email',
          value: 'Email'
        },
        element: {
          id: 'email',
          type: 'text',
          name: 'email',
          placeholder: 'Your Email',
          value: '',
          changed: this.formElementChangeHandler.bind(this)
        },
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        dirty: false
      },
      deliveryMethod: {
        elementType: 'select',
        label: {
          for: 'delivery_method',
          value: 'Delivery Method'
        },
        element: {
          id: 'delivery_method',
          value: 'fastest',
          name: 'deliveryMethod',
          changed: this.formElementChangeHandler.bind(this),
          options: [
            { name: 'cheapest', value: 'cheapest' },
            { name: 'fastest', value: 'fastest' }
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        dirty: false
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  formElementChangeHandler(event) {
    const updatedForm = {
        ...this.state.form,
        [event.target.name]: {
          ...this.state.form[event.target.name],
          dirty: true,
          valid: this.checkValidity(event.target.value, this.state.form[event.target.name].validation),
          element: {
            ...this.state.form[event.target.name].element,
            value: event.target.value
          }
        }
    };
   
    let formIsValid = true;

    for (let key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid;
    }

    this.setState({form: updatedForm, formIsValid: formIsValid});
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const form = {};
    for (let key in this.state.form) {
      form[key] = this.state.form[key].element.value
    }
    console.log(form);
  }

  render() {
    const formElements = [];
    for (let key in this.state.form) {
      formElements.push(<FormElement key={this.state.form[key].element.id} {...this.state.form[key]} />);
    }
    
    return (
      <div className="App">
        <Form formIsValid={this.state.formIsValid} formSubmit={this.formSubmitHandler.bind(this)}>
          {formElements}
        </Form>
      </div>
    );
  }
}

export default App;
