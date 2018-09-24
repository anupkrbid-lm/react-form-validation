import React, { Component } from 'react';

import Form from './UI/Form/Form';
import FormElement from './UI/FormElement/FormElement';

class App extends Component {
  state = {
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
          className: 'form-control',
          value: 'Anup',
          changed: this.formElementChangeHandler.bind(this)
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
          className: 'form-control',
          value: 'anupkumar.bid@learningmate.com',
          changed: this.formElementChangeHandler.bind(this)
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
          className: 'form-control',
          value: 'fastest',
          name: 'deliveryMethod',
          changed: this.formElementChangeHandler.bind(this),
          options: [
            { name: 'cheapest', value: 'cheapest' },
            { name: 'fastest', value: 'fastest' }
          ]
        }
      }
    }
  };

  formElementChangeHandler(event) {
    const updatedForm = {
        ...this.state.form,
        [event.target.name]: {
          ...this.state.form[event.target.name],
          element: {
            ...this.state.form[event.target.name].element,
            value: event.target.value
          }
        }
    };

    this.setState({form: updatedForm});
    // updatedFormElement.value = event.target.value;
    // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    // updatedFormElement.touched = true;
    // updatedOrderForm[inputIdentifier] = updatedFormElement;
    
    // let formIsValid = true;
    // for (let inputIdentifier in updatedOrderForm) {
    //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    // }
    // this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

  }

  render() {
    const formElements = [];
    for (let key in this.state.form) {
      formElements.push(<FormElement key={this.state.form[key].element.id} {...this.state.form[key]} />);
    }
    
    return (
      <div className="App">
        <Form>
          {formElements}
        </Form>
      </div>
    );
  }
}

export default App;
