import React, { Component } from 'react';
import { List, Button, Divider, Segment, Form, Table } from 'semantic-ui-react'
import {CURRENT_USER_STORE} from '../../../stores/storeKeys';
import rootStores from '../../../stores';
import { observer } from 'mobx-react';
// import { withRouter } from 'react-router-dom';
const currentUserStore = rootStores[CURRENT_USER_STORE];
const notificationStore = currentUserStore.notificationStore;
@observer
class Notifications extends Component {
   
    state={
        notifications:[],
        loading:true,
        openMoreInfo:'hidden',
        value:"",
        reason:""
    }
    handleClick(event,data){
        if(this.state.openMoreInfo==='hidden'){
            this.setState({openMoreInfo:"info"});
        }
        else{
            this.setState({openMoreInfo:"hidden"});
        }
    }
    handleChange = (e, { value }) => this.setState({ value:value })
    addReason(){
        if(this.state.value==='reject'){
            return(<Form.TextArea label='Reason' placeholder='Write the reason here...' required                         
            onChange={(e)=> {this.setState({reason: e.target.value})}}
            />);
        }
        

    }
    handleSellerSubmit = (i) =>{
        
         if(this.state.value === 'approve'){      
            //console.log(this.state.notifications[i].id);
             notificationStore.createNotification('your application to be a seller has been approved', 
             'seller approval',false,this.state.notifications[i].message.userName);
             notificationStore.updateNotification(this.state.notifications[i].id, 'sellerApproved', 'the seller '+this.state.notifications[i].message.userName + 
             ' has been approved by '+ currentUserStore.currentUser.userName);
                currentUserStore.updateUserRole(this.state.notifications[i].message.userName, 'seller');
        }else{
            notificationStore.createNotification('your application to be a seller has been declined because:'+ this.state.reason, 
            'seller declined',false,this.state.notifications[i].message.userName);
            notificationStore.updateNotification(this.state.notifications[i].id, 'sellerDeclaind', 'the user '+this.state.notifications[i].message.userName + 
             'has been declaind because:' + this.state.reason);
            currentUserStore.updateUserRole(this.state.notifications[i].message.userName, 'rejectedSeller');
        }   
        
    }
    handleProducSubmit = () =>{
        
    }
    addSellerToList(i){
        var resultz = [];
        resultz.push((<List.Item key={'list-'+i}>
                    <List.Icon name='user' />
                        <List.Content >
                            <List.Description>
                                {this.state.notifications[i].info} for the user: {this.state.notifications[i].message.userName} 
                                <Button 
                                    i={i} 
                                    style={{marginLeft: "20px"}} 
                                    onClick={this.handleClick.bind(this)}
                                    content={this.state.openMoreInfo=== 'hidden' ? 'more info':'less info'}
                                    icon={this.state.openMoreInfo=== 'hidden' ? 'plus':'minus'}
                                />
                            </List.Description>
                        </List.Content>
                    </List.Item> ));
                resultz.push(<Segment key={'Form-' + i}className={this.state.openMoreInfo}>
                     <Table celled striped textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>User Information</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>User name</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.userName}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Address</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.address}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>city</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.city}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>region</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.region}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>country</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.country}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>walletAddress</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.walletAddress}
                                </Table.Cell>
                            </Table.Row>
                            {this.state.notifications[i].message.secondAddress &&
                            <Table.Row>
                                <Table.Cell>secondAddress</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.secondAddress}
                                </Table.Cell>
                            </Table.Row>
                             }
                             {this.state.notifications[i].message.secondCity &&
                            <Table.Row>
                                <Table.Cell>secondCity</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.secondCity}
                                </Table.Cell>
                            </Table.Row>
                             }
                             {this.state.notifications[i].message.secondRegin &&
                            <Table.Row>
                                <Table.Cell>secondRegin</Table.Cell>
                                <Table.Cell  >
                                    {this.state.notifications[i].message.secondRegin}
                                </Table.Cell>
                            </Table.Row>
                             }
                        </Table.Body>
                    </Table>
                    <Form  onSubmit={this.handleSellerSubmit.bind(this, i)}>
                    <Form.Group>
                        <label>User approval</label>
                        <Form.Radio
                            label='approve'
                            value='approve'
                            checked={this.state.value === 'approve'}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='reject'
                            value='reject'
                            checked={this.state.value === 'reject'}
                            onChange={this.handleChange}
                        />
                        </Form.Group>
                        {this.addReason()}
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Segment>)
            
            resultz.push(<Divider key={'divider-' + i}/>);
        return resultz;
    }
    addDefualt(i){
        var resultz = [];
        resultz.push((<List.Item key={'list-'+i}>
                    <List.Icon name='user' />
                        <List.Content >
                            <List.Description>
                                {this.state.notifications[i].info} 
                            </List.Description>
                        </List.Content>
                    </List.Item> ));
        resultz.push(<Divider key={'divider-' + i}/>);
        return resultz;
    }
    displayList(){
        //this.getAllnotications();
        var result = [];
        for(var i =this.state.notifications.length-1;i>=0;i--){
            if(this.state.notifications[i].type=== 'seller info'){
                result.push(this.addSellerToList(i));
            }else
            if(this.state.notifications[i].type=== "sellerApproved"){
                result.push(this.addDefualt(i));
            }else
            if(this.state.notifications[i].type=== "sellerDeclaind"){
                result.push(this.addDefualt(i));
            }else{
                result.push(this.addDefualt(i));
            }

        }
       return result;

    }
    getAllnotications(){
        const notificationz = [...this.state.notifications];
        notificationStore.notifications.forEach(notification => {
           notificationz.push({ type:notification.type, message:notification.sellerInfo, info:notification.info, id:notification.id}); 
            this.setState({ notifications: notificationz });
        });
        this.setState({loading:false});
    }
    componentDidMount(){
        this.getAllnotications();
    }
    render(){
        if(this.state.loading){
            return(<div></div>)
          }else 
          {
            return(
        <div style={{margin: "20px"}}>
            
            <Divider/>
            <List>
                {this.displayList()}
                
            </List>
        </div>
        );
    }
}
}
export default Notifications;