import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import factory from '../../../ethereum/cryptoFactory';
import web3 from '../../../ethereum/web3';
import { Router } from '../../../routes';

class CryptoCouponBuy extends Component {

  static async getInitialProps(props) {
    
     //const { serialNumber } = this.props.match.params;
     const { address } = props.query;
     const { serialNumber } = props.query;
    console.log("props:"+address);
    return {
      address, serialNumber
      
    };
  }
  
  state = {
    serialNumber: '',
    address : '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    console.log("Add method to buy coupon");
    this.setState({ errorMessage: "Add method to buy coupon" });
    /*event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("buying from account:  "+accounts[0]);
      await factory.methods
        .createCryptoCoupon(this.state.serialNumber, this.state.address)
        .send({
          from: accounts[0],
          gas: '3000000'
        });


      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });*/
  };

  render() {
    return (
      <Layout>
        <h3>Buy Coupon</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Coupon Serial</label>
            <Input
              value={this.props.serialNumber}
              onChange={event =>
                this.setState({ serialNumber: event.target.value })}
            />
            <label>Address</label>
            <Input
              value={this.props.address}
              onChange={event =>
                this.setState({ address: event.target.value })}
            />


          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Buy!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CryptoCouponBuy;
