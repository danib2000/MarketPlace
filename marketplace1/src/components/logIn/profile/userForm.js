import React, { Component } from 'react';
import { Form, Tab } from 'semantic-ui-react'
import {CURRENT_USER_STORE} from '../../../stores/storeKeys';
import rootStores from '../../../stores';
import { reaction } from 'mobx';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

class UserForm extends Component{
    
    render(){
        return(
            <Form>
            <Form.Group widths='equal'>
            <Form.Input fluid label='Full name' placeholder='Full name' />
            <Form.Select
                fluid
                label='Gender'
                options={options}
                placeholder='Gender'
            />
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about you...' />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button>Submit</Form.Button>
            </Form>
        );
    }
}
export default UserForm;