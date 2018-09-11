import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import CryptoCoupon from '../ethereum/cryptoCoupon';

class CouponRow extends Component {

  onFinalize = async () => {
    const cryptoCoupon = CryptoCoupon(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await cryptoCoupon.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  onSale = async () => {
    console.log("selling");
    const cryptoCoupon = CryptoCoupon(this.props.address);

    const accounts = await web3.eth.getAccounts();

    console.log("account"+accounts[0]);
    if(accounts[0]==this.props.address){
      await cryptoCoupon.methods
          .AccessControle()
          .send({
            from: accounts[0], gas: '100000'
          });

      await cryptoCoupon.methods.setCouponToSale(this.props.id).send({
        from: accounts[0], gas:'300000'
      });
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
        <Cell>{id}</Cell>
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
            <Button color="teal" basic >
              Burn
            </Button>
          ) : null}
        </Cell>
      </Row>
    );
  }
}

export default CouponRow;
