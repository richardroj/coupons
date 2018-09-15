import React, { Component } from 'react';
import { Card, Grid, Button, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import CryptoCoupon from '../../../ethereum/cryptoCoupon';
import web3 from '../../../ethereum/web3';
//import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../../routes';
import CouponRaffleRow from '../../../components/CouponRaffleRow';

class LotteryShow extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    console.log("address:"+address);
    const cryptoCoupon = CryptoCoupon(address);

    const couponCount = await cryptoCoupon.methods.getCouponsRaffleCount().call();

    const pCount = await cryptoCoupon.methods.getPlayersCount().call();

    const playersCount = parseInt(pCount);

    const coupons = await Promise.all(
      Array(parseInt(couponCount))
        .fill()
        .map((element, index) => {
          return cryptoCoupon.methods.couponsRaffle(index).call();
        })
    );

   
     console.log("count raffle:"+coupons.length);
    return {
      couponCount,
      playersCount,
      coupons,
      address
    };
  }

  renderRows() {
    return this.props.coupons.map((coupon, index) => {
      return (
        <CouponRaffleRow
          key={index}
          id={index}
          coupon={coupon}
          address={this.props.address}
          
        />
      );
    });
  }

  renderCards() {
    const {
      balance,
      manager,
      name,
      couponCount,
      playersCount
    } = this.props;

    const items = [
      {
        header: playersCount,
        meta: 'Number of Players',
        description:
          'The manager created this coupon',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: couponCount,
        meta: 'Number of Coupons',
        description:
          'Coupons'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Lottery Info</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
                <a>
                  <Button primary>Get Winner</Button>
                </a>
            </Grid.Column>
            <Grid.Column width={6}>
              <Link route={`/cryptoCoupons/${this.props.address}/lottery/players/new`}>
                <a>
                  <Button primary>Enter to Lottery</Button>
                </a>
              </Link>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <h3>Winner address: {}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <h3>Coupons</h3>
            <Table>
              <Header>
                <Row>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Description</HeaderCell>
                  <HeaderCell>Serial Number</HeaderCell>
                  <HeaderCell>Value</HeaderCell>
                  <HeaderCell>Approve</HeaderCell>
                </Row>
              </Header>
              <Body>{this.renderRows()}</Body>
            </Table>
            <div>Found {this.props.couponCount} coupons.</div>
          </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default LotteryShow;
//<!--<ContributeForm address={this.props.address} />-->
