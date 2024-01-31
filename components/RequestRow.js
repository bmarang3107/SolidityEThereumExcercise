import React , {Component} from "react";
import {  Button, TableCell, TableRow } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component{
    onApprove =async ()=>{
        const campaign =  Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from :accounts[0]
        });

    };
    onFinalize =async ()=>{
        const campaign =  Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from :accounts[0]
        });

    };
    render(){
       // const {Row, Cell} = Table;
       const { id, request, approversCount } = this.props;
       
       const readyToFinalize =parseInt(request.approvalCount) > parseInt(approversCount)/2;

        return (
            <TableRow disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <TableCell>{id}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{web3.utils.fromWei(request.value, "ether")}</TableCell>
                <TableCell>{request.recipient}</TableCell>
                <TableCell>{parseInt(request.approvalCount)}/{parseInt(approversCount)}</TableCell>
                <TableCell>
                    {request.complete? null :(
                        <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                    )}
                </TableCell>
                <TableCell>
                {request.complete? null :(
                    <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>)}
                </TableCell>
            </TableRow>
        );
    }
}

export default RequestRow;

