import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import CryptoCoupon from '../ethereum/cryptoCoupon';
import { Router } from '../routes';

class CouponRow extends Component {


  onRaffle = async () => {
    
    const cryptoCoupon = CryptoCoupon(this.props.address);
    const summary = await cryptoCoupon.methods.getSummary().call();
    const accounts = await web3.eth.getAccounts();

    if(accounts[0]==summary[3]){
      await cryptoCoupon.methods
          .AccessControle()
          .send({
            from: accounts[0], gas: '100000'
          });

      await cryptoCoupon.methods.setCouponToRaffle(this.props.coupon.serialNumber).send({
        from: accounts[0], gas:'300000'
      });
      Router.pushRoute(`/cryptoCoupons/${this.props.address}`);
    }else{
      console.log("You don't have account manager");
    }
  };

  onSale = async () => {
    
    const cryptoCoupon = CryptoCoupon(this.props.address);
    const summary = await cryptoCoupon.methods.getSummary().call();
    const accounts = await web3.eth.getAccounts();
    console.log("selling"+summary[3]);
    console.log("account"+accounts[0]);
    if(accounts[0]==summary[3]){
      await cryptoCoupon.methods
          .AccessControle()
          .send({
            from: accounts[0], gas: '100000'
          });

      await cryptoCoupon.methods.setCouponToSale(this.props.coupon.serialNumber).send({
        from: accounts[0], gas:'300000'
      });
      Router.pushRoute(`/cryptoCoupons/${this.props.address}`);
    }else{
      console.log("You don't have account manager");
    }
  };

  render() {
    const { Row, Cell } = Table;
    const { id, coupon } = this.props;
    //const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row>
        <Cell>{coupon.serialNumber}</Cell>
        <Cell>{coupon.name}</Cell>
        <Cell>{coupon.description}</Cell>
        <Cell>
          {coupon.serialNumber}
        </Cell>
        <Cell>{web3.utils.fromWei(coupon.value, 'ether')}</Cell>
       
        <Cell>
          
            <Button color="green" basic onClick={this.onSale}>
              Sale
            </Button>
          
        </Cell>

        <Cell>
          {coupon.gift ? (
            <Button color="teal" basic onClick={this.onRaffle}>
              Raffle
            </Button>
          ) : null}
        </Cell>
      </Row>
    );
  }
}

export default CouponRow;
