import web3 from './web3';
import CampaignFactory from './build/Campaign.solCampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x989Ce03F246294AE5BaCf89ebA2FE318C9F07785'
);

export default instance;
