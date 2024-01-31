import React,{Component} from "react";
import { Button, Table, TableBody ,TableRow, TableHeaderCell} from "semantic-ui-react";
import Layout from "../../../components/Layout";
import {Link} from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{
    static async getInitialProps(props){
        const {address} =props.query;
        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestLength().call();
        const fetchApproverCount= await campaign.methods.getSummary().call();
        const approversCount =fetchApproverCount[3];
        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element,index) =>{
                return campaign.methods.requests(index).call();
            })
        );
        console.log("approversCount",fetchApproverCount[3]);
        return {address, requests , requestsCount,approversCount};
     }

     renderRequest() {
        console.log("Request",this.props.requests)
        return this.props.requests.map((request,index)=>{
          return(<RequestRow
            key={index}
            id={index}
            request ={request}
            address={this.props.address}
            approversCount ={this.props.approversCount}
             />) ; 
        });
       
     }
    render(){ 
       // const {Header, Row, HeaderCell, Body} =Table;   
        return(
            <Layout>
               <h3>Requests</h3>
               <Link route={`/campaigns/${this.props.address}/requests/new`}>
                 <a>
                    <Button primary >Add Request</Button>
                 </a>
               </Link>
               <Table>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Description</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        <TableHeaderCell>Recipient</TableHeaderCell>
                        <TableHeaderCell>Approval Count</TableHeaderCell>
                        <TableHeaderCell>Approve</TableHeaderCell>
                        <TableHeaderCell>Finalize</TableHeaderCell>
                    </TableRow>
                    <TableBody>
                   {this.renderRequest()}
                 </TableBody>
                 </Table>
                 <div>Found {parseInt(this.props.requestsCount)} requests.</div>
            </Layout>
        );
    }
}

export default RequestIndex;