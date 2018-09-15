import web3 from './web3';
import CampaignFactory from './build/Campaign.solCampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x31dEC21b129171162c24817668B18c607480F7e0'
);

export default instance;
