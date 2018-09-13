import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import factory from '../../../ethereum/cryptoFactory';
import web3 from '../../../ethereum/web3';
import { Router } from '../../../routes';
import CryptoCoupon from '../../../ethereum/cryptoCoupon';

class CouponNew extends Component {
  state = {
    name: '',
    description : '',
    gift : true,
    value : '',
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
    console.log("creating contract: "+ this.props.manager);
    const cryptoCoupon = CryptoCoupon(this.props.address);
    const { name, description, gift, value } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {

        const accounts = await web3.eth.getAccounts();
        console.log("creating coupon: "+ accounts[0]);
        if(accounts[0]==this.props.manager){
          await cryptoCoupon.methods
            .AccessControle()
            .send({
              from: this.props.manager, gas: '100000'
            });

          await cryptoCoupon.methods
            .createToken(this.state.name, this.state.description, this.state.gift, this.state.value)
            .send({ from: this.props.manager, gas: '300000' });
        }else{
          this.setState({ errorMessage: "You don't have address manager" });
        }

      Router.pushRoute(`/cryptoCoupons/${this.props.address}/coupons`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });

  };

  render() {
    return (
      <Layout>
        <h3>Create a Coupon</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Name</label>
            <Input
              value={this.state.name}
              onChange={event =>
                this.setState({ name: event.target.value })}
            />
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })}
            />
            <label>gift</label>
            <Input
              value={this.state.gift}
              onChange={event =>
                this.setState({ gift: event.target.value })}
            />
            <label>Value</label>
            <Input
              value={this.state.value}
              onChange={event =>
                this.setState({ value: event.target.value })}
            />

          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CouponNew;
