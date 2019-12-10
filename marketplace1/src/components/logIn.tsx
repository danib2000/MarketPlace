import React, { Component } from 'react';
import {Container, Form, Button} from 'semantic-ui-react';
interface Iprops{}

interface Istate{}

export default class LogInPage extends React.Component<Iprops,Istate> {
    constructor(props: Iprops){
        super(props);
    }
    public render(){
        return(
            <Container>
                <Form>
                    <Form.Field>
                        <Form.Input placeholder='Username' type='text'></Form.Input>
                        <Form.Input placeholder='Password' type='password'></Form.Input>
                        
                    </Form.Field>
                    <Button>Sign In</Button>
                </Form>
            </Container>
        );
    }
}