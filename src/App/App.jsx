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
          type: 'text',
          placeholder: 'Your Name',
          className: 'form-control',
          value: 'Anup',
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
          placeholder: 'Your Email',
          className: 'form-control',
          value: 'anupkumar.bid@learningmate.com',
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
          options: [
            { name: 'cheapest', value: 'cheapest' },
            { name: 'fastest', value: 'fastest' }
          ]
        }
      }
    }
  };

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
