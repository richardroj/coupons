import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import CryptoCoupon from '../ethereum/cryptoCoupon';
import { Link } from '../routes';

class CouponRaffleRow extends Component {

  state = {
    winner:'Winner',
    errorMessage: '',
    loading: false
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    const cryptoCoupon = CryptoCoupon(address);
    const summary = await cryptoCoupon.methods.getSummary().call();

    return {
      address: props.query.address,
      manager: summary[3]
    };
  }

  onRaffle = async () => {
    console.log("raffling Coupon");
    const cryptoCoupon = CryptoCoupon(this.props.address);
    const summary = await cryptoCoupon.methods.getSummary().call();
    const accounts = await web3.eth.getAccounts();

    console.log("account m"+summary[3]);
    if(accounts[0]==summary[3]){
      await cryptoCoupon.methods
          .AccessControle()
          .send({
            from: accounts[0], gas: '100000'
          });

      const winnerOfCoupon = await cryptoCoupon.methods.generateWinnerOfToken(this.props.coupon.serialNumber).send({
        from: accounts[0], gas:'300000'
      });
      this.setState({winner:winnerOfCoupon[0]});
      console.log("winner"+winnerOfCoupon[0]);
    }else{
      this.setState({errorMessage: 'Youn dont have account manager'});
    }

  };

  render() {
    const { Row, Cell } = Table;
    const { id, coupon, winnerOfCoupon } = this.props;
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
       
        <Cell> <Button color="green" basic onClick={this.onRaffle}>Raffle</Button>
                
        </Cell>
        <Cell>{this.props.winnerOfCoupon}</Cell>
       
        
      </Row>
      
    );
  }
}

export default CouponRaffleRow;
