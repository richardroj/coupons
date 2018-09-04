import web3 from './web3';
import CampaignFactory from './build/Campaign.solCampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1a5a1b98640eCE3f81F457B5C098680d04bd82F1'
);

export default instance;
