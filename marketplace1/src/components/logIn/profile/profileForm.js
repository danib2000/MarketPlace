import React, { Component } from 'react';
import { Form, Input,  } from 'semantic-ui-react'

// const options = [
//     { key: 'IL', text: 'Israel', value: 'Israel' },
//     { key: 'USA', text: 'United States', value: 'United States' },
//     { key: 'IN', text: 'India', value: 'India' },
//     {key:'RU', text:'Russia', value:'Russia'},
//     { key: 'o', text: 'Other', value: 'other' },
//   ]

class ProfileForm extends Component{
    
    render(){
        return(
            <Form>
             <Form.Group>
            <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                placeholder='First name'
            />
            </Form.Group>
            <Form.Group>
            <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
            />
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about you...' />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button>Submit</Form.Button>
            </Form>
        );
    }
}
export default ProfileForm;