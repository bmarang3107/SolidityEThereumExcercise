import React,{Component} from "react";
import Campaign from "../../../ethereum/campaign";
import {Link, Router} from "../../../routes";
import { Form, Button, Message, FormField, Input } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/Layout";

class newRequest extends Component{
    state={
        description :'',
        value: '',
        recipient :'',
        loading:false,
        errorMessage:''
    }
    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }

    onSubmit = async event=>{

        const campaign = Campaign(this.props.address);
        const {description,value,recipient} =this.state;
        const accounts =await web3.eth.getAccounts();
        this.setState({loading:true,errorMessage:""});
        try{
            await campaign.methods.createRequest(
            description, web3.utils.toWei(value,'ether'),
            recipient
        ).send({from :accounts[0]});
            }
            catch(err){
                this.setState({errorMessage:err.message});
            }
            this.setState({loading:false});
    }

    render(){
        return(
            <Layout>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <Button primary>Back</Button>
                    </a>
                </Link>
                 <h3>Create new Request</h3>
                 <FormField>
                    <label>Description</label>
                    <Input value={this.state.description} 
                    onChange={
                        event => this.setState({description:event.target.value})
                    } 
                    />

                 </FormField>

                 <FormField>
                    <label>Value in Ether</label>
                    <Input value={this.state.value} 
                    onChange={
                        event => this.setState({value:event.target.value})
                    } 
                    />

                 </FormField>
                 <FormField>
                    <label>Recipient</label>
                    <Input value={this.state.recipient} 
                    onChange={
                        event => this.setState({recipient:event.target.value})
                    } 
                    />

                 </FormField>
                 <Message error header="oops!" content={this.state.errorMessage} />
                 <Button loading ={this.state.loading} primary>Create !</Button>

            </Form>
            </Layout>
        );
    }
}

export default newRequest;