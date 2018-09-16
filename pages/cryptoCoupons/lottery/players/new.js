import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import factory from '../../../../ethereum/cryptoFactory';
import web3 from '../../../../ethereum/web3';
import { Router } from '../../../../routes';
import CryptoCoupon from '../../../../ethereum/cryptoCoupon';

class CryptoCouponPlayer extends Component {

  
  state = {
    address : '',
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
  

  onSubmit = async event => {
    event.preventDefault();
    console.log("adding address: "+ this.props.address);
    const cryptoCoupon = CryptoCoupon(this.props.address);
    

    this.setState({ loading: true, errorMessage: '' });

    try {

        const accounts = await web3.eth.getAccounts();
        console.log("creating coupon: "+ accounts[0]);
        if(accounts[0]==this.props.manager){
          /*await cryptoCoupon.methods
            .AccessControle()
            .send({
              from: this.props.manager, gas: '100000'
            });*/

          await cryptoCoupon.methods
            .addPlayer(this.state.address)
            .send({ from: accounts[0], gas: '100000' });
        }else{
          this.setState({ errorMessage: "You don't have address manager" });
        }

      Router.pushRoute(`/cryptoCoupons/${this.props.address}/lottery`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });

  };

  render() {
    return (
      <Layout>
        <h3>Coupons Lottery</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            
            <label>Address</label>
            <Input
              value={this.state.address}
              onChange={event =>
                this.setState({ address: event.target.value })}
            />


          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Play
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CryptoCouponPlayer;
