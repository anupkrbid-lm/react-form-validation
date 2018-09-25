import React, { Component } from 'react';

import Form from './UI/Form/Form';
import FormElement from './UI/FormElement/FormElement';

class App extends Component {
  state = {
    form: {
      controls: {
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
          state: {
            valid: false,
            dirty: false
          }
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
          state: {
            valid: false,
            dirty: false
          }
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
          state: {
            valid: true,
            dirty: false
          }
        }
      },
      state: {
        valid: false
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
      controls: {
        ...this.state.form.controls,
        [event.target.name]: {
          ...this.state.form.controls[event.target.name],
          element: {
            ...this.state.form.controls[event.target.name].element,
            value: event.target.value
          },
          state: {
            ...this.state.form.controls[event.target.name].state,
            dirty: true,
            valid: this.checkValidity(event.target.value, this.state.form.controls[event.target.name].validation),
          }
        }
      }
    };
   
    let formIsValid = true;
    for (let key in updatedForm.controls) {
      formIsValid = updatedForm.controls[key].state.valid && formIsValid;
    }
    updatedForm.state.valid = formIsValid;

    this.setState({form: updatedForm});
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const form = {};
    for (let key in this.state.form) {
      form[key] = this.state.form.controls[key].element.value
    }
  }

  render() {
    const formElements = [];
    for (let key in this.state.form.controls) {
      formElements.push(
        <FormElement 
          key={this.state.form.controls[key].element.id} 
          {...this.state.form.controls[key]} 
        />
      );
    }
    
    return (
      <div className="App">
        <Form formState={this.state.form.state} formSubmit={this.formSubmitHandler.bind(this)}>
          {formElements}
        </Form>
      </div>
    );
  }
}

export default App;
