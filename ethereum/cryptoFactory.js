import web3 from './web3';
import CryptoCouponFactory from './build/CryptoCoupon.solCryptoCouponFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CryptoCouponFactory.interface),
  '0x5aE1EEc2d195c435BFdE4Da5d6d6dD4a04E04676'
);

export default instance;

