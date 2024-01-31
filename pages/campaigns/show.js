import React, {Component} from "react";
import { Card,CardGroup,Grid, GridColumn, GridRow,Button } from "semantic-ui-react";

import Layout  from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import {Link} from "../../routes";

class campaignShow extends Component{
    static async getInitialProps(props){
        const campaign =Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return{
            address: props.query.address,
            minimumContribution : summary[0],
            balance : summary[1],
            requestsCount : summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }
 renderCards(){
    const {
        balance,
        requestsCount,
        approversCount,
        minimumContribution,
        manager
    } =this.props;
   
    const items = [
        {
            header: manager,
            meta :"Address of Manager",
            description : "The manager created this campaign",
            style :{overflowWrap:'break-word'}
        },
        {
            header:parseInt(minimumContribution),
            description : "you atleast have to contibute this much wei to become an approver",
            meta :"Minimum Contribution (wei)"

        },
        {
            header:parseInt(requestsCount),
            meta :"Number of request",
            description : "A Request try to withdraw money.Request must be approved by approver"
        },
        {
            header: parseInt(approversCount),
            meta :"Number of approvers",
            description : "Number of people who already have donated to this campaign."
        },
        {
            header:web3.utils.fromWei(parseInt(balance),'ether') ,
            meta :"campaign balance(ether)",
            description : "The balance is how much money this campaign has left to spend."
        }

    ];

    return <CardGroup items= {items} />
 }
    render(){
        return(
            <Layout>
                <h3>Component show page</h3>
                <Grid>
                    <GridRow>
                    <GridColumn width={10}>
                    {this.renderCards()}
                    </GridColumn>
                    <GridColumn width={6}>
                    <ContributeForm address={this.props.address}/>
                    </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Layout>
        );
    }

}

export default campaignShow;