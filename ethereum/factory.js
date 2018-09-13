import web3 from './web3';
import CampaignFactory from './build/Campaign.solCampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x4603006eDC89905c783cd1b40F4bE7c312c256B8'
);

export default instance;
